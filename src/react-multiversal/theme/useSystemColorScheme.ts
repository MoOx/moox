import { useSyncExternalStore } from "react";
import { Appearance } from "react-native";

export type SystemColorScheme = "light" | "dark";

const subscribe = (onStoreChange: () => void) => {
  const subscription = Appearance.addChangeListener(onStoreChange);
  return () => subscription.remove();
};

const getSnapshot = (): SystemColorScheme =>
  Appearance.getColorScheme() === "dark" ? "dark" : "light";

// The server cannot know what the visitor's OS is set to, so it renders light.
// The hydration pass must therefore read light too, or React compares a light
// tree against a dark one and gives up on the attributes that differ.
const getServerSnapshot = (): SystemColorScheme => "light";

/**
 * `useColorScheme()` from react-native-web reads `matchMedia` in a `useState`
 * initializer, which runs during hydration: a visitor in dark mode gets a
 * client tree that does not match the server HTML. This reads the same source
 * through `useSyncExternalStore`, which hydrates with the server value and
 * swaps to the real one right after - one re-render for dark-mode visitors,
 * none for the rest.
 */
export const useSystemColorScheme = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
