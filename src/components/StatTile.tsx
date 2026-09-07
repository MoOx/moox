import { ProfileStat } from "@/profile";
import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, colors, useTheme } from "@/styles";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export type StatTileVariant =
  /** White card, hairline border - on the light bands. */
  | "plain"
  /** Filled gradient card - for the one figure that must pop. */
  | "gradient"
  /** Translucent card - inside a dark / gradient section. */
  | "glass";

/**
 * A single figure of the CV ("player-card" tile).
 *
 * One layout handles both shapes of `ResumeStat`:
 * - profile stat `{ stat, label, comment }` → LABEL / value / comment
 * - markdown stat `{ title, stat, label, comment }` → TITLE / value / label / comment
 */
export default function StatTile({
  stat,
  variant = "plain",
  valueFontSize = 26,
  showComment = true,
  flexBasis = 100,
}: {
  stat: ProfileStat;
  variant?: StatTileVariant;
  valueFontSize?: number;
  /** Drop the smallest line where vertical space is tight. */
  showComment?: boolean;
  /** Preferred width in the row; tiles grow and shrink from there. */
  flexBasis?: number;
}) {
  const theme = useTheme();
  const onDark = variant !== "plain";

  // The eyebrow is the stat's own title when it has one, else its label - and
  // then the label moves under the value (so nothing is printed twice).
  const eyebrow = stat.title ?? stat.label;
  const sub = stat.title ? stat.label : stat.comment;
  const subSmall = stat.title ? stat.comment : undefined;

  // Sizing goes on the outer element (the link when there is one, so the <a>
  // itself takes the row width), the looks on the frame.
  const outerStyle = { flexGrow: 1, flexShrink: 1, flexBasis };
  const frameStyle: StyleProp<ViewStyle> = [
    { borderRadius: size("xs"), overflow: "hidden", flexGrow: 1 },
    variant === "plain" ? { borderWidth: 1, borderColor: theme.dynamicColors.ultraLight } : null,
    variant === "glass"
      ? {
          backgroundColor: alpha(colors.white, 0.12),
          borderWidth: 1,
          borderColor: alpha(colors.white, 0.18),
        }
      : null,
  ];

  const content: ReactNode = (
    <>
      {variant === "gradient" ? (
        <GradientLinear
          angle={130}
          stops={[
            { offset: 0, color: theme.dynamicColors.textFlashy2 },
            { offset: 100, color: theme.dynamicColors.textFlashy3 },
          ]}
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      <SpacedView horizontal="s" vertical="s">
        <Text
          style={[
            fontStyles.ios.caption2,
            {
              fontWeight: weight.bold,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: onDark ? alpha(colors.white, 0.82) : theme.dynamicColors.textLight2,
            },
          ]}
        >
          {eyebrow}
        </Text>

        <Text
          style={{
            fontSize: valueFontSize,
            lineHeight: valueFontSize * 1.1,
            fontWeight: weight.black,
            color: onDark ? colors.white : theme.dynamicColors.textIndigoAlt2,
          }}
        >
          {stat.stat}
        </Text>

        {sub ? (
          <Text
            style={[
              fontStyles.ios.caption2,
              {
                color: onDark ? alpha(colors.white, 0.78) : theme.dynamicColors.textLight1,
              },
            ]}
          >
            {sub}
          </Text>
        ) : null}

        {subSmall && showComment ? (
          <Text
            style={[
              fontStyles.ios.caption2,
              {
                color: onDark ? alpha(colors.white, 0.6) : theme.dynamicColors.textLight2,
              },
            ]}
          >
            {subSmall}
          </Text>
        ) : null}
      </SpacedView>
    </>
  );

  // In `LinkText` the outer <a> takes `containerStyle` (`style` goes to the text
  // node inside), so the sizing must go there for the tile to fill its column.
  return stat.url ? (
    <LinkView
      href={stat.url}
      underlineOnFocus={false}
      containerStyle={outerStyle}
      style={{ flexGrow: 1 }}
    >
      <View style={frameStyle}>{content}</View>
    </LinkView>
  ) : (
    <View style={[outerStyle, frameStyle]}>{content}</View>
  );
}
