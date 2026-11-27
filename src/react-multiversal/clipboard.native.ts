import * as Clipboard from "expo-clipboard";

/**
 * Native half of `clipboard.ts` - read that file for why the web build cannot
 * share this import.
 *
 * `expo-clipboard` rather than `@react-native-clipboard/clipboard`: the
 * community module is a TurboModule that Expo Go cannot load
 * (`TurboModuleRegistry.getEnforcing('RNCClipboard')` throws before anything
 * renders), which used to be papered over by a Metro alias. This package is
 * the one Expo ships, and `setString` was the only call the site ever made.
 */
export async function setClipboardString(content: string): Promise<boolean> {
  await Clipboard.setStringAsync(content);
  return true;
}
