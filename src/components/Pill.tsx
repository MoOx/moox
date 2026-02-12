import { AbsoluteSize } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import GlassView from "@/react-multiversal/GlassView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { alpha, useTheme } from "@/styles";
import { useMemo } from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";

export default function Pill({
  style,
  pre,
  title,
  titleStyle,
  detail,
  year,
  ago = false,
  pillSpace = "xs",
  spaceHorizontal = "l",
  spaceVertical = "xs",
  transitionSize = "",
}: {
  style?: StyleProp<ViewStyle>;
  pre?: string;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  detail?: string;
  year: number;
  ago?: boolean;
  pillSpace?: AbsoluteSize;
  spaceHorizontal?: AbsoluteSize;
  spaceVertical?: AbsoluteSize;
  transitionSize?: string;
}) {
  const theme = useTheme();
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const viewTransitionName =
    "text--" +
    (title + pre + detail + year).replace(/[^a-z0-9/s]+/gi, "-") +
    transitionSize;
  return (
    <GlassView
      borderWidth={0.5}
      style={[
        {
          backgroundColor: alpha(theme.colors.backMain, 0.25),
          borderRadius: 100,
        },
        style,
      ]}
    >
      <SpacedView
        horizontal={pillSpace}
        vertical={pillSpace}
        style={{ viewTransitionName }}
      >
        <SpacedView
          horizontal={spaceHorizontal}
          vertical={spaceVertical}
          style={[theme.styles.backAlt, { borderRadius: 100 }]}
        >
          <Text
            role="paragraph"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {!pre ? null : (
              <Text
                style={[
                  fontStyles.iosEm.caption2,
                  theme.styles.textLight1,
                  {
                    lineHeight: fontStyles.iosEm.caption2.fontSize,
                    fontWeight: "400",
                  },
                ]}
              >
                {pre + " "}
              </Text>
            )}
            <Text
              style={[
                titleStyle || fontStyles.iosEm.caption1,
                pre ? theme.styles.textMainDark : theme.styles.textMain,
                {
                  lineHeight: titleStyle
                    ? undefined
                    : fontStyles.iosEm.caption1.fontSize,
                  fontWeight: "800",
                },
              ]}
            >
              {title}
              {!detail ? null : (
                <Text
                  style={[
                    fontStyles.iosEm.caption2,
                    theme.styles.textLight1,
                    {
                      position: "absolute",
                      top: 12,
                      left: 0,
                      lineHeight: fontStyles.iosEm.caption2.fontSize,
                      fontWeight: "300",
                    },
                  ]}
                >
                  <TextForReader>{", "}</TextForReader>
                  {detail}
                </Text>
              )}
            </Text>

            <Text
              style={[
                fontStyles.iosEm.caption2,
                pre ? theme.styles.textMain : theme.styles.text,
                {
                  lineHeight: fontStyles.iosEm.caption2.fontSize,
                  fontWeight: "400",
                  textAlign: pre || detail ? "right" : "center",
                },
              ]}
            >
              <TextForReader>{" " + (ago ? ": " : "for ")}</TextForReader>
              {thisYear - year + " years" + (ago ? " ago" : "")}
              <TextForReader>{"."}</TextForReader>
            </Text>
          </Text>
        </SpacedView>
      </SpacedView>
    </GlassView>
  );
}
