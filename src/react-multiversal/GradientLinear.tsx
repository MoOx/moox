import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

export type GradientStop = {
  offset: number;
  stopColor: string;
  stopOpacity?: string;
};

export const transparentToBlack: GradientStop[] = [
  {
    offset: 0,
    stopColor: "#000",
    stopOpacity: "0",
  },
  {
    offset: 100,
    stopColor: "#000",
  },
];

type GradientCoordinates = {
  x1?: number | string;
  y1?: number | string;
  x2?: number | string;
  y2?: number | string;
};

const idPrefix = "GradientLinear-";

export function calculateGradientCoordinates(
  angle: number
): GradientCoordinates {
  const radians = (angle * Math.PI) / 180;
  const x1 = 0.5 + 0.5 * Math.cos(radians + Math.PI);
  const y1 = 0.5 + 0.5 * Math.sin(radians + Math.PI);
  const x2 = 0.5 + 0.5 * Math.cos(radians);
  const y2 = 0.5 + 0.5 * Math.sin(radians);
  return {
    x1: x1.toString(),
    y1: y1.toString(),
    x2: x2.toString(),
    y2: y2.toString(),
  };
}

export const GradientLinearDefs = ({
  id,
  coordinates,
  stops,
}: {
  id: string;
  coordinates: GradientCoordinates;
  stops: GradientStop[];
}) => (
  <Defs>
    <LinearGradient
      id={id}
      x1={coordinates.x1}
      y1={coordinates.y1}
      x2={coordinates.x2}
      y2={coordinates.y2}
    >
      {stops.map((stop) => (
        <Stop
          key={`${stop.offset}-${stop.stopColor}-${stop.stopOpacity}`}
          offset={`${stop.offset}%`}
          stopColor={stop.stopColor}
          stopOpacity={stop.stopOpacity ?? "1"}
        />
      ))}
    </LinearGradient>
  </Defs>
);

export default function GradientLinear({
  width = "100%",
  height = "100%",
  stops = transparentToBlack,
  angle = 0,
  style,
}: {
  width?: number | string;
  height?: number | string;
  stops?: GradientStop[];
  angle?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const coordinates = calculateGradientCoordinates(angle);
  const id =
    idPrefix +
    stops
      .map(
        (stop) =>
          `o:${stop.offset}c:${stop.stopColor}o:${stop.stopOpacity}:a${angle}`
      )
      .join("::")
      .replace(/[^a-zA-Z0-9]/g, "_");

  return (
    <Svg width={width} height={height} style={style}>
      <GradientLinearDefs id={id} coordinates={coordinates} stops={stops} />
      <Rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />
    </Svg>
  );
}
