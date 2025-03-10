import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface StopData {
  offset: number;
  stopColor: string;
  stopOpacity: string;
}

export default function GradientBorderCircle({
  width,
  borderWidth,
  style,
  stops,
}: {
  width: number;
  borderWidth: number;
  style?: StyleProp<ViewStyle>;
  stops: StopData[];
}) {
  const id = React.useId();

  return (
    <Svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      style={style}
    >
      <Defs>
        <LinearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          {stops.map((stop) => (
            <Stop
              key={`${stop.offset}-${stop.stopColor}-${stop.stopOpacity}`}
              offset={`${stop.offset}%`}
              stopColor={stop.stopColor}
              stopOpacity={stop.stopOpacity}
            />
          ))}
        </LinearGradient>
      </Defs>
      <Circle
        cx={width / 2}
        cy={width / 2}
        r={(width - borderWidth) / 2}
        fill="transparent"
        stroke={`url(#${id})`}
        strokeWidth={borderWidth}
      />
    </Svg>
  );
}
