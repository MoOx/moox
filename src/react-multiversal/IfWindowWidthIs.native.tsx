import { size, Size } from "@/react-multiversal";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  ifWrapper: { display: "contents" },
});

/**
 * Native counterpart of the web component. The web one renders both branches
 * and lets a media query hide one, because the server does not know the
 * viewport and a JS-measured branch would either mismatch on hydration or
 * flash the wrong layout. Native has no such constraint, so it renders one.
 *
 * The two must agree on *which* one, which they did not: with both bounds set,
 * this hid exactly the range the web version showed. No call site passes both
 * today, so nothing was broken - it was waiting for the Expo port.
 */
export default function IfWindowWidthIs({
  style,
  smallerThan,
  largerThan,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  smallerThan?: Size;
  largerThan?: Size;
  children: ReactNode;
}) {
  const { width } = useWindowDimensions();

  if (smallerThan && largerThan && smallerThan >= largerThan) {
    throw new Error(
      `[IfWindowWidthIs] Invalid props: "smallerThan" (${smallerThan}) must be smaller than "largerThan" (${largerThan}).`,
    );
  }

  // Mirrors the media queries in IfWindowWidthIs.tsx exactly:
  //   smallerThan → hidden at `min-width: n`      → hidden when width >= n
  //   largerThan  → hidden at `max-width: n - 1`  → hidden when width < n
  // and with both, the two are a comma-separated (OR) query, so the element is
  // visible only *between* the bounds.
  const hidden =
    (smallerThan != null && width >= size(smallerThan)) ||
    (largerThan != null && width < size(largerThan));

  return hidden ? null : <View style={[styles.ifWrapper, style]}>{children}</View>;
}
