import * as React from "react";
import { View, ViewProps } from "react-native";

import {
  gapSpaceStyle,
  Size,
  spaceHorizontalStyle,
  spaceVerticalStyle,
} from "@/react-multiversal";

const SpacedView = ({
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
}) => (
  <View
    {...props}
    style={[
      spaceVerticalStyle(vertical),
      spaceHorizontalStyle(horizontal),
      gapSpaceStyle(gap),
      style,
    ]}
  >
    {children}
  </View>
);

export default SpacedView;
