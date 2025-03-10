import * as React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";
import type { AnimatedStyle } from "react-native-reanimated";

import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import Spacer from "@/react-multiversal/Spacer";
import { useFocus } from "@/react-multiversal/useFocus";

const pulseAnimationFrames: CSSAnimationKeyframes = {
  "0%": {
    transform: "scale(0.98)",
    boxShadow: "0 0 0 0 rgba(40, 199, 128, 0.2)",
  },
  "70%": {
    transform: "scale(1)",
    boxShadow: "0 0 0 8px rgba(40, 199, 128, 0)",
  },
  "100%": {
    transform: "scale(0.98)",
    boxShadow: "0 0 0 0 rgba(40, 199, 128, 0)",
  },
};

const pulseAnimationStyle: AnimatedStyle<any> = {
  animationName: pulseAnimationFrames,
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
};

export default function AvailabilityBadge({
  style,
  showTextOnFocus = false,
}: {
  style?: StyleProp<ViewStyle>;
  showTextOnFocus?: boolean;
}) {
  const ref = React.useRef<Text>(null);
  const [hasAnyFocus] = useFocus(ref);

  return (
    <LinkView ref={ref} href="/contact">
      <Animated.View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: "rgba(40, 199, 128, 0.15)",
            paddingHorizontal: size("xs"),
            paddingVertical: size("xs"),
          },
          pulseAnimationStyle,
          style,
        ]}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: "#28c780",
          }}
        />
        <Animated.View
          style={[
            { flexDirection: "row" },
            showTextOnFocus &&
              ({
                opacity: hasAnyFocus ? 1 : 0,
                transform: [{ translateX: hasAnyFocus ? 0 : -20 }],
                width: hasAnyFocus ? "auto" : 0,
                height: hasAnyFocus ? "auto" : 0,
                overflow: "hidden",
                transitionProperty: ["opacity", "transform", "width", "height"],
                transitionDuration: 300,
                transitionTimingFunction: "ease-in-out",
              } as AnimatedStyle<any>),
          ]}
        >
          <Spacer size="xxs" />
          <Text
            style={[
              fontStyles.iosEm.caption2,
              {
                lineHeight: fontStyles.iosEm.caption2.fontSize,
                color: "#039754",
                textTransform: "uppercase",
              },
            ]}
          >
            {"Available for Work"}
          </Text>
        </Animated.View>
      </Animated.View>
    </LinkView>
  );
}
