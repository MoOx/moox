import { website } from "@/consts";

/**
 * Native half of `api.readJson.ts` — read that file for why this is a platform
 * split and not a branch.
 *
 * There is no server half here and no filesystem to fall back to: a native app
 * has no document to resolve a root-relative path against, so it asks the
 * deployed site for the same file the browser would have loaded. One content
 * pipeline, not two.
 */
export async function readJson<T>(urlPath: string): Promise<T> {
  const res = await fetch(website + urlPath);
  if (!res.ok) throw new Error(`Failed to fetch ${urlPath}: ${res.status}`);
  return (await res.json()) as T;
}
