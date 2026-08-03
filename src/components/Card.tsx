import Image from "@/components/Image";
import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { alpha, colors, gradientFlashyStops, useTheme } from "@/styles";
import SVGInfoCircle from "@/svgs/components/SVGInfoCircle";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const borderRadius = size("s");

/**
 * Low-level dark card, movie-poster style: optional background image with the
 * gradient laid over it (image readable at the top, text sitting on the solid
 * bottom); without an image the gradient IS the background, like the skill
 * cards. Slots have opinionated default positions - pretitle in small caps,
 * title big, subtitle, text, `children`, tags - pass only what the card
 * needs, or take over entirely with `children`.
 */
export default function Card({
  pretitle,
  title,
  subtitle,
  text,
  tags,
  image,
  infoHref,
  infoLabel,
  minHeight,
  children,
  style,
}: {
  /** Small caps line above the title (e.g. the job title). */
  pretitle?: string;
  title?: string;
  subtitle?: string;
  /** Body copy (e.g. the pitch). */
  text?: string;
  /** Joined with dots on the last line. */
  tags?: string[];
  /** Background illustration; the gradient keeps the text legible over it. */
  image?: string;
  /** [from, to] - dark brand colors, same family as the skill cards. */
  gradient?: [string, string];
  /** Renders the ⓘ button (top right), e.g. to the entry's detail modal. */
  infoHref?: string;
  /** Accessible name of the ⓘ button - required with `infoHref`. */
  infoLabel?: string;
  minHeight?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          borderRadius,
          overflow: "hidden",
          flexGrow: 1,
          flexShrink: 1,
          // aspectRatio: 16 / 9,
          flexBasis: 380,
        },
        style,
      ]}
      role="article"
    >
      <GradientLinear
        style={StyleSheet.absoluteFill}
        stops={gradientFlashyStops(theme)}
      />
      {image ? (
        <Image
          src={image}
          alt=""
          width={640}
          height={480}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
            // mixBlendMode: "luminosity",
          }}
        />
      ) : null}
      <GradientLinear
        angle={86}
        stops={[
          { offset: 0, stopColor: alpha("#000", 0.8) },
          { offset: 50, stopColor: alpha("#000", 0) },
          { offset: 100, stopColor: alpha("#000", 0.95) },
        ]}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { borderRadius, boxShadow: boxShadowGlass() },
        ]}
      />
      {infoHref ? (
        <LinkView
          href={infoHref}
          style={{
            position: "absolute",
            top: size("s"),
            right: size("s"),
            zIndex: 1,
          }}
        >
          <TextForReader>{infoLabel ?? "Details"}</TextForReader>
          <SVGInfoCircle
            width={24}
            height={24}
            color={alpha(colors.white, 0.5)}
          />
        </LinkView>
      ) : null}
      <SpacedView
        horizontal="m"
        vertical="m"
        gap="xxs"
        style={{ flexGrow: 1, minHeight, justifyContent: "space-between" }}
      >
        <View>
          {pretitle ? (
            <Text
              style={[
                fontStyles.iosEm.caption1,
                {
                  color: alpha(colors.white, 0.72),
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                },
              ]}
            >
              {pretitle}
            </Text>
          ) : null}
          {title ? (
            <Text
              role="heading"
              aria-level={3}
              style={[
                fontStyles.iosEm.title2,
                { color: colors.white, fontWeight: weight.bold },
              ]}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={[
                fontStyles.ios.caption1,
                { color: alpha(colors.white, 0.66) },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View>
          {text ? (
            <Text
              style={[
                fontStyles.ios.footnote,
                { color: alpha(colors.white, 0.9) },
              ]}
              numberOfLines={2}
            >
              {text}
            </Text>
          ) : null}
          {children}
          {tags && tags.length > 0 ? (
            <Text
              style={[
                fontStyles.ios.caption2,
                { color: alpha(colors.white, 0.55) },
              ]}
            >
              {tags.join(" · ")}
            </Text>
          ) : null}
        </View>
      </SpacedView>
    </View>
  );
}
