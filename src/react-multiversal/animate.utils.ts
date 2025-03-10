"use client";

import * as React from "react";
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

export const useScrollWindowOffset = (
  sprintOptions?: SpringConfig,
  getDocumentOffset = isClient ? () => window.scrollY : () => 0
) => {
  const requested = React.useRef(false);

  const scrollOffset = useSharedValue(getDocumentOffset());

  React.useEffect(() => {
    const listener = () => {
      if (!requested.current) {
        requested.current = true;
        requestAnimationFrame(() => {
          scrollOffset.set(withSpring(getDocumentOffset(), sprintOptions));
          requested.current = false;
        });
      }
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [scrollOffset, getDocumentOffset, sprintOptions]);

  return scrollOffset;
};
