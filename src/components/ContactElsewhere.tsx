import {
  contactChipLabelDataSet,
  contactHoverableDataSet,
} from "@/components/ContactPageStyles";
import ContactTile, { ContactTileIcon } from "@/components/ContactTile";
import { socials } from "@/consts";
import { useT } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import { useTheme } from "@/styles";
import SVGAppStoreNpm from "@/svgs/components/SVGAppStoreNpm";
import SVGSocialBsky from "@/svgs/components/SVGSocialBsky";
import SVGSocialDribbble from "@/svgs/components/SVGSocialDribbble";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialX from "@/svgs/components/SVGSocialX";
import { Text, TextStyle, View } from "react-native";

type App = {
  label: string;
  href: string;
  Icon: ContactTileIcon;
  /** Top and bottom of the tile. Absent when the logo is the tile. */
  gradient?: readonly [string, string];
  /**
   * How much of the tile the glyph takes. 1 is a logo that is already a
   * full-bleed app icon; above 1 is a mark that sits small inside its own
   * viewBox and has to be scaled past the edges to read at icon size.
   */
  iconRatio: number;
};

const tileSize = size("xxl");

const apps: App[] = [
  {
    label: "GitHub",
    href: socials.github.value,
    Icon: SVGSocialGithub,
    iconRatio: 0.75,
    gradient: [socials.github.color, socials.github.colorAlt],
  },
  {
    label: "Dribbble",
    href: socials.dribbble.value,
    Icon: SVGSocialDribbble,
    iconRatio: 0.7,
    gradient: [socials.dribbble.colorAlt, socials.dribbble.color],
  },
  {
    label: "npm",
    href: socials.npm.value,
    Icon: SVGAppStoreNpm,
    iconRatio: 1,
  },
  {
    label: "Bluesky",
    href: socials.bsky.value,
    Icon: SVGSocialBsky,
    iconRatio: 0.6,
    gradient: [socials.bsky.colorAlt, socials.bsky.color],
  },
  {
    label: "X",
    href: socials.x.value,
    Icon: SVGSocialX,
    gradient: [socials.x.color, socials.x.colorAlt],
    iconRatio: 0.6,
  },
];

/** Section overline: monospace, wide-tracked, the same one the CV uses. */
const overlineStyle = {
  fontSize: 11,
  lineHeight: 14,
  letterSpacing: 1.76,
  textTransform: "uppercase",
} as TextStyle;

function ContactApp({ app }: { app: App }) {
  const theme = useTheme();
  return (
    <View dataSet={contactHoverableDataSet}>
      <LinkView
        href={app.href}
        style={{ alignItems: "center", gap: size("xxs") }}
      >
        <ContactTile
          Icon={app.Icon}
          gradient={app.gradient}
          size={tileSize}
          iconSize={Math.round(tileSize * app.iconRatio)}
        />
        <Text
          numberOfLines={1}
          dataSet={contactChipLabelDataSet}
          style={[
            fontStyles.ios.caption2,
            theme.styles.textLight1,
            { textAlign: "center" },
          ]}
        >
          {app.label}
        </Text>
      </LinkView>
    </View>
  );
}

/**
 * Everything that is not an inbox. Separated from the channels above rather
 * than mixed in with them: a profile is not a way to reach someone, and the
 * page is only useful if that distinction is visible at a glance. Laid out as
 * a home screen, which is exactly what it is - somewhere to wander off to.
 */
export default function ContactElsewhere() {
  const theme = useTheme();
  const t = useT();
  return (
    <View
      style={{
        gap: size("m"),
        paddingTop: size("m"),
        borderTopWidth: 1,
        borderColor: theme.dynamicColors.ultraLight,
      }}
    >
      <View style={{ gap: size("xxxs") }}>
        <Text
          role="heading"
          aria-level={2}
          style={[overlineStyle, theme.styles.textLight1]}
        >
          {t({ en: "Elsewhere", fr: "Ailleurs" })}
        </Text>
        <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
          {t({
            en: "Not inboxes. Just where I hang out.",
            fr: "Pas des boîtes de réception. Juste là où je traîne.",
          })}
        </Text>
      </View>
      <View
        role="list"
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingInline: size("s"),
          gap: size("m"),
        }}
      >
        {apps.map((app) => (
          <View role="listitem" key={app.label}>
            <ContactApp app={app} />
          </View>
        ))}
      </View>
    </View>
  );
}
