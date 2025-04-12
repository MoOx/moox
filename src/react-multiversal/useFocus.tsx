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
  const [pointerFocused, setPointerFocused] = React.useState(false);
  const debouncePointerFocused = React.useRef<number | null>(null);
  const handlePointerFocusedOn = React.useCallback(() => {
    if (debouncePointerFocused.current)
      clearTimeout(debouncePointerFocused.current);
    onPointerFocus?.();
    setPointerFocused(true);
  }, [onPointerFocus]);
  const handlePointerFocusedOff = React.useCallback(() => {
    onPointerLeave?.();
    debouncePointerFocused.current = setTimeout(
      () => setPointerFocused(false),
      debounceOff
    );
  }, [debounceOff, onPointerLeave]);

  const [focused, setFocused] = React.useState(false);
  const debounceFocus = React.useRef<number | null>(null);
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
    if (debouncePointerFocused.current) {
      clearTimeout(debouncePointerFocused.current);
    }
    if (debounceFocus.current) {
      clearTimeout(debounceFocus.current);
    }
  }, [debounceOff]);

  React.useEffect(() => {
    const n = ref?.current as HTMLElement;
    if (n?.nodeType === Node.ELEMENT_NODE) {
      const opts = { passive: true, capture: false };
      n.addEventListener(POINTERENTER, handlePointerFocusedOn, opts);
      n.addEventListener(POINTERLEAVE, handlePointerFocusedOff, opts);
      n.addEventListener(FOCUS, handleFocusOn, opts);
      n.addEventListener(BLUR, handleFocusOff, opts);
      return () => {
        n.removeEventListener(POINTERENTER, handlePointerFocusedOn, opts);
        n.removeEventListener(POINTERLEAVE, handlePointerFocusedOff, opts);
        n.removeEventListener(FOCUS, handleFocusOn, opts);
        n.removeEventListener(BLUR, handleFocusOff, opts);
      };
    }
  }, [
    ref,
    handlePointerFocusedOn,
    handlePointerFocusedOff,
    handleFocusOn,
    handleFocusOff,
  ]);

  return [pointerFocused || focused, pointerFocused, focused] as const;
}
