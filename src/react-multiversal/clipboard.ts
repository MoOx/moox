/**
 * Copying to the clipboard, web half (`clipboard.native.ts` is the other one).
 *
 * `@react-native-clipboard/clipboard` cannot be imported directly here. Its web
 * build (`dist/Clipboard.web.js`) only has a *named* export, while the package
 * entry re-exports it as a default, and the CJS interop of that chain hands the
 * app the module namespace instead of the object: `Clipboard.setString` is
 * `undefined`, and calling it throws inside the press handler, so nothing at
 * all happens - not even the "Copied" confirmation that runs after it.
 *
 * The browser API is one call anyway, so this file is the whole web build.
 */
export async function setClipboardString(content: string): Promise<boolean> {
  // `navigator.clipboard` only exists in a secure context, which `npm run dev
  // --host` (plain HTTP on the LAN) is not. The old textarea trick still works
  // there, so the fallback is worth its five lines.
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(content);
      return true;
    } catch {
      return false;
    }
  }
  const el = document.createElement("textarea");
  el.value = content;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(el);
  return copied;
}
