import * as React from "react";
import { View, type ViewProps } from "react-native";

export type BlurViewProps = ViewProps & {
  blurAmount?: number;
  // blurType?: BlurType;
};

export default function BlurView({
  blurAmount = 10,
  // blurType = "default",
  style,
  ...props
}: BlurViewProps) {
  return (
    <View
      {...props}
      style={[
        style,
        blurAmount !== 0 && {
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          backdropFilter: `blur(${blurAmount}px)`,
        },
      ]}
    />
  );
}
