"use client";

import * as React from "react";

import { supportsPointerEvent } from "@/react-multiversal/supports";

const POINTERENTER = supportsPointerEvent() ? "pointerenter" : "mouseenter";
const POINTERLEAVE = supportsPointerEvent() ? "pointerleave" : "mouseleave";

const FOCUS = "focus";
const BLUR = "blur";

export function useFocus<T>(
  ref?: React.RefObject<T | null>,
  {
    onPointerFocus,
    onPointerLeave,
    onFocus,
    onBlur,
    debounceOff = 0,
  }: {
    onPointerFocus?: () => void;
    onPointerLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    debounceOff?: number;
  } = {}
) {
  const [pointerFocus, setPointerFocus] = React.useState(false);
  const debouncePointerFocus = React.useRef<NodeJS.Timeout | null>(null);
  const handlePointerFocusOn = React.useCallback(() => {
    if (debouncePointerFocus.current)
      clearTimeout(debouncePointerFocus.current);
    onPointerFocus?.();
    setPointerFocus(true);
  }, [onPointerFocus]);
  const handlePointerFocusOff = React.useCallback(() => {
    onPointerLeave?.();
    debouncePointerFocus.current = setTimeout(
      () => setPointerFocus(false),
      debounceOff
    );
  }, [debounceOff, onPointerLeave]);

  const [focused, setFocused] = React.useState(false);
  const debounceFocus = React.useRef<NodeJS.Timeout | null>(null);
  const handleFocusOn = React.useCallback(() => {
    if (debounceFocus.current) clearTimeout(debounceFocus.current);
    onFocus?.();
    setFocused(true);
  }, [onFocus]);
  const handleFocusOff = React.useCallback(() => {
    onBlur?.();
    debounceFocus.current = setTimeout(() => setFocused(false), debounceOff);
  }, [debounceOff, onBlur]);

  React.useEffect(() => {
    if (debouncePointerFocus.current) {
      clearTimeout(debouncePointerFocus.current);
    }
    if (debounceFocus.current) {
      clearTimeout(debounceFocus.current);
    }
  }, [debounceOff]);

  React.useEffect(() => {
    const n = ref?.current as HTMLElement;
    if (n?.nodeType === Node.ELEMENT_NODE) {
      const opts = { passive: true, capture: false };
      n.addEventListener(POINTERENTER, handlePointerFocusOn, opts);
      n.addEventListener(POINTERLEAVE, handlePointerFocusOff, opts);
      n.addEventListener(FOCUS, handleFocusOn, opts);
      n.addEventListener(BLUR, handleFocusOff, opts);
      return () => {
        n.removeEventListener(POINTERENTER, handlePointerFocusOn, opts);
        n.removeEventListener(POINTERLEAVE, handlePointerFocusOff, opts);
        n.removeEventListener(FOCUS, handleFocusOn, opts);
        n.removeEventListener(BLUR, handleFocusOff, opts);
      };
    }
  }, [
    ref,
    handlePointerFocusOn,
    handlePointerFocusOff,
    handleFocusOn,
    handleFocusOff,
  ]);

  return [pointerFocus || focused, pointerFocus, focused] as const;
}
