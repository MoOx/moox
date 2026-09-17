import { GradientStop } from "@/react-multiversal/gradient";
import { useId } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

export default function GradientBorderCircle({
  width,
  borderWidth,
  style,
  stops,
}: {
  width: number;
  borderWidth: number;
  style?: StyleProp<ViewStyle>;
  stops: GradientStop[];
}) {
  const id = useId();

  return (
    <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} style={style}>
      <Defs>
        <LinearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          {stops.map((stop) => (
            <Stop
              key={`${stop.offset}-${stop.color}`}
              offset={`${stop.offset}%`}
              stopColor={stop.color}
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
