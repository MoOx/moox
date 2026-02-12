import { size, Size } from "@/react-multiversal";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

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
  children: ReactNode;
}) {
  const { width: windowWidth } = useWindowDimensions();

  if (smallerThan && largerThan && smallerThan >= largerThan) {
    throw new Error(
      `[IfWindowWidthIs] Invalid props: "smallerThan" (${smallerThan}) must be smaller than "largerThan" (${largerThan}).`,
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
