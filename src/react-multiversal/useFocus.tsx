import { supportsPointerEvent } from "@/react-multiversal/supports";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

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
  const debouncePointerFocused = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlePointerFocusedOn = useCallback(() => {
    if (debouncePointerFocused.current) clearTimeout(debouncePointerFocused.current);
    onPointerFocus?.();
    setPointerFocused(true);
  }, [onPointerFocus]);
  const handlePointerFocusedOff = useCallback(() => {
    onPointerLeave?.();
    debouncePointerFocused.current = setTimeout(() => setPointerFocused(false), debounceOff);
  }, [debounceOff, onPointerLeave]);

  const [focused, setFocused] = useState(false);
  const debounceFocus = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    // `Node` is a DOM global, so reading `Node.ELEMENT_NODE` throws on native
    // rather than returning false. There is nothing to subscribe to there
    // either: hover and DOM focus are web events, and the hook's return value
    // is already the right answer without them.
    if (Platform.OS !== "web") return;
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
  }, [ref, handlePointerFocusedOn, handlePointerFocusedOff, handleFocusOn, handleFocusOff]);

  return [pointerFocused || focused, pointerFocused, focused] as const;
}
