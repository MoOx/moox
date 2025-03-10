import * as React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";

import { alpha, useTheme } from "@/app/styles";
import { AbsoluteSize } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";

export default function Pill({
  style,
  pre,
  title,
  titleStyle,
  detail,
  year,
  ago = false,
  pillSpace = "xs",
  horizontalSpace = "l",
  verticalSpace = "xs",
}: {
  style?: StyleProp<ViewStyle>;
  pre?: string;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  detail?: string;
  year: number;
  ago?: boolean;
  pillSpace?: AbsoluteSize;
  horizontalSpace?: AbsoluteSize;
  verticalSpace?: AbsoluteSize;
}) {
  const theme = useTheme();
  const thisYear = React.useMemo(() => new Date().getFullYear(), []);
  return (
    <SpacedView
      horizontal={pillSpace}
      vertical={pillSpace}
      style={[
        {
          backgroundColor: alpha(theme.colors.backMain, 0.25),
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
          borderRadius: 100,
        },
        style,
      ]}
    >
      <SpacedView
        horizontal={horizontalSpace}
        vertical={verticalSpace}
        style={[theme.styles.backAlt, { borderRadius: 100 }]}
      >
        {!pre ? null : (
          <Text
            style={[
              fontStyles.iosEm.caption2,
              theme.styles.textLight1,
              {
                lineHeight: fontStyles.iosEm.caption2.fontSize,
                fontWeight: "300",
              },
            ]}
          >
            {pre}
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
              fontWeight: "300",
              textAlign: pre || detail ? "right" : "center",
            },
          ]}
        >
          {thisYear - year + " years" + (ago ? " ago" : "")}
        </Text>
      </SpacedView>
    </SpacedView>
  );
}
