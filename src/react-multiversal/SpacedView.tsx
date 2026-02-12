import {
  Size,
  spaceStyleGap,
  spaceStyleHorizontal,
  spaceStyleVertical,
} from "@/react-multiversal";
import { View, ViewProps } from "react-native";

export default function SpacedView({
  vertical,
  horizontal,
  gap,
  style,
  children,
  ...props
}: ViewProps & {
  vertical?: Size;
  horizontal?: Size;
  gap?: Size;
}) {
  return (
    <View
      {...props}
      style={[
        spaceStyleVertical(vertical),
        spaceStyleHorizontal(horizontal),
        spaceStyleGap(gap),
        style,
      ]}
    >
      {children}
    </View>
  );
}
