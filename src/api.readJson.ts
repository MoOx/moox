/**
 * Reads one of the generated content files (`public/content/*.json`).
 *
 * Split by platform extension rather than by a `Platform.OS` branch, because a
 * branch is not enough: Metro is a static bundler and pulls in every module it
 * can see, whether or not the code path runs. A `node:fs` import guarded by
 * `Platform.OS === "web"` still enters the native graph and fails to resolve.
 * See `api.readJson.native.ts` for the other half.
 */
export async function readJson<T>(urlPath: string): Promise<T> {
  if (typeof window === "undefined") {
    // SSR/prerender: read from filesystem
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.join(process.cwd(), "public", urlPath);
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  }
  // Client: fetch from static files
  const res = await fetch(urlPath);
  if (!res.ok) throw new Error(`Failed to fetch ${urlPath}: ${res.status}`);
  return (await res.json()) as T;
}
