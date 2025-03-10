import React from "react";
import { View, ViewProps } from "react-native";

export default function ViewWithGradient({
  color,
  color2,
  ...props
}: ViewProps & {
  color: string;
  color2: string;
}) {
  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          borderRadius: 6,
          backgroundImage: `linear-gradient(0.45turn, ${color} 10%, ${color2} 110%)`,
          overflow: "hidden",
        },
        props.style,
      ]}
    />
  );
}
