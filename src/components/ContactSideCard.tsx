import ContactSurface from "@/components/ContactSurface";
import ContactTile, { ContactTileIcon } from "@/components/ContactTile";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import { useTheme } from "@/styles";
import { ComponentType } from "react";
import { Text, View } from "react-native";

const metrics = {
  row: {
    titleSize: 16,
    padding: size("m"),
    layout: { flexDirection: "column", gap: size("s") },
  },
  card: {
    titleSize: 17,
    padding: size("l"),
    layout: { flexDirection: "row", alignItems: "center", gap: size("m") },
  },
} as const;

const tileSize = size("xxl");

/**
 * The two links that are neither a conversation nor a meeting: saving Max's
 * card, and LinkedIn. Same material as a channel row, but tinted at rest -
 * they are secondary, not neutral.
 */
export default function ContactSideCard({
  variant,
  href,
  Icon,
  CornerIcon,
  gradient,
  backgroundColor,
  iconColor,
  iconRatio = 0.8,
  color,
  cornerColor,
  title,
  subtitle,
}: {
  variant: "row" | "card";
  href: string;
  Icon: ContactTileIcon;
  /** Download, external link: what the card does, in the free corner. */
  CornerIcon: ComponentType<{ width: number; height: number; fill?: string }>;
  gradient?: readonly [string, string];
  backgroundColor?: string;
  iconColor?: string;
  /** 1 for a logo that is already an app icon, ~0.5 for a bare glyph. */
  iconRatio?: number;
  color: string;
  cornerColor: string;
  title: string;
  subtitle: string;
}) {
  const theme = useTheme();
  const m = metrics[variant];
  return (
    <ContactSurface color={color} borderRadius={size("l")} resting={true} style={{ flexGrow: 1 }}>
      <LinkView href={href} style={[m.layout, { padding: m.padding }]}>
        <ContactTile
          Icon={Icon}
          gradient={gradient}
          backgroundColor={backgroundColor}
          iconColor={iconColor}
          size={tileSize}
          iconSize={Math.round(tileSize * iconRatio)}
        />
        <View style={{ gap: size("xxxs"), flexShrink: 1 }}>
          <Text
            style={[
              fontStyles.ios.headline,
              { fontSize: m.titleSize, lineHeight: m.titleSize + 5 },
              theme.styles.text,
            ]}
          >
            {title}
          </Text>
          <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>{subtitle}</Text>
        </View>
      </LinkView>
      <View
        // Decoration: "Download vCard" and "Message me on LinkedIn" already
        // say what the corner glyph is hinting at.
        aria-hidden={true}
        style={{
          position: "absolute",
          top: size("m"),
          right: size("m"),
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        <CornerIcon width={15} height={15} fill={cornerColor} />
      </View>
    </ContactSurface>
  );
}
