import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

interface StopData {
  offset: number;
  stopColor: string;
  stopOpacity?: string;
}

export const transparentToBlack: StopData[] = [
  {
    offset: 0,
    stopColor: "#000",
  },
  {
    offset: 100,
    stopColor: "#000",
    stopOpacity: "0",
  },
];

type GradientCoordinates = {
  cx?: number | string;
  cy?: number | string;
  fx?: number | string;
  fy?: number | string;
  r?: number | string;
};

const idPrefix = "GradientRadial-";

export function GradientRadial({
  width = "100%",
  height = "100%",
  stops = transparentToBlack,
  coordinates = {
    cx: "50%",
    cy: "50%",
    r: "50%",
    // fx: "50%",
    // fy: "50%",
  },
  style,
}: {
  width?: number | string;
  height?: number | string;
  stops?: StopData[];
  coordinates?: GradientCoordinates;
  style?: StyleProp<ViewStyle>;
}) {
  const id =
    idPrefix +
    stops
      .map((stop) => `o:${stop.offset}c:${stop.stopColor}o:${stop.stopOpacity}`)
      .join("::")
      .replace(/[^a-zA-Z0-9]/g, "_");

  return (
    <Svg width={width} height={height} style={style}>
      <Defs>
        <RadialGradient id={id} {...coordinates}>
          {stops.map((stop) => (
            <Stop
              key={`${stop.offset}-${stop.stopColor}-${stop.stopOpacity}`}
              offset={`${stop.offset}%`}
              stopColor={stop.stopColor}
              stopOpacity={stop.stopOpacity ?? "1"}
            />
          ))}
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />
    </Svg>
  );
}
