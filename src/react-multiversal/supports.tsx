import { useSyncExternalStore } from "react";

export const supportsPointerEvent = () =>
  !!(typeof window !== "undefined" && window.PointerEvent != null);

export const supportsHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const hoverQuery = typeof window === "undefined" ? null : window.matchMedia("(hover: hover)");

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
