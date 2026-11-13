import { Platform } from "react-native";
import { useSyncExternalStore } from "react";

/**
 * `typeof window !== "undefined"` is not a platform test. React Native aliases
 * `window` (and `self`) to `global` in `setUpGlobals`, so the check passes on a
 * device and the code goes straight on to call a DOM API that is not there.
 * `matchMedia` at module scope crashed the Expo app on import, before anything
 * rendered. Only `Platform.OS` separates the two.
 */
const isWeb = Platform.OS === "web";
const isBrowser = isWeb && typeof window !== "undefined";

export const supportsPointerEvent = () => !!(isBrowser && window.PointerEvent != null);

export const supportsHover = () => isBrowser && window.matchMedia("(hover: hover)").matches;

const hoverQuery = isBrowser ? window.matchMedia("(hover: hover)") : null;

const subscribeToHover = (onStoreChange: () => void) => {
  hoverQuery?.addEventListener("change", onStoreChange);
  return () => hoverQuery?.removeEventListener("change", onStoreChange);
};

// The query is matched once and reused: `supportsHover()` builds a new
// MediaQueryList per call, and this runs on every render.
const getHoverSnapshot = () => hoverQuery?.matches ?? false;

// The server has no pointer to ask about, so it renders the no-hover branch and
// the hydration pass has to agree; the real answer lands on the render right
// after. Reading `supportsHover()` straight from a component body instead makes
// the first client tree differ from the HTML, which React refuses to patch up.
const getServerHoverSnapshot = () => false;

/** `supportsHover()`, safe to branch on while rendering. */
export const useSupportsHover = () =>
  useSyncExternalStore(subscribeToHover, getHoverSnapshot, getServerHoverSnapshot);
