import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

import { size, Size } from "@/react-multiversal";

const styles = StyleSheet.create({
  ifWrapper: { display: "contents" },
});

export default function IfWindowWidthIs({
  style,
  smallerThan,
  largerThan,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  smallerThan?: Size;
  largerThan?: Size;
  children: React.ReactNode;
}) {
  const { width: windowWidth } = useWindowDimensions();

  if (smallerThan && largerThan && smallerThan >= largerThan) {
    throw new Error(
      `[IfWindowWidthIs] Invalid props: "smallerThan" (${smallerThan}) must be smaller than "largerThan" (${largerThan}).`
    );
  }
  const isVisible =
    (!smallerThan || windowWidth > size(smallerThan)) &&
    (!largerThan || windowWidth < size(largerThan));
  if (isVisible) {
    return null;
  }

  return <View style={[styles.ifWrapper, style]}>{children}</View>;
}
