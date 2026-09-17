// Spawns the Vite dev server for a headless-Chrome export (the résumé PDF,
// the social-preview images) and resolves once it answers. Shared so the two
// export scripts start the site the same way; pass `externalUrl` to reuse a
// server that is already running (`--url=http://localhost:1337`).
import { spawn } from "node:child_process";
import path from "node:path";

/**
 * @param {{ root: string, port: number, externalUrl?: string }} options
 * @returns {Promise<{ baseUrl: string, stop: () => void }>}
 */
export async function startDevServer({ root, port, externalUrl }) {
  if (externalUrl) {
    return { baseUrl: externalUrl.replace(/\/$/, ""), stop: () => {} };
  }
  const bin = path.join(root, "node_modules", ".bin", "vite");
  const child = spawn(bin, ["dev", "--port", String(port)], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const baseUrl = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Dev server did not start within 90s")),
      90_000,
    );
    let buf = "";
    const onData = (d) => {
      buf += d.toString();
      const m = buf.match(/http:\/\/localhost:(\d+)/);
      if (m && /ready in/.test(buf)) {
        clearTimeout(timeout);
        resolve(`http://localhost:${m[1]}`);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => reject(new Error(`Dev server exited early (code ${code})`)));
  });

  const stop = () => {
    try {
      if (child.pid) process.kill(-child.pid); // kill the whole process group
    } catch {
      /* already gone */
    }
  };
  return { baseUrl, stop };
}
