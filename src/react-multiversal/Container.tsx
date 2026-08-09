import { size, Size } from "@/react-multiversal";
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
 */
const horizontalPadding = (horizontal?: Size) => {
  const v = horizontal === undefined ? 0 : size(horizontal);
  if (Platform.OS !== "web") return { paddingLeft: v, paddingRight: v };
  return {
    paddingLeft: `calc(env(safe-area-inset-left) + ${v}px)`,
    paddingRight: `calc(env(safe-area-inset-right) + ${v}px)`,
  };
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
  const spacing: ViewStyle = {
    ...(horizontalPadding(horizontal) as ViewStyle),
    ...(vertical === undefined
      ? null
      : { paddingTop: size(vertical), paddingBottom: size(vertical) }),
    ...(gap === undefined ? null : { gap: size(gap) }),
  };
  return (
    <View style={[styles.wrapper, wrapperStyle]} {...props}>
      {Platform.OS === "web" ? (
        <View style={[styles.container, { maxWidth }, spacing, style]}>{children}</View>
      ) : (
        <SafeAreaView
          edges={{ bottom: "off", top: "off" }}
          style={[styles.container, { maxWidth }, spacing, style]}
        >
          {children}
        </SafeAreaView>
      )}
    </View>
  );
}
