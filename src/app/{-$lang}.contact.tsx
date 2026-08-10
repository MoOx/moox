import AvailabilityBadge from "@/components/AvailabilityBadge";
import ContactBookingCard from "@/components/ContactBookingCard";
import ContactChannel, {
  type ContactChannel as Channel,
} from "@/components/ContactChannel";
import ContactElsewhere from "@/components/ContactElsewhere";
import ContactPageStyles from "@/components/ContactPageStyles";
import ContactSideCard from "@/components/ContactSideCard";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { ind, sendStringAsMailString, socials } from "@/consts";
import { alternateLinks, assertLangParam, langFromParam, useT } from "@/i18n";
import { freelanceSince, fullName, jobTitle, workLocation } from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import Avatar from "@/react-multiversal/Avatar";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import SVGContact from "@/svgs/components/SVGContact";
import SVGDownload from "@/svgs/components/SVGDownload";
import SVGEnvelopeFill from "@/svgs/components/SVGEnvelopeFill";
import SVGExternalLink from "@/svgs/components/SVGExternalLink";
import SVGMessageFill from "@/svgs/components/SVGMessageFill";
import SVGPhoneFill from "@/svgs/components/SVGPhoneFill";
import SVGSocialLinkedinIn from "@/svgs/components/SVGSocialLinkedinIn";
import Clipboard from "@react-native-clipboard/clipboard";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export const Route = createFileRoute("/{-$lang}/contact")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  head: ({ params }) => ({
    links: alternateLinks("/contact", langFromParam(params.lang)),
    meta: [
      {
        // Derived from `profile.tsx`, like every other page title: this one had
        // been left behind on "Senior Front-End Architect", the title the CV
        // rework retired everywhere else.
        title:
          langFromParam(params.lang) === "fr"
            ? `Contacter ${fullName}, ${jobTitle}, expert React & React Native.`
            : `Contact ${fullName}, ${jobTitle}, React & React Native Expert.`,
      },
    ],
  }),
  component: PageContact,
});

/** `678135439` → `6 78 13 54 39`, the way a French number is read out loud. */
const groupedPhone = socials.call.value.replace(
  /^(\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
  "$1 $2 $3 $4 $5",
);
const phoneDisplay = `+${ind} ${groupedPhone}`;
const phoneValue = `+${ind}${socials.call.value}`;
const smsValue = `+${ind}${socials.text.value}`;
const mailValue = sendStringAsMailString(socials.send.value);

/** The vCard sits at the root of `public/`, so the link must not be relative:
    from `/fr/contact` a relative one resolves to `/fr/MaximeThirouin.vcf`. */
const vcfHref = "/" + socials.vcf.value;

const parisHourFormat = {
  hour: "2-digit",
  hour12: false,
  timeZone: "Europe/Paris",
} as const;
const parisZoneFormat = {
  timeZone: "Europe/Paris",
  timeZoneName: "short",
} as const;

/**
 * The hour it is in Toulouse, and how that hour is spelled locally (`CET` in
 * winter, `CEST` in summer). Both are read in the browser and never on the
 * server: the site is prerendered, so a build in January would otherwise ship
 * "CET" and a night-time greeting to every visitor until the next deploy.
 */
function useToulouseTime() {
  const [time, setTime] = useState<{ hour: number; zone: string } | null>(null);
  useEffect(() => {
    const read = () => {
      const now = new Date();
      setTime({
        hour: Number(
          new Intl.DateTimeFormat("en-GB", parisHourFormat).format(now),
        ),
        zone:
          new Intl.DateTimeFormat("en-GB", parisZoneFormat)
            .formatToParts(now)
            .find((part) => part.type === "timeZoneName")?.value ?? "",
      });
    };
    read();
    // The line only changes on the hour; once a minute is plenty and cheap.
    const interval = setInterval(read, 60_000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

function PageContact() {
  const theme = useTheme();
  const t = useT();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState<"sms" | "mail" | null>(null);
  const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const time = useToulouseTime();

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(
    () => () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    },
    [],
  );

  const copy = useCallback((key: "sms" | "mail", value: string) => {
    try {
      Clipboard.setString(value);
    } catch {
      // A blocked clipboard is not a dead end: the number and the address are
      // both written on the card, so the confirmation still tells the truth
      // about what was selected.
    }
    setCopied(key);
    if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    copiedTimeout.current = setTimeout(() => setCopied(null), 1600);
  }, []);

  // Nothing on the page moves when JavaScript is off, and `sms:` / `tel:` links
  // must not ship in the static HTML - a crawler following one is a phone call.
  const href = (value: string) => (isClient ? value : "");

  const statusLine =
    time === null
      ? t({
          en: "Toulouse and remote. Pick whichever channel you actually like: they all reach me.",
          fr: "Toulouse et télétravail. Choisissez le canal qui vous va : ils arrivent tous jusqu'à moi.",
        })
      : time.hour >= 23 || time.hour < 7
        ? t({
            en: "It's the middle of the night in Toulouse. Write anyway, I'll answer with a coffee.",
            fr: "Il fait nuit noire à Toulouse. Écrivez quand même, je répondrai un café à la main.",
          })
        : time.hour < 9
          ? t({
              en: "Coffee is brewing in Toulouse. Anything you send now lands at the top of the pile.",
              fr: "Le café coule à Toulouse. Ce qui arrive maintenant passe en haut de la pile.",
            })
          : time.hour >= 12 && time.hour < 14
            ? t({
                en: "Probably at lunch in Toulouse. I'll get back to you right after.",
                fr: "Sans doute à table à Toulouse. Je reviens vers vous juste après.",
              })
            : time.hour >= 19
              ? t({
                  en: "Evening in Toulouse. Off keyboard, but a text still gets through.",
                  fr: "C'est le soir à Toulouse. Loin du clavier, mais un SMS passe toujours.",
                })
              : t({
                  en: "At my desk in Toulouse. Pick a channel, I'm reading.",
                  fr: "À mon bureau à Toulouse. Choisissez un canal, je lis.",
                });

  const channels: Channel[] = [
    {
      key: "sms",
      href: href("sms:" + smsValue),
      Icon: SVGMessageFill,
      iconRatio: 0.7,
      gradient: [socials.text.color, socials.text.colorAlt],
      color: socials.text.color,
      title: t({ en: "Send a message", fr: "Envoyer un message" }),
      subtitle: phoneDisplay,
      estimate: t({ en: "~30 min", fr: "~30 min" }),
      estimateTone: "fast",
      copyValue: smsValue,
      copyLabel: t({
        en: "Copy the phone number",
        fr: "Copier le numéro de téléphone",
      }),
    },
    {
      key: "mail",
      href: href("mailto:" + mailValue),
      Icon: SVGEnvelopeFill,
      iconRatio: 0.75,
      gradient: [socials.send.colorAlt, socials.send.color],
      color: socials.send.color,
      title: t({ en: `Write to ${mailValue}`, fr: `Écrire à ${mailValue}` }),
      subtitle: t({
        en: "Long version, files, briefs",
        fr: "Version longue, fichiers, briefs",
      }),
      estimate: t({ en: "~4 h", fr: "~4 h" }),
      estimateTone: "fast",
      copyValue: mailValue,
      copyLabel: t({
        en: "Copy the e-mail address",
        fr: "Copier l'adresse e-mail",
      }),
    },
    {
      key: "call",
      href: href("tel:" + phoneValue),
      Icon: SVGPhoneFill,
      gradient: [socials.call.color, socials.call.colorAlt],
      iconRatio: 0.65,
      color: socials.call.color,
      title: t({ en: "Call me", fr: "Appeler Max" }),
      subtitle: t({
        en: `Mon–Fri · 9:00–18:00${time ? ` ${time.zone}` : " Paris time"}`,
        fr: `Lun–Ven · 9h–18h${time ? ` ${time.zone}` : " (Paris)"}`,
      }),
      estimate: t({ en: "live", fr: "direct" }),
      estimateTone: "neutral",
    },
  ];

  // One heading for both layouts: the badge belongs next to the title, not in a
  // box of its own, and it says the same thing at either width.
  const heading = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        flexWrap: "wrap",
        gap: size("xs"),
      }}
    >
      <Text
        role="heading"
        aria-level={1}
        style={[
          fontStyles.iosEm.largeTitle,
          { lineHeight: 36, letterSpacing: -0.8 },
          theme.styles.text,
        ]}
      >
        {t({ en: "Let's talk.", fr: "On en parle ?" })}
      </Text>
      <AvailabilityBadge
        showText={true}
        link={false}
        // Shorter than the site-wide label, which would push the badge onto its
        // own line on a phone - the point of putting it here is that the title
        // and the status arrive together.
        text={t({ en: "Available for work", fr: "Disponible" })}
      />
    </View>
  );

  const bookingSubtitle = t({
    en: "Pick a slot, no back-and-forth",
    fr: "Choisissez un créneau, sans aller-retour",
  });

  const renderChannels = (variant: "row" | "card") =>
    channels.map((channel) => (
      <View
        role="listitem"
        key={channel.key}
        // Three equal columns on desktop; in the mobile column, `flexBasis: 0`
        // would collapse the row to nothing.
        style={variant === "card" ? { flexGrow: 1, flexBasis: 0 } : null}
      >
        <ContactChannel
          channel={channel}
          variant={variant}
          copied={copied === channel.key}
          onCopy={() =>
            channel.copyValue &&
            copy(channel.key as "sms" | "mail", channel.copyValue)
          }
        />
      </View>
    ));

  const vcfCard = (variant: "row" | "card") => (
    <ContactSideCard
      variant={variant}
      href={vcfHref}
      Icon={SVGContact}
      iconRatio={0.7}
      CornerIcon={SVGDownload}
      gradient={[socials.vcf.color, socials.vcf.colorAlt]}
      color={socials.vcf.color}
      cornerColor={socials.vcf.color}
      title={t({ en: "Add me", fr: "Ajouter Max" })}
      subtitle={t({ en: "Download vCard", fr: "Télécharger la vCard" })}
    />
  );
  const linkedinCard = (variant: "row" | "card") => (
    <ContactSideCard
      variant={variant}
      href={socials.linkedin.value}
      Icon={SVGSocialLinkedinIn}
      CornerIcon={SVGExternalLink}
      backgroundColor={socials.linkedin.color}
      iconColor={"#fff"}
      color={socials.linkedin.color}
      cornerColor={socials.linkedin.color}
      title={t({ en: "Let's connect", fr: "Connectons-nous" })}
      subtitle={t({
        en: "Message me on LinkedIn",
        fr: "M'écrire sur LinkedIn",
      })}
    />
  );

  return (
    <WebsiteWrapper>
      <ContactPageStyles />

      <IfWindowWidthIs smallerThan={WindowWidth.m}>
        <Container horizontal="m" vertical="l" gap={size("l")} maxWidth={768}>
          <View style={{ gap: size("xs") }}>
            {heading}
            <Text style={[fontStyles.ios.subhead, theme.styles.textLight1]}>
              {statusLine}
            </Text>
          </View>
          <View
            role="list"
            aria-label={t({
              en: "Ways to reach Max",
              fr: "Comment joindre Max",
            })}
            style={{ gap: size("s") }}
          >
            {renderChannels("row")}
          </View>
          <ContactBookingCard variant="row" subtitle={bookingSubtitle} />
          <View style={{ flexDirection: "row", gap: size("s") }}>
            {vcfCard("row")}
            {linkedinCard("row")}
          </View>
          <ContactElsewhere />
        </Container>
      </IfWindowWidthIs>

      <IfWindowWidthIs largerThan={WindowWidth.m}>
        <Container horizontal="xl" vertical="xl" gap={size("xxl")} style={{ flexDirection: "row", alignItems: "flex-start" }} maxWidth={1180}>
          <View style={{ width: 340, gap: size("l") }}>
            <Avatar
              size={size("xxxl") + size("l")}
              borderWidth={2}
              borderColor={theme.dynamicColors.ultraLight}
            />
            <View style={{ gap: size("xs") }}>
              {heading}
              <Text
                style={[
                  fontStyles.ios.callout,
                  { lineHeight: 25 },
                  theme.styles.textLight1,
                ]}
              >
                {t({
                  en: `${jobTitle}, freelance since ${freelanceSince}. ${t(workLocation)}. Pick whichever channel you actually like: they all reach me.`,
                  fr: `${jobTitle}, freelance depuis ${freelanceSince}. ${t(workLocation)}. Choisissez le canal qui vous va : ils arrivent tous jusqu'à moi.`,
                })}
              </Text>
              <Text
                style={[
                  fontStyles.ios.footnote,
                  { lineHeight: 20 },
                  theme.styles.textLight1,
                ]}
              >
                {statusLine}
              </Text>
            </View>
            <ContactElsewhere />
          </View>

          <View style={{ flexGrow: 1, flexShrink: 1, gap: size("m") }}>
            <View
              role="list"
              aria-label={t({
                en: "Ways to reach Max",
                fr: "Comment joindre Max",
              })}
              style={{
                flexDirection: "row",
                alignItems: "stretch",
                gap: size("m"),
              }}
            >
              {renderChannels("card")}
            </View>
            <ContactBookingCard
              variant="card"
              subtitle={`${bookingSubtitle} · ${socials.booking.value.replace(/^https?:\/\//, "")}`}
            />
            <View style={{ flexDirection: "row", gap: size("m") }}>
              {vcfCard("card")}
              {linkedinCard("card")}
            </View>
          </View>
        </Container>
      </IfWindowWidthIs>

      <Spacer size="xxxl" />
    </WebsiteWrapper>
  );
}
