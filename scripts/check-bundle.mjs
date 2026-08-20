#!/usr/bin/env node
//
// Bundles the app the way the dev server does, and fails on any error.
//
// `expo export` is NOT a substitute, and that is not a detail: in production
// `babel-preset-expo` folds `Platform.OS === "web"` to `false` and the dead
// branch is dropped *before* module resolution, so a web-only `import` inside
// it never enters the graph. The dev server keeps the branch, so the import is
// resolved for real. A `node:fs` import guarded by `Platform.OS === "web"`
// therefore exported cleanly and crashed `expo start` on the first bundle.
//
// Metro is a static bundler: guarding an import with a runtime check does not
// keep it out of the graph. Platform-only modules belong behind a `.native`
// (or `.web`) file extension, not behind an `if`.
import { spawn } from "node:child_process";
import { once } from "node:events";

const PORT = Number(process.env.PORT ?? 8091);
const PLATFORMS = ["ios", "android"];
const STATUS = `http://127.0.0.1:${PORT}/status`;

const reachable = async (timeoutMs) => {
  try {
    const res = await fetch(STATUS, { signal: AbortSignal.timeout(timeoutMs) });
    return res.ok;
  } catch {
    return false;
  }
};

// Refuse to run against a server this script did not start. A leftover server
// answers on the port, serves *its* graph, and the check silently reports on
// code that is not the code in the working tree. That happened: a stale server
// from a previous run kept a fixed bug alive and the run after it passed.
if (await reachable(2000)) {
  console.error(
    `check-bundle: something is already serving port ${PORT}.\n` +
      `Stop it (or set PORT) - a bundle from another server proves nothing.`,
  );
  process.exit(1);
}

// `--clear` is not optional either. Metro's transform cache will happily serve
// a previous bundle for an edited file, so without it this check reports the
// last good result. Verified by reintroducing the bug: cached, it passed.
//
// `detached` + a process-group kill, because `npx` spawns the real Metro as a
// child: signalling the wrapper alone leaves the server running and holding
// the port.
const server = spawn("npx", ["expo", "start", "--port", String(PORT), "--clear"], {
  stdio: "ignore",
  detached: true,
  env: { ...process.env, CI: "1" },
});

let stopped = false;
const stop = () => {
  if (stopped) return;
  stopped = true;
  try {
    process.kill(-server.pid, "SIGKILL");
  } catch {
    // already gone
  }
};
process.on("exit", stop);
process.on("SIGINT", () => {
  stop();
  process.exit(130);
});

const ready = async () => {
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) return false;
    if (await reachable(1000)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
};

let failed = false;

if (!(await ready())) {
  console.error("check-bundle: the dev server did not come up");
  failed = true;
} else {
  for (const platform of PLATFORMS) {
    const url = `http://127.0.0.1:${PORT}/index.bundle?platform=${platform}&dev=true&minify=false`;
    const res = await fetch(url);
    const body = await res.text();
    // Metro answers 500 with a JSON error payload; a good bundle is JS.
    if (!res.ok) {
      let message = body;
      try {
        message = JSON.parse(body).message ?? body;
      } catch {
        // keep the raw body
      }
      console.error(`\n✗ ${platform} bundle failed\n${message}\n`);
      failed = true;
    } else {
      console.log(`✓ ${platform} bundle ok (${(body.length / 1e6).toFixed(1)}MB)`);
    }
  }
}

stop();
await Promise.race([once(server, "exit"), new Promise((r) => setTimeout(r, 5000))]);
process.exit(failed ? 1 : 0);
