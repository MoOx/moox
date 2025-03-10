import * as React from "react";
import type { ViewProps } from "react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { match } from "ts-pattern";

import { alpha, colors, useTheme } from "@/app/styles";
import { Size } from "@/react-multiversal";
import SpacedView from "@/react-multiversal/SpacedView";
import { UserColorScheme } from "@/react-multiversal/theme/colorScheme";

export type Mode = "outline" | "default" | "gradient";
export type Indicator = "none" | "activity" | "success";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    boxShadow: [
      alpha(colors.black, 0.04) + " 0px 1px 1px 0px",
      alpha(colors.black, 0.06) + " 0px -1px 1px 0px inset",
      alpha(colors.black, 0.1) + " 0px 0px 0px 0.1px",
    ].join(","),
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export type ButtonViewProps = Omit<ViewProps, "children"> & {
  alt?: boolean;
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
  horizontalSpace?: Size;
  indicator?: Indicator;
  indicatorSize?: number;
  mode?: Mode;
  theme?: UserColorScheme;
  verticalSpace?: Size;
};

const ButtonView = ({
  alt,
  children,
  horizontalSpace = "xxl",
  indicator = "none",
  indicatorSize = 18,
  verticalSpace = "m",
  mode = "default",
  theme: _theme = "auto",
  ...props
}: ButtonViewProps) => {
  const theme = useTheme(_theme);

  const textColor =
    mode === "outline"
      ? !alt
        ? theme.dynamicColors.text
        : theme.dynamicColors.textMain
      : theme.dynamicColors.textOnMain;
  const childrenStyles = React.useMemo(() => {
    return {
      color: textColor,
      opacity: indicator !== "none" ? 0 : 1,
    };
  }, [textColor, indicator]);
  return (
    <View
      {...props}
      style={[
        styles.container,
        match(mode)
          .with("default", () => ({
            backgroundColor: !alt
              ? theme.dynamicColors.backMain
              : theme.dynamicColors.backAlt,
            borderColor: "transparent",
          }))
          .with("outline", () => ({
            backgroundColor: "transparent", // theme.dynamicColors.back,
            borderColor: !alt
              ? theme.dynamicColors.ultraLight
              : theme.dynamicColors.backMain,
          }))
          .with("gradient", () => ({
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
          }))
          .exhaustive(),
        props.style,
      ]}
    >
      {/* {mode !== "gradient" ? null : (
        <View style={StyleSheet.absoluteFill}>
          <GradientLinear
            stops={[
              {
                offset: 0,
                stopColor: !alt
                  ? theme.dynamicColors.
                  : gradients["purple100dark"][0],
              },
              {
                offset: 100,
                stopColor: !alt
                  ? gradients["purple100"][1]
                  : gradients["purple100dark"][1],
              },
            ]}
            width="100%"
            height="100%"
            x1={0}
            y1={0}
            x2={"100%"}
            y2={0}
          />
        </View>
      )} */}
      <SpacedView
        horizontal={horizontalSpace}
        vertical={verticalSpace}
        style={styles.row}
      >
        {indicator === "none" ? null : indicator === "activity" ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size={indicatorSize} color={textColor} />
          </View>
        ) : (
          indicator === "success" && (
            <View style={styles.indicatorContainer}>
              <Text style={[{ fontSize: indicatorSize, color: textColor }]}>
                {"✔"}
              </Text>
            </View>
          )
        )}
        {typeof children === "function" ? (
          children(childrenStyles)
        ) : (
          <Text style={childrenStyles}>{children}</Text>
        )}
      </SpacedView>
    </View>
  );
};

export default ButtonView;
