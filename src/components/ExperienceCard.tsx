import { ResumeStat } from "@/api";
import Image from "@/components/Image";
import { lowerKeepingAcronyms } from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GlassView from "@/react-multiversal/GlassView";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import { LinkTextProps } from "@/react-multiversal/LinkText";
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
const topImageMask =
  "linear-gradient(185deg, rgb(0, 0, 0) 0%, transparent 75%)";

/**
 * Full-width experience row: quiet themed surface (hairline border + faint
 * brand tint, the StatTile "plain" family), copy on the left, the
 * illustration bleeding in from the right through `sideImageMask` (a masked
 * top band on narrow screens). Stats render
 * as accent pills, hashtags as the closing line - same slots as `Card`, laid
 * out horizontally.
 */
export default function ExperienceCard({
  icon,
  pretitle,
  title,
  company,
  dates,
  text,
  stats,
  tags,
  image,
  infoHref,
  infoLabel,
  infoOnPress,
  style,
}: {
  /** Company icon, in the flow at the top left (like the CV rows). */
  icon?: string;
  /** Small caps accent line above the title (the job title). */
  pretitle?: string;
  /** The headline of the card (the entry's description). */
  title: string;
  /** Company name - quiet, on the dates line under the title. */
  company?: string;
  /** Derived period(s), rendered next to the company. */
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
  /**
   * Intercepts the ⓘ click (e.g. to open the detail as a modal with a masked
   * URL while `infoHref` stays the real, crawlable page). Call
   * `preventDefault()` inside to stop the href navigation.
   */
  infoOnPress?: LinkTextProps["onPress"];
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();

  // Header block (pretitle, icon, title, company · dates). Rendered in the
  // copy column on wide screens; on narrow screens with an image it overlays
  // the image band instead (over the faded bottom of the mask).
  const header = (
    <SpacedView gap="xxs">
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
          alignItems: "center",
          gap: size("s"),
        }}
      >
        {icon ? (
          <Image
            src={icon}
            alt={company ?? ""}
            width={64}
            height={64}
            style={{ borderRadius: 10 }}
          />
        ) : null}
        <View style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
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
          {company || dates ? (
            <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
              {company ? (
                <Text
                  style={[fontStyles.iosEm.caption1, theme.styles.textLight1]}
                >
                  {company}
                </Text>
              ) : null}
              {company && dates ? " · " : null}
              {dates}
            </Text>
          ) : null}
        </View>
      </View>
    </SpacedView>
  );

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
          {/* Image band with the header laid over it. The mask alone fades
              too late for a tall header, so a scrim (transparent → theme
              background) sits between image and text - the poster-card
              recipe, theme-aware. */}
          <View style={{ justifyContent: "flex-end", minHeight: 300 }}>
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
                maskImage: topImageMask,
                WebkitMaskImage: topImageMask,
              }}
            />
            <SpacedView horizontal="l">{header}</SpacedView>
          </View>
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
              objectPosition: "top",
              maskImage: sideImageMask,
              WebkitMaskImage: sideImageMask,
            }}
          />
        </IfWindowWidthIs>
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
            filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5))",
          }}
        >
          <TextForReader>{infoLabel ?? "Details"}</TextForReader>
          <SVGInfoCircle width={24} height={24} color={alpha("#fff", 0.85)} />
        </LinkView>
      ) : null}
      <View style={{ flexDirection: "row" }}>
        <SpacedView
          horizontal="l"
          vertical="l"
          gap="m"
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: 340, minWidth: 0 }}
        >
          {/* With an image, the mobile header lives inside the image band
              above - only the wide layout keeps it in the copy column. */}
          {image ? (
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              {header}
            </IfWindowWidthIs>
          ) : (
            header
          )}
          <SpacedView gap="s">
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
