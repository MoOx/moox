import * as React from "react";

import { alpha, boxShadow, colors, useTheme } from "@/app/styles";
import { size } from "@/react-multiversal";
import SpacedView from "@/react-multiversal/SpacedView";

export default function SpatialView({
  borderWidth = size("xxs"),
  borderRadius = size("xxs") * 4,
  horizontal = "m",
  vertical = "s",
  children,
}: {
  borderRadius?: number;
  borderWidth?: number;
  horizontal?: "s" | "m" | "l";
  vertical?: "s" | "m" | "l";
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <div
      // div because View doesn't handle backgroundClip properly
      style={{
        boxShadow: boxShadow.forTransparent,
        borderRadius,
        borderWidth,
        borderStyle: "solid",
        borderColor: alpha(colors.white, 0.15),
        backgroundColor: theme.dynamicColors.backMainAlpha05,
        backgroundOrigin: "border-box",
        backgroundClip: "border-area",
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      <SpacedView
        horizontal={horizontal}
        vertical={vertical}
        style={[
          {
            backgroundColor: theme.dynamicColors.backAlpha85,
            borderRadius: borderRadius / 1.25,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: alpha(colors.black, 0.15),
          },
        ]}
      >
        {children}
      </SpacedView>
    </div>
  );
}
