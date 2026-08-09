"use client";

import { useTheme } from "@/styles";
import { useHref, useT } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import Spacer from "@/react-multiversal/Spacer";
import { useFocus } from "@/react-multiversal/useFocus";
import { useRef } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";

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
  showText,
  text,
  link = true,
}: {
  style?: StyleProp<ViewStyle>;
  showText: boolean | "on-focus";
  /** Label next to the dot - the CV says "Available now", the site says more. */
  text?: string;
  /**
   * The badge normally links to /contact. On /contact itself that would be a
   * link to the page you are already on, so the badge stays a statement.
   */
  link?: boolean;
}) {
  const ref = useRef<Text>(null);
  const localizeHref = useHref();
  const theme = useTheme();
  const t = useT();
  const label = text ?? t({ en: "Available for Work", fr: "Disponible pour une mission" });
  const [hasAnyFocus] = useFocus(ref, { debounceOff: 500 });

  const badge = (
    <Animated.View
      // The pulse is a Reanimated CSS animation, so it is an inline style: the
      // reduced-motion rule in `styles.css` needs something to aim at.
      dataSet={{ availabilityPulse: "true" }}
      style={[
        {
          display: "flex",
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
      {!showText ? null : (
        <Animated.View
          style={[
            { display: "flex", flexDirection: "row" },
            showText === "on-focus" && {
              opacity: hasAnyFocus ? 1 : 0,
              transform: [{ translateX: hasAnyFocus ? 0 : -20 }],
              width: hasAnyFocus ? "auto" : 0,
              height: hasAnyFocus ? "auto" : 0,
              overflow: "hidden",
              // transitionProperty: ["opacity", "transform", "width", "height"],
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
            },
          ]}
        >
          <Spacer size="xxs" />
          <Text
            style={[
              fontStyles.iosEm.caption2,
              {
                lineHeight: fontStyles.iosEm.caption2.fontSize,
                color: theme.dynamicColors.inkSuccess,
                textTransform: "uppercase",
              },
            ]}
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );

  return !link ? (
    badge
  ) : (
    <LinkView ref={ref} href={localizeHref("/contact")}>
      {badge}
    </LinkView>
  );
}
