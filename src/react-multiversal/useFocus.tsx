import { supportsPointerEvent } from "@/react-multiversal/supports";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const POINTERENTER = supportsPointerEvent() ? "pointerenter" : "mouseenter";
const POINTERLEAVE = supportsPointerEvent() ? "pointerleave" : "mouseleave";

const FOCUS = "focus";
const BLUR = "blur";

export function useFocus<T>(
  ref?: RefObject<T | null>,
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
  } = {},
) {
  const [pointerFocused, setPointerFocused] = useState(false);
  const debouncePointerFocused = useRef<number | null>(null);
  const handlePointerFocusedOn = useCallback(() => {
    if (debouncePointerFocused.current)
      clearTimeout(debouncePointerFocused.current);
    onPointerFocus?.();
    setPointerFocused(true);
  }, [onPointerFocus]);
  const handlePointerFocusedOff = useCallback(() => {
    onPointerLeave?.();
    debouncePointerFocused.current = setTimeout(
      () => setPointerFocused(false),
      debounceOff,
    );
  }, [debounceOff, onPointerLeave]);

  const [focused, setFocused] = useState(false);
  const debounceFocus = useRef<number | null>(null);
  const handleFocusOn = useCallback(() => {
    if (debounceFocus.current) clearTimeout(debounceFocus.current);
    onFocus?.();
    setFocused(true);
  }, [onFocus]);
  const handleFocusOff = useCallback(() => {
    onBlur?.();
    debounceFocus.current = setTimeout(() => setFocused(false), debounceOff);
  }, [debounceOff, onBlur]);

  useEffect(() => {
    if (debouncePointerFocused.current) {
      clearTimeout(debouncePointerFocused.current);
    }
    if (debounceFocus.current) {
      clearTimeout(debounceFocus.current);
    }
  }, [debounceOff]);

  useEffect(() => {
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
