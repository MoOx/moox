import { WindowWidth } from "@/react-multiversal";
import { Portal } from "@/react-multiversal/Portal";
import { ReactNode, RefObject, useEffect, useRef } from "react";
import {
  Platform,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

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
  children: ReactNode;
  skipRefs?: RefObject<any>[];
}) {
  const windowWidth = useWindowDimensions().width;
  // force portal for native or small screen, for web only large screen
  const isInPlace = Platform.OS === "web" && windowWidth >= breakpoint;

  // ref forced as HTMLDivElement to be able to call ref.current.contains
  // that is actually existing on the web, but not in react-native
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isInPlace && document) {
      const listener = (event: MouseEvent) => {
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
        const opts = {
          capture: true,
          passive: true,
        };
        appRoot.addEventListener("click", listener, opts);
        return () => {
          appRoot.removeEventListener("click", listener, opts);
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
