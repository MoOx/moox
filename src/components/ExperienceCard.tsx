import { useHref } from "@/i18n";
import { ResumeStat } from "@/api";
import Image from "@/components/Image";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import StatTile from "@/components/StatTile";
import { lowerKeepingAcronyms } from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GlassView from "@/react-multiversal/GlassView";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import {
  responsiveAttrs,
  responsiveProps,
  responsiveStyle,
} from "@/react-multiversal/responsiveStyle";
import LinkText from "@/react-multiversal/LinkText";
import { LinkTextProps } from "@/react-multiversal/LinkText.types";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { alpha, useTheme } from "@/styles";
import SVGExternalLink from "@/svgs/components/SVGExternalLink";
import SVGInfoCircle from "@/svgs/components/SVGInfoCircle";
import { ComponentProps } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

const borderRadius = size("s");

// Angled opacity masks: the illustration is at full strength on its outer
// edge and dissolves toward the text - no hard seam with the card surface.
// Wide screens: image on the right, fading toward the copy on the left.
const sideImageMask = "linear-gradient(100deg, transparent 10%, rgb(0, 0, 0) 90%)";
// Narrow screens: image as a top band, fading down into the card.
const topImageMask = "linear-gradient(185deg, rgb(0, 0, 0) 0%, transparent 75%)";

/** Height of the image band on narrow screens; the header sits at its bottom. */
const bandHeight = 300;

// Compact mode used to be two subtrees with a media query hiding one, so the
// image *and* the header were in the HTML twice - every job title and mission
// description duplicated for anything reading the markup. One node each now,
// with only the geometry switching. `responsiveStyle` emits media queries on
// web and resolves against the window width on native, so this stays portable.
const responsive = responsiveStyle({
  image: {
    base: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: bandHeight,
      maskImage: topImageMask,
      WebkitMaskImage: topImageMask,
    },
    [WindowWidth.m]: {
      left: "auto",
      right: 0,
      width: "50%",
      height: "100%",
      maskImage: sideImageMask,
      WebkitMaskImage: sideImageMask,
    },
  },
  // Room for the band; the header is lifted out of the flow and into it.
  body: {
    base: { paddingTop: bandHeight + size("l") },
    [WindowWidth.m]: { paddingTop: size("l") },
  },
  header: {
    base: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: bandHeight,
      justifyContent: "flex-end",
      paddingLeft: size("l"),
      paddingRight: size("l"),
    },
    [WindowWidth.m]: {
      position: "relative",
      height: "auto",
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

/**
 * Full-width experience row: quiet themed surface (hairline border + faint
 * brand tint, the StatTile "plain" family), copy on the left, the
 * illustration bleeding in from the right through `sideImageMask` (a masked
 * top band on narrow screens). Stats render
 * as accent pills, hashtags as the closing line - same slots as `Card`, laid
 * out horizontally.
 */
export default function ExperienceCard({
  mode = "compact",
  icon,
  pretitle,
  title,
  company,
  dates,
  text,
  body,
  stats,
  tags,
  links,
  image,
  infoHref,
  infoLabel,
  infoOnPress,
  style,
}: {
  /**
   * "compact" (default): the timeline/key-experience row - side image on
   * wide screens, stats as pills. "full": the detail view (modal and
   * standalone pages) - opaque surface, image always as the top band, the
   * markdown `body`, stats as tiles and the entry `links`.
   */
  mode?: "compact" | "full";
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
  /** Markdown-as-JSON body, rendered in `mode="full"` only. */
  body?: ComponentProps<typeof MdAsJsonRenderer>["body"];
  /** Entry figures - pills in compact, StatTiles in full. */
  stats?: ResumeStat[];
  /** Joined with dots on the last line. */
  tags?: string[];
  /** External proof links, rendered in `mode="full"` only. */
  links?: { title: string; url: string }[];
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
  const localizeHref = useHref();
  const full = mode === "full";

  // Header block (pretitle, icon, title, company · dates). Rendered in the
  // copy column on wide screens; on narrow screens with an image (always in
  // full mode) it overlays the image band instead.
  const header = (
    <SpacedView gap="xxs">
      {pretitle ? (
        <Text
          style={[
            fontStyles.iosEm.caption1,
            {
              color: theme.dynamicColors.inkFlashy,
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
            style={{
              borderRadius: 10,
              backgroundColor: theme.dynamicColors.back,
            }}
          />
        ) : null}
        <View style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
          {/* The heading wraps the link rather than being one: `role="heading"`
              on a LinkText lands on the <a> itself, which then stops being a
              link for a screen reader, while `aria-level` ends up on the inner
              text node - an invalid ARIA attribute on a plain div. Wrapping
              gives the real thing: <h3><a href>…</a></h3>. */}
          <View role="heading" aria-level={3}>
            {infoHref ? (
              <LinkText
                href={localizeHref(infoHref)}
                onPress={infoOnPress}
                style={[fontStyles.iosEm.title2, theme.styles.text, { fontWeight: weight.bold }]}
              >
                {title}
              </LinkText>
            ) : (
              <Text
                style={[fontStyles.iosEm.title2, theme.styles.text, { fontWeight: weight.bold }]}
              >
                {title}
              </Text>
            )}
          </View>
          {company || dates ? (
            <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
              {company ? (
                <Text style={[fontStyles.iosEm.caption1, theme.styles.textLight1]}>{company}</Text>
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
        },
        // Full mode is a reading surface (modal / standalone page): opaque
        // background; compact keeps the quiet translucent tint.
        full ? theme.styles.backOnAlt : { backgroundColor: theme.dynamicColors.backMainAlpha05 },
        style,
      ]}
    >
      {image ? (
        full ? (
          // Full mode is one layout at every width: the image is a band across
          // the top with the header over its faded bottom. Nothing is
          // duplicated here, so it stays as it was.
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
        ) : (
          // Compact mode used to render the image *and* the header twice - a
          // top band for narrow screens, a side image plus a header in the copy
          // column for wide ones - with a media query hiding one set. Both were
          // in the HTML, so every mission title and job title appeared twice to
          // anything reading the markup: 3 559 of the 3 786 hidden characters
          // on /resume were duplicates of visible text.
          //
          // One <img> now, positioned by `responsive.image` above: top band
          // under 1024px, right half over. The header follows the same route
          // from the copy column below.
          <Image
            src={image}
            alt=""
            width={640}
            height={480}
            {...responsiveAttrs(responsive.image)}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        )
      ) : null}
      {infoHref ? (
        <LinkView
          href={localizeHref(infoHref)}
          onPress={infoOnPress}
          // containerStyle, not style: this must position/size the <a>
          // itself - on the inner text node the anchor collapses to a
          // 0-height strip and only the overflowing icon stays clickable.
          containerStyle={{
            position: "absolute",
            top: size("s"),
            right: size("s"),
            zIndex: 1,
            filter: [
              "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25))",
              "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))",
              "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))",
            ].join(" "),
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
          {...(image && !full ? responsiveProps(responsive.body) : null)}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: 340, minWidth: 0 }}
        >
          {/* One header, always here. Under 1024px `responsive.header` lifts it
              out of the flow and onto the bottom of the image band, which is
              where it used to be rendered a second time. */}
          {full && image ? null : (
            <View {...(image ? responsiveProps(responsive.header) : null)}>{header}</View>
          )}
          <SpacedView gap="s">
            {text ? (
              <Text style={[fontStyles.ios.subhead, theme.styles.textLight1]}>{text}</Text>
            ) : null}
            {full && body ? <MdAsJsonRenderer body={body} /> : null}
            {stats && stats.length > 0 ? (
              full ? (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "stretch",
                    gap: size("s"),
                  }}
                >
                  {stats.map((stat) => (
                    <StatTile key={stat.label} stat={stat} flexBasis={140} />
                  ))}
                </View>
              ) : (
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
                            { color: theme.dynamicColors.inkFlashy },
                          ]}
                        >
                          {`${s.stat} ${lowerKeepingAcronyms(s.label)}`}
                        </Text>
                      </SpacedView>
                    </View>
                  ))}
                </View>
              )
            ) : null}
            {tags && tags.length > 0 ? (
              <Text style={[fontStyles.ios.caption2, theme.styles.textLight2]}>
                {tags.join(" · ")}
              </Text>
            ) : null}
            {full && links && links.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: size("xs"),
                }}
              >
                <SVGExternalLink width={12} height={12} fill={theme.dynamicColors.textMain} />
                {links.map((link) => (
                  <LinkText
                    key={link.title}
                    underline={true}
                    href={link.url}
                    style={[fontStyles.ios.footnote, theme.styles.textMain]}
                  >
                    {link.title}
                  </LinkText>
                ))}
              </View>
            ) : null}
          </SpacedView>
        </SpacedView>
        {image && !full ? (
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
