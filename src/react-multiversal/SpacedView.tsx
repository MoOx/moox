import * as React from "react";
import { View, ViewProps } from "react-native";

import {
  Size,
  spaceStyleGap,
  spaceStyleHorizontal,
  spaceStyleVertical,
} from "@/react-multiversal";

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
