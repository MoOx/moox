import { RefObject, useEffect } from "react";

/**
 * Calls `onOutside` when a click lands outside `ref` and outside every element
 * in `skipRefs` - the trigger belongs in `skipRefs`, or clicking it to close
 * would close and immediately reopen.
 *
 * The handler is deferred to the next tick so the click that closes a menu can
 * still reach whatever is under it: that is what lets one click move focus from
 * one menu to another instead of just dismissing the first.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled = true,
  skipRefs: RefObject<HTMLElement | null>[] = [],
): void {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const handleClick = (event: Event) => {
      const target = event.target as Node;
      if (ref.current?.contains(target)) return;
      if (skipRefs.some((skipRef) => skipRef.current?.contains(target))) return;
      setTimeout(onOutside, 0);
    };

    const opts = { capture: true, passive: true };
    document.documentElement.addEventListener("click", handleClick, opts);
    return () => {
      document.documentElement.removeEventListener("click", handleClick, opts);
    };
    // `skipRefs` is an array literal at most call sites, so it is a new
    // reference on every render: spread it instead of depending on the array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, onOutside, enabled, ...skipRefs]);
}
