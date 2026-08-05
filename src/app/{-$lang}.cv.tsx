import { ResumeItem, fetchAll, fetchResume } from "@/api";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { featuredTestimonials, TestimonialContent } from "@/components/BlockTestimonials";
import CvOpenSourceCard from "@/components/CvOpenSourceCard";
import CvSectionTitle from "@/components/CvSectionTitle";
import GradientText from "@/components/GradientText";
import Image from "@/components/Image";
import Me from "@/components/Me";
import SkillCard from "@/components/SkillCard";
import StatTile from "@/components/StatTile";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { ind, sendStringAsMailString, socials, visualUrl, website } from "@/consts";
import {
  availabilityDetail,
  availabilityLabel,
  freelanceSince,
  fullName,
  groupKey,
  groupPeriods,
  hobbies,
  jobSubtitle,
  jobTitle,
  languages,
  mergeGroup,
  metaDescription,
  metaKeywords,
  metaSubject,
  metaTitle,
  monthRange,
  nickname,
  personJsonLd,
  pitchOf,
  profileStats,
  putaindecodeArticles,
  recommendationsUrl,
  skillsDomains,
  statsLine,
  summary,
  tagline,
  titleOf,
  updatedOn,
  workLocation,
  yearRange,
} from "@/profile";
import { alternateLinks, assertLangParam, langFromParam, useLang, useT } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { getColorScheme, setUserColorScheme } from "@/react-multiversal/theme/colorScheme";
import { gradientFlashyStops, gradientTextIndigoStylesInv, useTheme } from "@/styles";
import SVGEmail from "@/svgs/components/SVGEmail";
import SVGExternalLink from "@/svgs/components/SVGExternalLink";
import SVGPhone from "@/svgs/components/SVGPhone";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import { createFileRoute } from "@tanstack/react-router";
import { ComponentType, ReactNode, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";

export const Route = createFileRoute("/{-$lang}/cv")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: async ({ params }) => {
    const [resume, talks, blog] = await Promise.all([
      fetchResume(langFromParam(params.lang)),
      fetchAll({ data: "talks" }),
      fetchAll({ data: "blog" }),
    ]);
    return { resume, talks, blog };
  },
  head: ({ params }) => ({
    links: alternateLinks("/cv", langFromParam(params.lang)),
    meta: [
      // The page keeps the title short for the eye; the keywords a crawler, an
      // LLM or a job board matches on live here, where length is free. The PDF
      // export reads these same tags back off the rendered page to fill the
      // PDF's /Info dictionary, so this is the single source of truth.
      { title: metaTitle(langFromParam(params.lang)) },
      { name: "description", content: metaDescription(langFromParam(params.lang)) },
      { name: "author", content: `${fullName} (${nickname})` },
      {
        name: "keywords",
        content: metaKeywords(langFromParam(params.lang)).join(", "),
      },
      { name: "subject", content: metaSubject(langFromParam(params.lang)) },
    ],
  }),
  component: PageCV,
});

const email = sendStringAsMailString(socials.send.value);
const phoneHref = `tel:+${ind}${socials.call.value}`;
const phoneDisplay = `+${ind} ${socials.call.value.replace(
  /(\d)(\d{2})(\d{2})(\d{2})(\d{2})/,
  "$1 $2 $3 $4 $5",
)}`;

/** How many "More experience" rows before falling back to the "Earlier:" line. */
const moreExperienceRows = 9;

type IconType = ComponentType<{
  width?: number;
  height?: number;
  fill?: string;
  style?: object;
}>;

const byDateDesc = (a: ResumeItem, b: ResumeItem) =>
  (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1;

function PageCV() {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const freelanceLine = `${lang === "fr" ? "Freelance depuis" : "Freelance since"} ${freelanceSince} · ${t(workLocation)}`;
  const { resume, talks, blog } = Route.useLoaderData();

  // A CV row is a client, not a contract: an entry flagged `highlight` carries
  // the copy, and `group` folds its sibling missions in so the date span (and
  // therefore the sort key) is derived rather than hand-written.
  const membersOf = (item: ResumeItem) => resume.filter((i) => groupKey(i) === groupKey(item));
  const highlights = resume
    .filter((i) => i.highlight)
    .map((i) => mergeGroup(i, membersOf(i)))
    .sort(byDateDesc);
  const education = resume.filter((i) => i.education).sort(byDateDesc);
  // Open source reads best as a story: oldest first (cssnext → stylelint → …).
  const openSource = resume
    .filter((i) => i.openSource)
    .sort((a, b) => (a.dateStart < b.dateStart ? 1 : -1));
  const stats = profileStats(resume, lang);

  // Everything else worth naming - one row per group, so the missions already
  // folded into a key experience never show up twice. Nothing flagged
  // `personal`: Pékin Express is a great icebreaker under "Beyond Code", but
  // listed here a parser would file it as a job.
  const shownGroups = new Set(highlights.map(groupKey));
  const moreExperience = resume
    .filter(
      (i) =>
        !i.openSource && !i.education && !i.personal && i.company && !shownGroups.has(groupKey(i)),
    )
    .sort(byDateDesc)
    .filter((i, idx, all) => all.findIndex((o) => groupKey(o) === groupKey(i)) === idx)
    .map((i) => mergeGroup(i, membersOf(i)));
  const moreExperienceShown = moreExperience.slice(0, moreExperienceRows);
  const moreExperienceEarlier = moreExperience.slice(moreExperienceRows);

  // The CV is always rendered light (clean print / export).
  useEffect(() => {
    const previous = getColorScheme();
    void setUserColorScheme("light");
    return () => {
      void setUserColorScheme(previous);
    };
  }, []);

  const ContactRow = ({
    // Icon,
    href,
    children,
  }: {
    Icon: IconType;
    href: string;
    children: ReactNode;
  }) => (
    <LinkView
      href={href}
      underlineOnFocus={true}
      style={{ flexDirection: "row", alignItems: "center", gap: size("xxs") }}
    >
      {/* <Icon width={16} height={16} fill={theme.dynamicColors.textLight1} /> */}
      <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>{children}</Text>
    </LinkView>
  );

  // pdf zoom to avoid having to resize everything
  // this allows to keep using theme sizes easily
  const zoom = 0.75;
  const globalPagePadding = "xxl";
  return (
    <WebsiteWrapper bare={true}>
      {/* Machine-readable twin of the page: removes every guess about which
          string is the name, the title or an employer. Built from the rendered
          data, so it cannot drift from what a human reads. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(resume)),
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html { zoom: ${zoom} }
            @page {
              size: A4;
              margin: 0mm;
            }
            @media print {
              html, body { background: #fff !important; }
              
            }
          `,
        }}
      />
      {/* Shared violet gradient for icon fills (referenced via url(#cvGrad)) */}
      <Svg width={0} height={0} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="cvGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={theme.dynamicColors.textFlashy1} />
            <Stop offset="1" stopColor={theme.dynamicColors.textFlashy4} />
          </LinearGradient>
        </Defs>
      </Svg>
      {/* Per-page frame: position:fixed repeats on every printed page in Chrome,
          so this border wraps every PDF page (sits just inside the @page margin). */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "0mm",
          left: "0mm",
          right: "0mm",
          bottom: "0mm",
          borderTop: "3mm solid #5B2AA5",
          borderImage: `linear-gradient(to top left,
            ${theme.dynamicColors.textFlashy1} 0%,
            ${theme.dynamicColors.textFlashy2} 25%,
            ${theme.dynamicColors.textFlashy3} 75%,
            ${theme.dynamicColors.textFlashy4} 100%)
          1`,
          pointerEvents: "none",
        }}
      />
      <View
        style={{
          position: "relative",
          width: (210 * 1) / zoom + "mm",
          marginHorizontal: "auto",
          paddingBlockStart: size(globalPagePadding),
          paddingInline: size(globalPagePadding),
        }}
      >
        {/* ========================================================== Header */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: size("m"),
          }}
        >
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 380,
              gap: size("xs"),
            }}
          >
            <Text
              style={[
                fontStyles.iosEm.caption1,
                theme.styles.textLight2,
                { letterSpacing: 1.4, textTransform: "uppercase" },
              ]}
            >
              {freelanceLine}
            </Text>

            <View>
              <Text role="heading" aria-level={1}>
                <GradientText
                  style={{
                    fontSize: 48,
                    lineHeight: 48,
                    fontWeight: weight.black,
                  }}
                  stops={[
                    { offset: 0, color: theme.colors.textFlashy1 },
                    { offset: 0.1, color: theme.colors.textFlashy2 },
                    { offset: 0.5, color: theme.colors.textFlashy3 },
                    { offset: 1, color: theme.colors.textFlashy4 },
                  ]}
                >
                  {`${jobTitle}.`}
                </GradientText>
              </Text>
              <Text
                role="heading"
                aria-level={2}
                style={[
                  fontStyles.ios.subhead,
                  theme.styles.textLight1,
                  { fontStyle: "italic", marginTop: size("xxs") },
                ]}
              >
                {t(jobSubtitle)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: size("xs"),
              }}
            >
              <AvailabilityBadge showText={true} text={t(availabilityLabel)} />
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {t(availabilityDetail)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: size("xs"),
                marginTop: size("xxs"),
              }}
            >
              <GradientText
                style={{ fontSize: 46, lineHeight: 46, fontWeight: "900" }}
                stops={[
                  { offset: 0, color: theme.colors.textIndigoAlt2 },
                  { offset: 1, color: theme.colors.textIndigoAlt },
                ]}
              >
                {"Max."}
              </GradientText>
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 24, lineHeight: 26, fontWeight: "100" },
                ]}
              >
                {"Maxime Thirouin"}
              </Text>
            </View>
          </View>

          <Me width={240} />
        </View>
        <View style={{ height: 3 }}>
          <GradientLinear
            style={[StyleSheet.absoluteFill, { borderRadius: 4 }]}
            stops={gradientFlashyStops(theme)}
          />
        </View>
        <SpacedView vertical="l" gap="m">
          <Text style={[fontStyles.iosEm.title2, theme.styles.text]} role="heading" aria-level={2}>
            {t(tagline)}
          </Text>
          <Text style={[fontStyles.ios.callout, theme.styles.textLight1]} role="paragraph">
            {t(summary)}
          </Text>
        </SpacedView>

        <View nativeID="cv-content" style={{ gap: size("l") }}>
          <View>
            {/* --------------------------------------------- Profile stats */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "stretch",
                gap: size("s"),
              }}
            >
              {stats.map((stat) => (
                <StatTile
                  key={stat.label}
                  stat={stat}
                  variant={stat.highlight ? "gradient" : "plain"}
                  flexBasis={110}
                />
              ))}
            </View>

            <SpacedView vertical="s" gap="xxs">
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: size("m"),
                  justifyContent: "space-between",
                }}
              >
                <SVGExternalLink width={16} height={16} fill={theme.dynamicColors.textLight1} />

                <ContactRow Icon={SVGExternalLink} href={website}>
                  {visualUrl(website)}
                </ContactRow>
                <ContactRow Icon={SVGSocialGithub} href={socials.github.value}>
                  {visualUrl(socials.github.value)}
                </ContactRow>
                <ContactRow Icon={SVGSocialLinkedin} href={socials.linkedin.value}>
                  {visualUrl(socials.linkedin.value)}
                </ContactRow>

                <ContactRow Icon={SVGEmail} href={`mailto:${email}`}>
                  {email}
                </ContactRow>
                <ContactRow Icon={SVGPhone} href={phoneHref}>
                  {phoneDisplay}
                </ContactRow>
                {languages.map((language) => (
                  <Text
                    key={t(language.label)}
                    style={[fontStyles.ios.footnote, theme.styles.textLight1]}
                  >
                    {`${language.flag} ${t(language.label)} `}
                    <Text style={theme.styles.text}>{t(language.level)}</Text>
                  </Text>
                ))}
              </View>
            </SpacedView>
          </View>

          {/* -------------------------------------------------------- Skills */}
          <View nativeID="cv-skills" style={{ gap: size("s") }}>
            <CvSectionTitle>{t({ en: "Skills", fr: "Compétences" })}</CvSectionTitle>

            <View
              style={{
                flexDirection: "row",
                alignItems: "stretch",
                gap: size("s"),
              }}
            >
              {skillsDomains
                .filter((d) => d.feature)
                .map((d) => (
                  <SkillCard
                    key={t(d.title)}
                    title={t(d.title)}
                    subtitle={t(d.subtitle)}
                    items={t(d.items)}
                    Icon={d.Icon}
                    gradient={d.gradient}
                    big={true}
                    style={{ flexBasis: 300 }}
                  />
                ))}
              <View style={{ flexGrow: 1, flexBasis: 300, gap: size("s") }}>
                {skillsDomains
                  .filter((d) => !d.feature)
                  .map((d) => (
                    <SkillCard
                      key={t(d.title)}
                      title={t(d.title)}
                      subtitle={t(d.subtitle)}
                      items={t(d.items)}
                      Icon={d.Icon}
                      gradient={d.gradient}
                    />
                  ))}
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                rowGap: size("xs"),
              }}
            >
              {techs.map(({ Icon, label }) => (
                <View key={label} style={{ alignItems: "center", width: 70 }}>
                  {Icon ? <Icon width={40} height={40} /> : null}
                  <Text
                    style={[fontStyles.ios.caption2, theme.styles.textLight1]}
                  >
                    {t(label)}
                  </Text>
                </View>
              ))}
            </View> */}
          </View>

          {/* --------------------------------------------------- Experience */}
          {/* Section titles an ATS matches against a dictionary use the
              dictionary's words: "Experience", "Additional Experience",
              "Testimonials". "Beyond Code" stays - no parser keys on it, and
              "Interests" would trade the only line of personality on the page
              for nothing. */}
          <View style={{ gap: size("xs") }}>
            <CvSectionTitle>{"Experience"}</CvSectionTitle>

            {highlights.map((h, i) => (
              <View
                key={h.slug}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: size("s"),
                  paddingBottom: size("xs"),
                  borderBottomWidth: i === highlights.length - 1 ? 0 : 1,
                  borderColor: theme.dynamicColors.ultraLight,
                }}
              >
                {h.icon ? (
                  <Image
                    alt={h.company}
                    src={h.icon}
                    width={44}
                    height={44}
                    priority={true}
                    style={{ borderRadius: 10 }}
                  />
                ) : null}
                <View style={{ flexBasis: 168, flexGrow: 0, flexShrink: 0 }}>
                  <Text style={[fontStyles.iosEm.subhead, theme.styles.text]}>{h.job_title}</Text>
                  <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                    {h.company}
                  </Text>
                  <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
                    {/* Stints, not one span: Hove is "2017 – 2018 · 2019 – 2023",
                        which is what the pitch's "called back a year later"
                        describes. A single range would contradict it. */}
                    {(() => {
                      const periods = groupPeriods(membersOf(h));
                      return periods.length > 1 ? periods.join(" · ") : monthRange(h, lang);
                    })()}
                  </Text>
                </View>
                <View style={{ flex: 1, flexBasis: 220, gap: size("xxs") }}>
                  {/* The what-it-is lead-in: the pitches deliberately stop
                      saying it (dedup rule - see CONTENT-NORMALIZATION.md),
                      so the row must. Inline, not stacked - page 1 is tight. */}
                  <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                    <Text style={[fontStyles.iosEm.footnote, theme.styles.text]}>
                      {`${titleOf(h)}.`}
                    </Text>
                    {pitchOf(h) ? ` ${pitchOf(h)}` : null}
                  </Text>
                  {h.stats && h.stats.length > 0 ? (
                    <Text
                      style={[
                        fontStyles.iosEm.caption1,
                        { color: theme.dynamicColors.textFlashy3 },
                      ]}
                    >
                      {statsLine(h.stats)}
                    </Text>
                  ) : null}
                  {/* Plain terms, not hashtags: `#` forced the spaces and
                      slashes out of the tag, so "React Native Web" became
                      "#ReactNativeWeb" and "CI/CD" became "#CICD" - the exact
                      strings a recruiter or an ATS searches for, destroyed by
                      the decoration around them. */}
                  <Text style={[fontStyles.ios.caption2, theme.styles.textLight2]}>
                    {h.hashtags.slice(0, 6).join(" · ")}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* ============================================== PAGE 2 - proof */}
          <View
            nativeID="cv-page2"
            style={{
              gap: size("l"),
              marginBlockStart: size(globalPagePadding),
              breakBefore: "page",
            }}
          >
            {/* --------------------------------------------- Open Source */}
            <View nativeID="cv-opensource">
              <CvOpenSourceCard items={openSource} />
            </View>

            {/* ----------------------------------------- More experience */}
            <View style={{ gap: size("xxs") }}>
              <CvSectionTitle>{"Additional Experience"}</CvSectionTitle>

              {moreExperienceShown.map((m) => (
                <View
                  key={m.slug}
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: size("s"),
                  }}
                >
                  <Text
                    style={[
                      fontStyles.ios.caption1,
                      theme.styles.textLight2,
                      { flexBasis: 80, flexGrow: 0, flexShrink: 0 },
                    ]}
                  >
                    {/* Years only: this is a compact table, and the month
                        earns its space on key experiences, not here. */}
                    {yearRange(m, lang)}
                  </Text>
                  <Text
                    style={[
                      fontStyles.ios.footnote,
                      { flexBasis: 300, flexGrow: 0, flexShrink: 0 },
                    ]}
                  >
                    <Text style={[fontStyles.iosEm.footnote, theme.styles.text]}>
                      {m.job_title}
                    </Text>
                    <Text style={theme.styles.textLight1}>{` · ${m.company}`}</Text>
                  </Text>
                  <Text style={[fontStyles.ios.footnote, theme.styles.textLight1, { flex: 1 }]}>
                    {titleOf(m).trim()}
                  </Text>
                </View>
              ))}

              {moreExperienceEarlier.length > 0 ? (
                <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
                  {`Earlier: ${moreExperienceEarlier.map((m) => m.company).join(" · ")}.`}
                </Text>
              ) : null}
            </View>

            {/* ---------------------------------- Testimonials & brands */}
            <View nativeID="cv-testimonials" style={{ gap: size("s") }}>
              <CvSectionTitle>{"Testimonials"}</CvSectionTitle>

              {featuredTestimonials.map((testimonial, i) => (
                <View
                  key={testimonial.name}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: size("s"),
                    borderLeftWidth: 2,
                    borderColor: [
                      theme.dynamicColors.textFlashy2,
                      theme.dynamicColors.textFlashy3,
                      theme.dynamicColors.textFlashy4,
                    ][i % 3],
                    paddingLeft: size("s"),
                  }}
                >
                  <Text
                    style={[fontStyles.ios.footnote, theme.styles.text, { flex: 1 }]}
                    {...(testimonial.originalLang !== lang ? { lang } : null)}
                  >
                    {/* Dimmed less than on the site: this prints on paper. */}
                    <TestimonialContent text={testimonial.content[lang]} dim={0.85} />
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: size("xs"),
                      flexBasis: 190,
                      flexGrow: 0,
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={28}
                      height={28}
                      priority={true}
                      style={{ borderRadius: 14 }}
                    />
                    <View>
                      <Text style={[fontStyles.iosEm.caption1, theme.styles.text]}>
                        {testimonial.name}
                      </Text>
                      <Text style={[fontStyles.ios.caption2, theme.styles.textLight2]}>
                        {testimonial.title[lang]}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              <LinkView href={recommendationsUrl} underlineOnFocus={true}>
                <Text style={[fontStyles.ios.caption1, theme.styles.textLight2]}>
                  {"All recommendations on "}
                  <Text
                    style={[fontStyles.iosEm.caption1, { color: theme.dynamicColors.textFlashy3 }]}
                  >
                    {visualUrl(socials.linkedin.value)}
                  </Text>
                </Text>
              </LinkView>
            </View>

            {/* ------------------------------------- Talks & community */}
            <View nativeID="cv-talks" style={{ gap: size("s") }}>
              <CvSectionTitle>
                {t({ en: "Talks & Community", fr: "Conférences & communauté" })}
              </CvSectionTitle>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "stretch",
                  gap: size("s"),
                }}
              >
                {/* No year range: it would advertise the gap since 2019 more
                    loudly than the 17 talks themselves. */}
                <StatTile
                  valueFontSize={22}
                  stat={{
                    stat: `${talks.length}`,
                    label: t({ en: "Conference talks", fr: "Conférences données" }),
                    comment: "in French & English",
                  }}
                />
                <StatTile
                  valueFontSize={22}
                  stat={{
                    // blog.json only indexes moox.io; putaindecode.io is a
                    // manual figure from consts (see STATS.md).
                    stat: `${blog.length + putaindecodeArticles}`,
                    label: t({ en: "Blog posts", fr: "Articles de blog" }),
                    comment: "on moox.io & putaindecode.io",
                  }}
                />
                <StatTile
                  valueFontSize={22}
                  flexBasis={200}
                  stat={{
                    stat: "co-founder",
                    label: visualUrl(socials.putaindecode.value),
                    comment: t({
                      en: "FR dev community, blog & podcast",
                      fr: "communauté de devs FR, blog & podcast",
                    }),
                    url: socials.putaindecode.value,
                  }}
                />
              </View>
            </View>

            {/* ------------------------------- Education & beyond code */}
            <View
              nativeID="cv-bottom"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: size("l"),
              }}
            >
              <View style={{ flexGrow: 1, flexBasis: 280, gap: size("s") }}>
                <CvSectionTitle fontSize={22}>
                  {t({ en: "Education", fr: "Formation" })}
                </CvSectionTitle>
                {education.map((e) => (
                  <View
                    key={e.slug}
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: size("s"),
                    }}
                  >
                    {e.icon ? (
                      <Image
                        src={e.icon}
                        width={36}
                        height={36}
                        priority={true}
                        alt={e.company}
                        style={{ borderRadius: 8 }}
                      />
                    ) : null}
                    <View style={{ flex: 1 }}>
                      <Text style={[fontStyles.iosEm.footnote, theme.styles.text]}>
                        {e.job_title}
                      </Text>
                      <Text style={[fontStyles.ios.caption1, theme.styles.textLight1]}>
                        {`${e.company} · ${yearRange(e, lang)}`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={{ flexGrow: 1, flexBasis: 280, gap: size("s") }}>
                <CvSectionTitle fontSize={22}>
                  {t({ en: "Beyond Code", fr: "Au-delà du code" })}
                </CvSectionTitle>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {hobbies
                    .filter((h) => h.cv)
                    .map(({ Icon, label }) => (
                      <View key={t(label)} style={{ alignItems: "center" }}>
                        <Icon width={48} height={48} fill="url(#cvGrad)" />
                        <Text
                          style={[
                            fontStyles.ios.callout,
                            theme.styles.textLight1,
                            { textAlign: "center" },
                          ]}
                        >
                          {t(label)}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            </View>

            {/* --------------------------------------------------- Footer */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: size("m"),
                borderTopWidth: 1,
                borderColor: theme.dynamicColors.ultraLight,
                padding: size("s"),
              }}
            >
              <View style={{ flexShrink: 1 }}>
                {/* Dates the whole document, so a PDF that keeps circulating
                    says how old it is instead of quietly going stale. */}
                <Text style={[fontStyles.ios.caption2, theme.styles.textLight2]}>
                  {updatedOn(lang)}
                </Text>
                <Text style={[fontStyles.ios.callout, theme.styles.text]}>
                  {"Full history & all my experiences online:"}
                </Text>
                <LinkView href={website} underlineOnFocus={true}>
                  <Text
                    style={[
                      fontStyles.iosEm.title3,
                      gradientTextIndigoStylesInv(theme, undefined, true),
                    ]}
                  >
                    {visualUrl(website)}
                  </Text>
                </LinkView>
              </View>
              <Image
                src="/qr-code.jpg"
                width={72}
                height={72}
                priority={true}
                alt={`QR code to ${website}`}
              />
            </View>
          </View>
        </View>
      </View>
    </WebsiteWrapper>
  );
}
