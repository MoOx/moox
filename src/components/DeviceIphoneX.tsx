import SVGDeviceIphoneX from "@/svgs/components/SVGDeviceiPhoneX";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
const originalHeight = 788;
const originalWidth = 389;
const originalRatio = originalHeight / originalWidth;

export default function DeviceIphone({
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
  const height = width * originalRatio;

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
          margin: width * 0.05,
          borderRadius: width * 0.1,
          overflow: "hidden",
        }}
      >
        {children}
      </View>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}>
        <SVGDeviceIphoneX width={width} height={height} />
      </View>
    </Animated.View>
  );
}
