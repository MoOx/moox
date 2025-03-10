import * as React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

import { useWindowWidth, WindowWidth } from "@/react-multiversal";
import { Portal } from "@/react-multiversal/Portal";

export default function InPlaceOrPortal({
  id,
  inPlaceStyle,
  portalStyle,
  breakpoint = WindowWidth.l,
  onExit,
  children,
  skipRefs,
}: {
  id: string;
  inPlaceStyle?: StyleProp<ViewStyle>;
  portalStyle?: StyleProp<ViewStyle>;
  breakpoint?: WindowWidth;
  onExit: () => void;
  children: React.ReactNode;
  skipRefs?: React.RefObject<any>[];
}) {
  const windowWidth = useWindowWidth();
  // force portal for native or small screen, for web only large screen
  const isInPlace = Platform.OS === "web" && windowWidth >= breakpoint;

  // ref forced as HTMLDivElement to be able to call ref.current.contains
  // that is actually existing on the web, but not in react-native
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isInPlace && document) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          ref.current &&
          !ref.current.contains(event.target as Node) &&
          skipRefs?.every((r) => !r?.current?.contains(event.target as Node))
        ) {
          onExit();
        }
      };
      const appRoot = document.documentElement;
      if (appRoot) {
        appRoot.addEventListener("click", handleClickOutside, true);
        return () => {
          appRoot.removeEventListener("click", handleClickOutside, true);
        };
      }
    }
  }, [isInPlace, onExit, skipRefs]);

  return isInPlace ? (
    <View ref={ref as any} style={inPlaceStyle}>
      {children}
    </View>
  ) : (
    <Portal id={id}>
      <View ref={ref as any} style={portalStyle}>
        {children}
      </View>
    </Portal>
  );
}
