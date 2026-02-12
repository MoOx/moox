import { useEffect, useRef } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

const isClient = typeof window !== "undefined";

// export const useScrollViewOrWindowOffset = (
//   animatedRef?: AnimatedRef<AnimatedScrollView>
// ) => {
//   return animatedRef
//     ? useScrollViewOffset(animatedRef)
//     : useScrollWindowOffset();
// };

const getWindowOffset = isClient ? () => window.scrollY : () => 0;

export const useScrollWindowOffset = (
  sprintOptions?: SpringConfig,
  getOffset = getWindowOffset,
) => {
  const requested = useRef(false);

  const scrollOffset = useSharedValue(getOffset());

  useEffect(() => {
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
