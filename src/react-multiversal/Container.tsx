import { size, Size, spaceStyleGap, spaceStyleVertical } from "@/react-multiversal";
import { ReactNode } from "react";
import { Platform, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  wrapper: {
    // flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
  },
});

/**
 * Horizontal padding has to be composed with the safe-area inset rather than
 * set next to it: react-native-web expands `paddingHorizontal` into
 * `paddingLeft`/`paddingRight`, so a plain padding declared after these would
 * silently drop the inset and let content run under a notch in landscape.
 * Native takes no `env()` — `SafeAreaView` handles the insets there.
 *
 * Registered per distinct value, like the spacing helpers in `index.ts`: a
 * fresh object literal per render cannot be recognised by react-native-web, so
 * it is written into the `style` attribute of every Container instead of
 * compiling to a className. The vertical and gap axes reuse those helpers
 * directly; only this one needs its own cache, because of the `calc()`.
 */
const horizontalCache = new Map<number, ViewStyle>();
const horizontalPadding = (horizontal?: Size): ViewStyle => {
  const v = horizontal === undefined ? 0 : size(horizontal);
  let style = horizontalCache.get(v);
  if (style === undefined) {
    style = StyleSheet.create({
      style:
        Platform.OS === "web"
          ? {
              paddingLeft: `calc(env(safe-area-inset-left) + ${v}px)`,
              paddingRight: `calc(env(safe-area-inset-right) + ${v}px)`,
            }
          : { paddingLeft: v, paddingRight: v },
    }).style;
    horizontalCache.set(v, style);
  }
  return style;
};

export default function Container({
  wrapperStyle,
  style,
  maxWidth = 1024,
  horizontal,
  vertical,
  gap,
  children,
  ...props
}: ViewProps & {
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  /**
   * Spacing on the max-width box itself, so the common
   * `<Container><SpacedView horizontal=… vertical=…>` does not need the second
   * node. Same names and same scale as `SpacedView` — the padding applies
   * exactly where it did there, since that wrapper stretched to this box.
   */
  horizontal?: Size;
  vertical?: Size;
  gap?: Size;
  children: ReactNode;
}) {
  const spacing = [horizontalPadding(horizontal), spaceStyleVertical(vertical), spaceStyleGap(gap)];
  const styleArray = [styles.container, { maxWidth }, spacing, style];
  return (
    <View style={[styles.wrapper, wrapperStyle]} {...props}>
      {Platform.OS === "web" ? (
        <View style={styleArray}>{children}</View>
      ) : (
        <SafeAreaView edges={{ bottom: "off", top: "off" }} style={styleArray}>
          {children}
        </SafeAreaView>
      )}
    </View>
  );
}
