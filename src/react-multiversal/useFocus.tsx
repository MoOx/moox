"use client";

import * as React from "react";

import { supportsPointerEvent } from "@/react-multiversal/supports";

const POINTERENTER = supportsPointerEvent() ? "pointerenter" : "mouseenter";
const POINTERLEAVE = supportsPointerEvent() ? "pointerleave" : "mouseleave";

const FOCUS = "focus";
const BLUR = "blur";

export function useFocus<T>(
  ref?: React.MutableRefObject<T | null>,
  {
    onHover,
    onLeave,
    onFocus,
    onBlur,
  }: {
    onHover?: () => void;
    onLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  } = {}
) {
  const [pointerFocus, setPointerFocus] = React.useState(false);
  const handleHoverOn = React.useCallback(() => {
    onHover?.();
    setPointerFocus(true);
  }, [onHover]);
  const handleHoverOff = React.useCallback(() => {
    onLeave?.();
    setPointerFocus(false);
  }, [onLeave]);
  const [focused, setFocused] = React.useState(false);
  const handleFocusOn = React.useCallback(() => {
    onFocus?.();
    setFocused(true);
  }, [onFocus]);
  const handleFocusOff = React.useCallback(() => {
    onBlur?.();
    setFocused(false);
  }, [onBlur]);

  React.useEffect(() => {
    const n = ref?.current as HTMLElement;
    if (n?.nodeType === Node.ELEMENT_NODE) {
      n.addEventListener(POINTERENTER, handleHoverOn);
      n.addEventListener(POINTERLEAVE, handleHoverOff);
      n.addEventListener(FOCUS, handleFocusOn);
      n.addEventListener(BLUR, handleFocusOff);
      return () => {
        n.removeEventListener(POINTERENTER, handleHoverOn);
        n.removeEventListener(POINTERLEAVE, handleHoverOff);
        n.removeEventListener(FOCUS, handleFocusOn);
        n.removeEventListener(BLUR, handleFocusOff);
      };
    }
  }, [ref, handleHoverOn, handleHoverOff, handleFocusOn, handleFocusOff]);

  return [pointerFocus || focused, pointerFocus, focused] as const;
}
