import ContactSurface from "@/components/ContactSurface";
import ContactTile, { ContactTileIcon } from "@/components/ContactTile";
import { socials } from "@/consts";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import { alpha, themeDark, useTheme } from "@/styles";
import SVGCopy from "@/svgs/components/SVGCopy";
import { Pressable, Text, TextStyle, View } from "react-native";

/** The estimate is one token ("~30 min"): it must never break across lines. */
const estimatePillStyle = {
  paddingHorizontal: size("xs"),
  paddingVertical: size("xxs"),
  borderRadius: 999,
  whiteSpace: "nowrap",
} as TextStyle;

export type ContactChannel = {
  key: "sms" | "mail" | "call";
  /** Empty until mounted: `sms:` and `tel:` must not ship in the static HTML. */
  href: string;
  Icon: ContactTileIcon;
  /** App icon gradient, top colour first. */
  gradient: readonly [string, string];
  /**
   * How much of the tile the glyph takes. The repo's SVGs fill their viewBox
   * edge to edge, where a real app icon leaves a wide margin around its mark -
   * so the ratio is per icon, not a constant.
   */
  iconRatio: number;
  /** Hover tint, estimate pill and copy confirmation. */
  color: string;
  title: string;
  subtitle: string;
  estimate: string;
  /**
   * How the estimate reads, not which channel it belongs to: green is the
   * site's "responsive" signal (same token as the availability badge), neutral
   * is for the estimate that promises nothing. Both inks are the AA-tuned ones,
   * which the raw channel colours are not at 11px on a white background.
   */
  estimateTone: "fast" | "neutral";
  /** The raw value a tap copies. Absent = no copy button (nothing to copy). */
  copyValue?: string;
  copyLabel?: string;
};

/**
 * Sizes are the only thing that separates the two layouts: a row on mobile
 * (icon left, text right, estimate and copy button in the free space on the
 * right), a vertical card on desktop where three of them sit side by side.
 */
const metrics = {
  row: {
    radius: size("l"),
    tile: size("xxxl"),
    titleSize: 17,
    // The right inset is a reserve, not rhythm: it is what the estimate pill
    // and the copy button need in order to never sit on the text.
    padding: {
      paddingVertical: size("m"),
      paddingLeft: size("m"),
      paddingRight: size("xxxl") + size("xl"),
    },
    layout: { flexDirection: "row", alignItems: "center", gap: size("s") },
    copy: { bottom: size("s"), right: size("s") },
  },
  card: {
    radius: size("l"),
    tile: size("xxxl"),
    titleSize: 19,
    padding: { paddingVertical: size("l"), paddingHorizontal: size("l") },
    layout: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: size("m"),
    },
    copy: { bottom: size("m"), right: size("m") },
  },
} as const;

export default function ContactChannel({
  channel,
  variant,
  copied,
  onCopy,
}: {
  channel: ContactChannel;
  variant: "row" | "card";
  copied: boolean;
  onCopy: () => void;
}) {
  const theme = useTheme();
  const m = metrics[variant];
  const hasCopy = channel.copyValue !== undefined;
  return (
    <ContactSurface
      color={channel.color}
      borderRadius={m.radius}
      // Three cards side by side end up the same height even when one title
      // wraps; in the mobile column the container has no height to fill, so
      // this is inert there.
      style={{ flexGrow: 1 }}
    >
      <LinkView
        href={channel.href}
        style={[
          m.layout,
          m.padding,
          // Room for the copy button under the text, on the card variant where
          // it cannot sit beside it.
          variant === "card" && hasCopy ? { paddingBottom: size("xxxl") } : null,
        ]}
      >
        <ContactTile
          Icon={channel.Icon}
          gradient={channel.gradient}
          size={m.tile}
          iconSize={Math.round(m.tile * channel.iconRatio)}
        />
        <View style={{ gap: size("xxs"), flexShrink: 1 }}>
          <Text
            style={[
              fontStyles.ios.headline,
              { fontSize: m.titleSize, lineHeight: m.titleSize + 5 },
              theme.styles.text,
            ]}
          >
            {channel.title}
          </Text>
          <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>{channel.subtitle}</Text>
        </View>
      </LinkView>
      <View
        style={{
          position: "absolute",
          top: size("s"),
          right: size("s"),
          pointerEvents: "none",
        }}
      >
        <Text
          style={[
            fontStyles.iosEm.caption2,
            estimatePillStyle,
            channel.estimateTone === "fast"
              ? {
                  backgroundColor: alpha(socials.call.color, 0.14),
                  color: theme.dynamicColors.inkSuccess,
                }
              : [{ backgroundColor: theme.dynamicColors.ultraLight }, theme.styles.textLight1],
          ]}
        >
          {channel.estimate}
        </Text>
      </View>
      {!hasCopy ? null : (
        <Pressable
          role="button"
          aria-label={channel.copyLabel}
          onPress={onCopy}
          // 34px of paint, 44px of target - the iOS minimum.
          hitSlop={5}
          style={{
            position: "absolute",
            ...m.copy,
            width: 34,
            height: 34,
            borderRadius: size("xs"),
            borderWidth: 1,
            borderColor: theme.dynamicColors.ultraLight,
            backgroundColor: theme.dynamicColors.backAlt,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <SVGCopy width={15} height={15} fill={theme.dynamicColors.textLight1} />
          {!copied ? null : (
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: channel.color,
              }}
            >
              <Text
                style={[fontStyles.iosEm.caption2, { fontSize: 10, color: themeDark.colors.back }]}
              >
                OK
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </ContactSurface>
  );
}
