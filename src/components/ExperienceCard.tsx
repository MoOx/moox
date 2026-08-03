import { ResumeStat } from "@/api";
import Image from "@/components/Image";
import { lowerKeepingAcronyms } from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GlassView from "@/react-multiversal/GlassView";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { alpha, useTheme } from "@/styles";
import SVGInfoCircle from "@/svgs/components/SVGInfoCircle";
import { StyleProp, Text, View, ViewStyle } from "react-native";

const borderRadius = size("s");

// Angled opacity masks: the illustration is at full strength on its outer
// edge and dissolves toward the text - no hard seam with the card surface.
// Wide screens: image on the right, fading toward the copy on the left.
const sideImageMask =
  "linear-gradient(100deg, transparent 10%, rgb(0, 0, 0) 90%)";
// Narrow screens: image as a top band, fading down into the card.
const topImageMask = "linear-gradient(160deg, #000 30%, transparent 92%)";

/**
 * Full-width experience row: quiet themed surface (hairline border + faint
 * brand tint, the StatTile "plain" family), copy on the left, the
 * illustration bleeding in from the right through `sideImageMask` (a masked
 * top band on narrow screens). Stats render
 * as accent pills, hashtags as the closing line - same slots as `Card`, laid
 * out horizontally.
 */
export default function ExperienceCard({
  pretitle,
  title,
  dates,
  text,
  stats,
  tags,
  image,
  infoHref,
  infoLabel,
  style,
}: {
  /** Small caps accent line above the company (the job title). */
  pretitle?: string;
  title: string;
  /** Derived period(s), rendered on the title's baseline. */
  dates?: string;
  /** Body copy (the pitch). */
  text?: string;
  /** Entry figures, one pill each ("900M+ trips / year"). */
  stats?: ResumeStat[];
  /** Joined with dots on the last line. */
  tags?: string[];
  /** Illustration fading in from the right edge. */
  image?: string;
  /** Renders the ⓘ button (top right), e.g. to the entry's detail modal. */
  infoHref?: string;
  /** Accessible name of the ⓘ button - required with `infoHref`. */
  infoLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <GlassView
      role="article"
      style={[
        {
          borderRadius,
          overflow: "hidden",
          backgroundColor: theme.dynamicColors.backMainAlpha05,
        },
        style,
      ]}
    >
      {image ? (
        <IfWindowWidthIs smallerThan={WindowWidth.m}>
          <Image
            src={image}
            alt=""
            width={640}
            height={480}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              maskImage: topImageMask,
              WebkitMaskImage: topImageMask,
            }}
          />
        </IfWindowWidthIs>
      ) : null}
      {image ? (
        <IfWindowWidthIs largerThan={WindowWidth.m}>
          <Image
            src={image}
            alt=""
            width={640}
            height={480}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              objectFit: "cover",
              maskImage: sideImageMask,
              WebkitMaskImage: sideImageMask,
            }}
          />
        </IfWindowWidthIs>
      ) : null}
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
            color={alpha(theme.colors.text, 0.5)}
          />
        </LinkView>
      ) : null}
      <View style={{ flexDirection: "row" }}>
        <SpacedView
          horizontal="l"
          vertical="l"
          gap="s"
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: 340, minWidth: 0 }}
        >
          <View>
            {pretitle ? (
              <Text
                style={[
                  fontStyles.iosEm.caption1,
                  {
                    color: theme.dynamicColors.textFlashy2,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  },
                ]}
              >
                {pretitle}
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                flexWrap: "wrap",
                columnGap: size("s"),
              }}
            >
              <Text
                role="heading"
                aria-level={3}
                style={[
                  fontStyles.iosEm.title2,
                  theme.styles.text,
                  { fontWeight: weight.bold },
                ]}
              >
                {title}
              </Text>
              {dates ? (
                <Text
                  style={[fontStyles.ios.caption1, theme.styles.textLight2]}
                >
                  {dates}
                </Text>
              ) : null}
            </View>
          </View>
          {text ? (
            <Text style={[fontStyles.ios.subhead, theme.styles.textLight1]}>
              {text}
            </Text>
          ) : null}
          {stats && stats.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: size("xs"),
              }}
            >
              {stats.map((s) => (
                <View
                  key={s.label}
                  style={{
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: alpha(theme.colors.textFlashy2, 0.35),
                    backgroundColor: alpha(theme.colors.textFlashy2, 0.08),
                  }}
                >
                  <SpacedView horizontal="xs" vertical="xxs">
                    <Text
                      style={[
                        fontStyles.iosEm.caption2,
                        { color: theme.dynamicColors.textFlashy2 },
                      ]}
                    >
                      {`${s.stat} ${lowerKeepingAcronyms(s.label)}`}
                    </Text>
                  </SpacedView>
                </View>
              ))}
            </View>
          ) : null}
          {tags && tags.length > 0 ? (
            <Text style={[fontStyles.ios.caption2, theme.styles.textLight2]}>
              {tags.join(" · ")}
            </Text>
          ) : null}
        </SpacedView>
        {image ? (
          // Reserved room so the copy never sits on the strong part of the
          // side image.
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            <View
              style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 180,
                minWidth: 90,
              }}
            />
          </IfWindowWidthIs>
        ) : null}
      </View>
    </GlassView>
  );
}
