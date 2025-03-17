import * as React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { themeDark, useTheme } from "@/app/styles";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

const borderRadius = size("s");

export default function ContactCard({
  Icon,
  title,
  subtitle,
  color,
  colorAlt,
  style,
  mode = "default",
}: {
  Icon: React.ComponentType<{
    width: number;
    height: number;
    fill: string;
    style?: StyleProp<ViewStyle>;
  }>;
  title: string;
  subtitle: string;
  color: string;
  colorAlt: string;
  style?: StyleProp<ViewStyle>;
  mode?: "default" | "outline";
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: 160,
          flexGrow: 1,
          borderRadius,
          overflow: "hidden",
          // boxShadow: boxShadows.default,
        },
        mode === "outline" && {
          borderWidth: 1,
          borderColor: color,
        },
        style,
      ]}
    >
      <SpacedView horizontal="m" vertical="m" style={{ flexGrow: 1 }}>
        {mode === "default" ? (
          <GradientLinear
            angle={60}
            stops={[
              { offset: 10, stopColor: color },
              { offset: 100, stopColor: colorAlt },
            ]}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <GradientLinear
            angle={60}
            stops={[
              { offset: 10, stopColor: color, stopOpacity: "0.01" },
              { offset: 100, stopColor: colorAlt, stopOpacity: "0.05" },
            ]}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View
          style={[
            StyleSheet.absoluteFill,
            { borderRadius, boxShadow: boxShadowGlass() },
          ]}
        />
        <Icon
          width={48}
          height={48}
          fill={mode === "default" ? "#fff" : color}
          style={{
            zIndex: 1,
            borderRadius: 4,
            filter: [
              mode === "default"
                ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                : "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
            ].join(", "),
          }}
        />
        <Spacer size="s" style={{ flexGrow: 1 }} />
        <Text
          style={[
            fontStyles.iosEm.title3,
            mode === "default" ? themeDark.styles.textOnMain : { color: color },
          ]}
        >
          {title}
        </Text>
        <Spacer size="xxxs" />
        <Text
          style={[
            fontStyles.ios.footnote,
            mode === "default"
              ? themeDark.styles.textOnMain
              : theme.styles.textLight1,
          ]}
        >
          {subtitle}
        </Text>
      </SpacedView>
    </View>
  );
}
