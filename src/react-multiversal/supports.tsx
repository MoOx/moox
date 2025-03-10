export const supportsPointerEvent = () =>
  !!(typeof window !== "undefined" && window.PointerEvent != null);

export const supportsHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
