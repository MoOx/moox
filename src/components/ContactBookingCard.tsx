import {
  contactBadgeDataSet,
  contactHoverableDataSet,
  contactHoverDataSet,
} from "@/components/ContactPageStyles";
import ContactTile from "@/components/ContactTile";
import { socials } from "@/consts";
import { useT } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import { themeDark } from "@/styles";
import SVGCalendar from "@/svgs/components/SVGCalendar";
import { Text, View } from "react-native";

const metrics = {
  row: {
    radius: size("l"),
    tile: size("xxxl"),
    titleSize: 17,
    subtitleSize: 13,
    padding: {
      paddingVertical: size("m"),
      paddingLeft: size("m"),
      paddingRight: size("xxl"),
    },
    // Only the title runs level with the badge, so only the title gets out of
    // its way. Reserving the width on the whole block would break the subtitle
    // across three lines for a collision that never happens to it.
    titleInset: size("xxxl"),
    gap: size("s"),
  },
  card: {
    radius: size("l"),
    tile: size("xxxl"),
    titleSize: 22,
    subtitleSize: 14,
    padding: {
      paddingVertical: size("l"),
      paddingLeft: size("l"),
      paddingRight: size("xxxl"),
    },
    titleInset: 0,
    gap: size("m"),
  },
} as const;

/**
 * The one channel that costs nobody a round trip, so it is the one that gets
 * the brand gradient and a badge that moves on its own - a hover state would
 * never be seen on the phone, where most of this page is read.
 */
export default function ContactBookingCard({
  variant,
  subtitle,
}: {
  variant: "row" | "card";
  subtitle: string;
}) {
  const t = useT();
  const m = metrics[variant];
  return (
    <View style={{ position: "relative" }} dataSet={contactHoverableDataSet}>
      <LinkView
        href={socials.booking.value}
        containerStyle={{ borderRadius: m.radius }}
        style={[
          m.padding,
          {
            flexDirection: "row",
            alignItems: "center",
            gap: m.gap,
            borderRadius: m.radius,
            overflow: "hidden",
            // See `ContactTile`: a CSS gradient, because the page renders both
            // layouts and an <svg> gradient id cannot be in the document twice.
            backgroundImage: `linear-gradient(120deg, ${socials.booking.color}, ${socials.booking.colorAlt})`,
          },
        ]}
      >
        <View
          dataSet={contactHoverDataSet}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(255,255,255,0.12)",
            pointerEvents: "none",
          }}
        />
        <ContactTile
          Icon={SVGCalendar}
          // Not a gradient of its own: the tile is a lit recess in the card,
          // like an app icon inside a widget.
          gradient={["rgba(255,255,255,0.24)", "rgba(255,255,255,0.12)"]}
          size={m.tile}
          iconSize={Math.round(m.tile * 0.6)}
          depth="recess"
        />
        <View style={{ gap: size("xxs"), flexShrink: 1 }}>
          <Text
            style={[
              fontStyles.iosEm.title3,
              {
                fontSize: m.titleSize,
                lineHeight: m.titleSize + 5,
                paddingRight: m.titleInset,
              },
              themeDark.styles.textOnMain,
            ]}
          >
            {t({ en: "Grab 20 minutes", fr: "Réserver 20 minutes" })}
          </Text>
          <Text
            style={[
              fontStyles.ios.footnote,
              { fontSize: m.subtitleSize, color: "rgba(255,255,255,0.78)" },
            ]}
          >
            {subtitle}
          </Text>
        </View>
        <Text
          aria-hidden={true}
          style={[
            themeDark.styles.textOnMain,
            {
              position: "absolute",
              bottom: size("m"),
              right: size("m"),
              fontSize: 22,
              lineHeight: 22,
            },
          ]}
        >
          →
        </Text>
      </LinkView>
      <Text
        dataSet={contactBadgeDataSet}
        style={[
          fontStyles.iosEm.caption2,
          {
            position: "absolute",
            top: size("s"),
            right: size("xs"),
            zIndex: 2,
            fontSize: 10,
            lineHeight: 12,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            paddingHorizontal: size("xs"),
            paddingVertical: size("xxs"),
            borderRadius: 999,
            color: themeDark.colors.back,
            backgroundColor: socials.call.color,
          },
        ]}
      >
        {t({ en: "Recommended", fr: "Recommandé" })}
      </Text>
    </View>
  );
}
