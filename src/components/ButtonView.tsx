import * as React from "react";
import type { ViewProps } from "react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { match } from "ts-pattern";

import { alpha, colors, useTheme } from "@/app/styles";
import { Size } from "@/react-multiversal";
import BlurView from "@/react-multiversal/BlurView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SpacedView from "@/react-multiversal/SpacedView";
import { UserColorScheme } from "@/react-multiversal/theme/colorScheme";
import { boxShadowGlass } from "@/react-multiversal/utils.styles";

export type Mode = "outline" | "default" | "gradient";
export type Indicator = "none" | "activity" | "success";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
  },
  indicatorContainer: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

const stylesEffect = StyleSheet.create({
  glass: {
    borderWidth: 0,
    boxShadow: boxShadowGlass(),
  },
  subtle: {
    boxShadow: [
      {
        color: alpha(colors.black, 0.04),
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
      },
      {
        color: alpha(colors.black, 0.06),
        offsetX: 0,
        offsetY: -1,
        blurRadius: 1,
        inset: true,
      },
      {
        color: alpha(colors.black, 0.1),
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadDistance: 0.1,
      },
    ],
  },
});

export type ButtonViewProps = Omit<ViewProps, "children"> & {
  alt?: boolean;
  blurAmount?: number;
  borderColorAlt?: string;
  children:
    | React.ReactNode
    | (({
        color,
        opacity,
      }: {
        color: string;
        opacity: number;
      }) => React.ReactNode)
    | undefined;
  color?: string;
  colorAlt?: string;
  indicator?: Indicator;
  indicatorSize?: number;
  mode?: Mode;
  spaceGap?: Size;
  spaceHorizontal?: Size;
  spaceVertical?: Size;
  textColor?: string;
  textColorAlt?: string;
  textColorOn?: string;
  theme?: UserColorScheme;
  effect?: "glass" | "subtle" | "none";
};

const ButtonView = ({
  alt,
  blurAmount = 0,
  borderColorAlt: _borderColorAlt,
  children,
  color: _color,
  colorAlt: _colorAlt,
  effect = "glass",
  indicator = "none",
  indicatorSize = 18,
  mode = "default",
  spaceGap = "s",
  spaceHorizontal = "m",
  spaceVertical = "s",
  style,
  textColor: _textColor,
  textColorAlt: _textColorAlt,
  textColorOn: _textColorOn,
  theme: _theme = "auto",
  ...props
}: ButtonViewProps) => {
  const theme = useTheme(_theme);
  const color = _color ?? theme.dynamicColors.backMain;
  const colorAlt = _colorAlt ?? theme.dynamicColors.backAlt;
  const textColor =
    mode === "outline"
      ? !alt
        ? (_textColor ?? theme.dynamicColors.text)
        : (_textColorAlt ?? theme.dynamicColors.textMain)
      : (_textColorOn ?? theme.dynamicColors.textOnMain);
  const borderColorAlt = _borderColorAlt ?? theme.dynamicColors.ultraLight;
  const childrenStyles = React.useMemo(() => {
    return {
      color: textColor,
      opacity: indicator !== "none" ? 0 : 1,
    };
  }, [textColor, indicator]);
  const styleBtn = React.useMemo(() => {
    return [
      styles.container,
      match(mode)
        .with("default", () => ({
          backgroundColor: !alt ? color : colorAlt,
          borderColor: "transparent",
        }))
        .with("outline", () => ({
          backgroundColor: "transparent",
          borderColor: !alt ? borderColorAlt : color,
        }))
        .with("gradient", () => ({
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
        }))
        .exhaustive(),
      match(effect)
        .with("glass", () => stylesEffect.glass)
        .with("subtle", () => stylesEffect.subtle)
        .with("none", () => null)
        .exhaustive(),
      style,
    ];
  }, [mode, alt, color, colorAlt, borderColorAlt, style, effect]);
  const elementBackground =
    mode !== "gradient" ? null : (
      <View style={StyleSheet.absoluteFill}>
        <GradientLinear
          stops={[
            {
              offset: 0,
              stopColor: !alt ? color : colorAlt,
            },
            {
              offset: 100,
              stopColor: !alt ? colorAlt : color,
            },
          ]}
          width="100%"
          height="100%"
        />
      </View>
    );
  const elementIndicator = match(indicator)
    .with("activity", () => (
      <ActivityIndicator size={indicatorSize} color={textColor} />
    ))
    .with("success", () => (
      <Text style={[{ fontSize: indicatorSize, color: textColor }]}>
        {"✔"}
      </Text>
    ))
    .with("none", () => null)
    .exhaustive();

  return (
    <BlurView blurAmount={blurAmount} style={styleBtn} {...props}>
      {elementBackground}
      <SpacedView
        horizontal={spaceHorizontal}
        vertical={spaceVertical}
        gap={spaceGap}
        style={styles.row}
      >
        {elementIndicator ? (
          <View style={styles.indicatorContainer}>{elementIndicator}</View>
        ) : null}
        {typeof children === "function" ? (
          children(childrenStyles)
        ) : (
          <Text style={[childrenStyles, styles.row]}>{children}</Text>
        )}
      </SpacedView>
    </BlurView>
  );
};

export default ButtonView;
