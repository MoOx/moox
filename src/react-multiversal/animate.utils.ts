import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useSharedValue, withSpring, type WithSpringConfig } from "react-native-reanimated";

// `typeof window !== "undefined"` is true on native too: React Native aliases
// `window` to `global`. Only `Platform.OS` tells the two apart, and this file
// is entirely about a *scrolling document* - `window.scrollY` and the window
// `scroll` event - neither of which a native app has.
const isClient = Platform.OS === "web" && typeof window !== "undefined";

// export const useScrollViewOrWindowOffset = (
//   animatedRef?: AnimatedRef<AnimatedScrollView>
// ) => {
//   return animatedRef
//     ? useScrollViewOffset(animatedRef)
//     : useScrollWindowOffset();
// };

const getWindowOffset = isClient ? () => window.scrollY : () => 0;

export const useScrollWindowOffset = (
  sprintOptions?: WithSpringConfig,
  getOffset = getWindowOffset,
) => {
  const requested = useRef(false);

  const scrollOffset = useSharedValue(getOffset());

  useEffect(() => {
    // Native scrolling belongs to a ScrollView, not to a window. Until the
    // native app wires `useScrollViewOffset(animatedRef)` in here (see the
    // commented-out helper above), the offset stays at its initial value and
    // anything driven by it renders in its resting position - static, not
    // broken.
    if (!isClient) return;
    const listener = () => {
      if (!requested.current) {
        requested.current = true;
        requestAnimationFrame(() => {
          scrollOffset.set(withSpring(getOffset(), sprintOptions));
          requested.current = false;
        });
      }
    };
    const opts = {
      capture: true,
      passive: true,
    };
    window.addEventListener("scroll", listener, opts);
    return () => {
      window.removeEventListener("scroll", listener, opts);
      // ensure the scroll offset is set to the current scroll position
      // (if the shared value get reused, the current value will remain
      // and this can lead to unexpected behavior
      // (eg: next/link click don't trigger the scroll event,
      // so value is not up to date with actual scroll position))
      scrollOffset.set(getOffset());
    };
  }, [scrollOffset, getOffset, sprintOptions]);

  return [scrollOffset, getOffset] as const;
};
