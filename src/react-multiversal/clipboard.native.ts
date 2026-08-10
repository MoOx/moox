import Clipboard from "@react-native-clipboard/clipboard";

/**
 * Native half of `clipboard.ts` - read that file for why the web build cannot
 * use this import. Here the default export is the real native module.
 */
export async function setClipboardString(content: string): Promise<boolean> {
  Clipboard.setString(content);
  return true;
}
