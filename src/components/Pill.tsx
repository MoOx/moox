import { l, Localized, useLang, useT } from "@/i18n";
import { AbsoluteSize } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import GlassView from "@/react-multiversal/GlassView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextBlock from "@/react-multiversal/TextBlock";
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
  mode = "default",
  pillSpace = "xs",
  spaceHorizontal = "l",
  spaceVertical = "xs",
  transitionSize = "",
}: {
  style?: StyleProp<ViewStyle>;
  pre?: Localized;
  title: Localized;
  titleStyle?: StyleProp<TextStyle>;
  detail?: Localized;
  year: number;
  mode?: "default" | "ago" | "year";
  pillSpace?: AbsoluteSize;
  spaceHorizontal?: AbsoluteSize;
  spaceVertical?: AbsoluteSize;
  transitionSize?: string;
}) {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const years = thisYear - year;
  // "19 years" / "19 ans", "20 years ago" / "il y a 20 ans" - French puts the
  // "ago" in front, so the whole phrase is built per language, not glued.
  const duration =
    lang === "fr"
      ? `${mode === "ago" ? "il y a " : ""}${years} an${years > 1 ? "s" : ""}`
      : `${years} year${years > 1 ? "s" : ""}${mode === "ago" ? " ago" : ""}`;
  const viewTransitionName =
    "text--" +
    (l(title, "en") + l(pre, "en") + l(detail, "en") + year).replace(/[^a-z0-9/s]+/gi, "-") +
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
      <SpacedView horizontal={pillSpace} vertical={pillSpace} style={{ viewTransitionName }}>
        <SpacedView
          horizontal={spaceHorizontal}
          vertical={spaceVertical}
          style={[theme.styles.backAlt, { borderRadius: 100 }]}
        >
          <TextBlock>
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
                {t(pre) + " "}
              </Text>
            )}
            <Text
              style={[
                titleStyle || fontStyles.iosEm.caption1,
                pre ? theme.styles.textMainDark : theme.styles.textMain,
                {
                  lineHeight: titleStyle ? undefined : fontStyles.iosEm.caption1.fontSize,
                  fontWeight: "800",
                },
              ]}
            >
              {t(title)}
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
                  {t(detail)}
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
              {mode === "year" ? (
                year
              ) : (
                <>
                  <TextForReader>
                    {" " + (mode === "ago" ? ": " : lang === "fr" ? "depuis " : "for ")}
                  </TextForReader>
                  {duration}
                  <TextForReader>{"."}</TextForReader>
                </>
              )}
            </Text>
          </TextBlock>
        </SpacedView>
      </SpacedView>
    </GlassView>
  );
}
