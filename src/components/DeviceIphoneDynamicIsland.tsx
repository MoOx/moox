import SVGDeviceiPhoneDynamicIsland from "@/svgs/components/SVGDeviceiPhoneDynamicIsland";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

const deviceOriginalHeight = 388;
const deviceOriginalWidth = 188;
export const deviceOriginalRatio = deviceOriginalHeight / deviceOriginalWidth;

export default function DeviceiPhoneDynamicIsland({
  style,
  width,
  children,
  backgroundColor = "#fff",
}: {
  style?: StyleProp<ViewStyle>;
  width: number;
  children: ReactNode;
  backgroundColor?: string;
}) {
  const height = width * deviceOriginalRatio;

  return (
    <Animated.View
      style={[
        style,
        {
          width,
          height,
        },
      ]}
    >
      <View
        style={{
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor,
          marginHorizontal: width * 0.045,
          marginVertical: width * 0.035,
          borderRadius: width * 0.1,
          overflow: "hidden",
        }}
      >
        {children}
      </View>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}>
        <SVGDeviceiPhoneDynamicIsland width={width} height={height} />
      </View>
    </Animated.View>
  );
}
