import Image from "@/components/Image";
import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import { LinkTextProps } from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { alpha, colors, gradientFlashyStops, useTheme } from "@/styles";
import SVGInfoCircle from "@/svgs/components/SVGInfoCircle";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const borderRadius = size("s");

/**
 * Low-level dark card. Two backgrounds: "gradient" is the movie-poster style -
 * optional background image with the gradient laid over it (image readable at
 * the top, text sitting on the solid bottom); without an image the gradient IS
 * the background, like the skill cards. "glass" is the translucent tile of the
 * dark bands (same recipe as StatTile), for cards sitting on a gradient band.
 * Slots have opinionated default positions - icon tile, pretitle in small
 * caps, title big, subtitle, text, `children`, tags - pass only what the card
 * needs, or take over entirely with `children`.
 */
export default function Card({
  pretitle,
  title,
  subtitle,
  text,
  tags,
  image,
  icon,
  background = "gradient",
  infoHref,
  infoLabel,
  infoOnPress,
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
  /** App-icon-like tile (or anything) rendered above the pretitle. */
  icon?: ReactNode;
  /** "gradient" (default) or "glass" - the StatTile translucent recipe. */
  background?: "gradient" | "glass";
  /** Renders the ⓘ button (top right), e.g. to the entry's detail modal. */
  infoHref?: string;
  /** Accessible name of the ⓘ button - required with `infoHref`. */
  infoLabel?: string;
  /**
   * Intercepts the ⓘ click (e.g. to open the detail as a modal with a masked
   * URL while `infoHref` stays the real, crawlable page). Call
   * `preventDefault()` inside to stop the href navigation.
   */
  infoOnPress?: LinkTextProps["onPress"];
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
      {background === "glass" ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius,
              backgroundColor: alpha(colors.white, 0.12),
              borderWidth: 1,
              borderColor: alpha(colors.white, 0.18),
            },
          ]}
        />
      ) : (
        <>
          <GradientLinear style={StyleSheet.absoluteFill} stops={gradientFlashyStops(theme)} />
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
                objectPosition: "top",
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
        </>
      )}
      {background === "gradient" ? (
        <View style={[StyleSheet.absoluteFill, { borderRadius, boxShadow: boxShadowGlass() }]} />
      ) : null}
      {infoHref ? (
        <LinkView
          href={infoHref}
          onPress={infoOnPress}
          // containerStyle, not style: this must position/size the <a>
          // itself - on the inner text node the anchor collapses to a
          // 0-height strip and only the overflowing icon stays clickable.
          containerStyle={{
            position: "absolute",
            top: size("s"),
            right: size("s"),
            zIndex: 1,
          }}
        >
          <TextForReader>{infoLabel ?? "Details"}</TextForReader>
          <SVGInfoCircle width={24} height={24} color={alpha(colors.white, 0.5)} />
        </LinkView>
      ) : null}
      <SpacedView
        horizontal="m"
        vertical="m"
        gap="xxs"
        style={{ flexGrow: 1, minHeight, justifyContent: "space-between" }}
      >
        <View>
          {icon ? (
            <View aria-hidden={true} style={{ alignSelf: "flex-start", marginBottom: size("s") }}>
              {icon}
            </View>
          ) : null}
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
              style={[fontStyles.iosEm.title2, { color: colors.white, fontWeight: weight.bold }]}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.66) }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View>
          {text ? (
            <Text
              style={[fontStyles.ios.footnote, { color: alpha(colors.white, 0.9) }]}
              numberOfLines={2}
            >
              {text}
            </Text>
          ) : null}
          {children}
          {tags && tags.length > 0 ? (
            <Text style={[fontStyles.ios.caption2, { color: alpha(colors.white, 0.55) }]}>
              {tags.join(" · ")}
            </Text>
          ) : null}
        </View>
      </SpacedView>
    </View>
  );
}
