import { ContentTypeMap, ResumeItem } from "@/api";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import BlockMe2WithPills from "@/components/BlockMe2WithPills";
import ButtonView from "@/components/ButtonView";
import Card from "@/components/Card";
import ExperienceCard from "@/components/ExperienceCard";
import Image from "@/components/Image";
import ResumeEntryModal from "@/components/ResumeEntryModal";
import ResumeStats from "@/components/ResumeStats";
import { ResumeTimeline } from "@/components/ResumeTimeline";
import SkillCard from "@/components/SkillCard";
import StatTile from "@/components/StatTile";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { socials, visualUrl, website } from "@/consts";
import { useLang, useT } from "@/i18n";
import {
  availabilityLabel,
  compactCount,
  freelanceSince,
  githubFollowers,
  githubSince,
  groupKey,
  groupPeriods,
  hobbies,
  jobSubtitle,
  jobTitle,
  keyExperiences,
  lowerKeepingAcronyms,
  monthRange,
  openSourceCredits,
  openSourceIntro,
  personJsonLd,
  pitchOf,
  profileStats,
  projectName,
  putaindecodeArticles,
  resumeEntryPath,
  resumePdfPath,
  skillsDomains,
  summary,
  tagline,
  techs,
  titleOf,
  workLocation,
  yearRange,
} from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import GradientText from "@/react-multiversal/GradientText";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import { default as SpacedView } from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextBlock from "@/react-multiversal/TextBlock";
import TextForReader from "@/react-multiversal/TextForReader";
import {
  alpha,
  colors,
  gradientFlashyStops,
  gradientFlashyStopsInv,
  gradientIndigoStopsInv,
  useTheme,
} from "@/styles";
import SVGCssnext from "@/svgs/components/SVGCssnext";
import SVGDownload from "@/svgs/components/SVGDownload";
import SVGPhenomic from "@/svgs/components/SVGPhenomic";
import SVGRescriptReactNative from "@/svgs/components/SVGRescriptReactNative";
import SVGStylelint from "@/svgs/components/SVGStylelint";
import { ReactNode } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";

/**
 * The "Download PDF" link. One element on each platform, for the reasons at the
 * call site.
 */
function PdfDownloadLink({ href, children }: { href: string; children: ReactNode }) {
  if (Platform.OS === "web") {
    return (
      <a
        href={href}
        download
        style={{
          alignItems: "flex-start",
          display: "flex",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <LinkView href={website + href} style={{ alignItems: "flex-start" }}>
      {children}
    </LinkView>
  );
}

/**
 * The web CV: same structure and content sources as `/cv`, without the
 * two-page constraint. The condensed, CV-shaped read comes first; the full
 * timeline (every experience, with detail modals) closes the page for the
 * readers who scroll that far.
 */
export type ResumePageProps = {
  resume: ResumeItem[];
  talks: ContentTypeMap["talks"][];
  blog: ContentTypeMap["blog"][];
  /**
   * What the caller wants open over the timeline: one entry, or every mission
   * of a grouped client. Both come from the query string on the site, and both
   * stay `undefined` in the app - see `onOpenEntry`.
   */
  detail?: string;
  group?: string;
  /**
   * What a tap on a card does, which is the one thing the two platforms
   * genuinely disagree about.
   *
   * The site opens a modal over the timeline and masks the standalone URL over
   * it, so a share or a reload still lands on the real page - the TanStack
   * equivalent of Next.js' intercepting routes. The app has no URL to mask and
   * no address bar to mask it in, so the same tap pushes the standalone screen
   * onto the stack, which is also what makes the OS back gesture do the right
   * thing for free.
   *
   * The page does not choose between them, and does not test the platform: it
   * calls what it was handed.
   */
  onOpenEntry: (item: ResumeItem, event?: { preventDefault?: () => void }) => void;
  onOpenGroup: (item: ResumeItem, event?: { preventDefault?: () => void }) => void;
};

export default function ResumePage({
  resume: items,
  talks,
  blog,
  detail,
  group,
  onOpenEntry: openEntry,
  onOpenGroup: openGroup,
}: ResumePageProps) {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const freelanceLine = `${lang === "fr" ? "Freelance depuis" : "Freelance since"} ${freelanceSince} · ${t(workLocation)}`;
  const detailItem = detail ? items.find((i) => i.slug.endsWith(`/${detail}`)) : undefined;
  const groupItems = group
    ? items
        .filter((i) => i.group === group)
        .sort((a, b) => ((b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1))
    : [];
  const modalItems = group ? groupItems : detailItem ? [detailItem] : [];
  // The entry whose timeline card yields its view-transition name to the
  // modal (for a group: its highlight entry, the one with a key card).
  const activeEntry = detailItem ?? groupItems.find((i) => i.highlight) ?? groupItems[0];
  const activeSlug = activeEntry?.slug.split("/").pop();

  const highlights = keyExperiences(items);
  const membersOf = (item: ResumeItem) => items.filter((i) => groupKey(i) === groupKey(item));
  const education = items
    .filter((i) => i.education)
    .sort((a, b) => ((b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1));
  // Open source reads best as a story: oldest first (cssnext → stylelint → …).
  const openSource = items
    .filter((i) => i.openSource)
    .sort((a, b) => (a.dateStart < b.dateStart ? 1 : -1));
  // Project logo for each open-source card, keyed by `projectName`. The
  // rescript-react-native source is the white variant, so its fill is
  // overridden with the ReScript brand red to stay visible on the white tile.
  const openSourceLogos: Record<string, ReactNode> = {
    cssnext: <SVGCssnext width={32} height={32} />,
    stylelint: <SVGStylelint width={32} height={32} />,
    phenomic: <SVGPhenomic width={32} height={32} />,
    "rescript-react-native": <SVGRescriptReactNative width={32} height={32} fills={["#E6484F"]} />,
  };

  const headline = (viewTransitionName: string) => (
    <>
      <Text
        style={[
          fontStyles.iosEm.caption1,
          theme.styles.textLight2,
          { letterSpacing: 1.4, textTransform: "uppercase" },
        ]}
      >
        {freelanceLine}
      </Text>
      <GradientText
        stops={gradientFlashyStops(theme)}
        angle={172}
        style={[
          theme.styles.text,
          {
            fontSize: 42,
            lineHeight: 42,
            fontWeight: "900",
            viewTransitionName,
          },
        ]}
        role="heading"
        aria-level={1}
      >
        {`${jobTitle}.`}
      </GradientText>
      <Text
        style={[fontStyles.ios.subhead, theme.styles.textLight1, { fontStyle: "italic" }]}
        role="heading"
        aria-level={2}
      >
        {t(jobSubtitle)}
      </Text>
    </>
  );

  return (
    <WebsiteWrapper>
      {/* Machine-readable twin of the page, same data as / and /cv. */}
      {/* Structured data for crawlers: a `<script>` element, so web only. */}
      {Platform.OS === "web" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(items)),
          }}
        />
      ) : null}
      {/* Shared violet gradient for the Beyond Code icon fills. */}
      <Svg width={0} height={0} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="profileGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={theme.dynamicColors.textFlashy1} />
            <Stop offset="1" stopColor={theme.dynamicColors.textFlashy4} />
          </LinearGradient>
        </Defs>
      </Svg>

      {/* ============================================================ Hero */}
      <Container
        wrapperStyle={{ zIndex: 1, overflow: "visible" }}
        maxWidth={900}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <SpacedView
          horizontal="l"
          vertical="m"
          gap="xl"
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 300,
            zIndex: 1,
          }}
        >
          {/* One node, two layouts. The two `IfWindowWidthIs` variants this
              replaces both rendered `headline()`, so the page shipped two <h1>
              and two <h2> - the same text twice for anything reading the HTML.
              Only the positioning differs between widths, so it moves to a
              media query (`[data-resume-hero]` in styles.css); the Spacer
              below stays conditional, since it only compensates for the
              desktop variant leaving the flow. */}
          <View dataSet={{ "resume-hero": "true" }}>{headline("text--front-end-architect")}</View>
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            <Spacer size="xxxl" />
          </IfWindowWidthIs>
          <View>
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              <View
                style={{
                  flexDirection: "row",
                  gap: size("s"),
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                <GradientText
                  stops={gradientFlashyStopsInv(theme)}
                  role="paragraph"
                  style={[
                    theme.styles.text,
                    {
                      fontSize: 64,
                      lineHeight: 64,
                      fontWeight: "900",
                      viewTransitionName: "text--max",
                    },
                  ]}
                >
                  <TextForReader>{t({ en: "Nickname :", fr: "Surnom :" })}</TextForReader>
                  {"Max."}
                </GradientText>
                <TextBlock>
                  <TextForReader>{t({ en: "Full name :", fr: "Nom complet :" })}</TextForReader>
                  <Text
                    style={[
                      theme.styles.textLight1,
                      {
                        fontSize: 28,
                        lineHeight: 28 * 1.25,
                        fontWeight: "100",
                        letterSpacing: 1,
                      },
                    ]}
                  >
                    {"Maxime Thirouin"}
                  </Text>
                </TextBlock>
              </View>
            </IfWindowWidthIs>
            <IfWindowWidthIs smallerThan={WindowWidth.m}>
              <GradientText
                stops={gradientFlashyStopsInv(theme)}
                role="paragraph"
                style={[
                  theme.styles.text,
                  {
                    fontSize: 64,
                    lineHeight: 64,
                    fontWeight: "900",
                    viewTransitionName: "text--max",
                  },
                ]}
              >
                <TextForReader>{t({ en: "Nickname :", fr: "Surnom :" })}</TextForReader>
                {"Max."}
              </GradientText>
              <TextBlock>
                <TextForReader>{t({ en: "Full name :", fr: "Nom complet :" })}</TextForReader>
                <Text
                  style={[
                    theme.styles.textLight1,
                    {
                      fontSize: 44,
                      lineHeight: 44,
                      fontWeight: "100",
                      letterSpacing: 1,
                    },
                  ]}
                >
                  {"Maxime"}
                </Text>
                <Text
                  style={[
                    theme.styles.textLight1,
                    {
                      fontSize: 44,
                      lineHeight: 44,
                      fontWeight: "100",
                    },
                  ]}
                >
                  {"Thirouin"}
                </Text>
              </TextBlock>
            </IfWindowWidthIs>
            <Spacer size="s" />
            <View style={{ gap: size("s") }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: size("s"),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: size("xs"),
                  }}
                >
                  <AvailabilityBadge showText={true} text={t(availabilityLabel)} />
                  {/* <Text
                  style={[fontStyles.ios.footnote, theme.styles.textLight1]}
                >
                  {t(availabilityDetail)}
                </Text> */}
                </View>
                {/* Web keeps the raw anchor: `download` is what makes the
                    browser save the PDF instead of opening it in the viewer,
                    and react-native-web does not forward that attribute
                    through `<Text href>`. Native has no anchor at all, so it
                    uses `LinkView` with an absolute URL - `LinkText` then
                    treats it as external and hands it to `Linking.openURL`,
                    where a root-relative path would be routed as an in-app
                    navigation and 404. */}
                <PdfDownloadLink href={resumePdfPath(lang)}>
                  <ButtonView
                    mode="outline"
                    effect="subtle"
                    spaceGap="xs"
                    spaceHorizontal="s"
                    spaceVertical="xs"
                    textColor={theme.dynamicColors.textFlashy1}
                    style={{ backgroundColor: theme.dynamicColors.back }}
                  >
                    {({ color }) => (
                      <>
                        <SVGDownload width={16} height={16} fill={color} />
                        <GradientText
                          stops={gradientFlashyStops(theme)}
                          angle={20}
                          style={[
                            {
                              color,
                              fontWeight: weight.bold,
                            },
                          ]}
                        >
                          {t({ en: "Download PDF", fr: "Télécharger le PDF" })}
                        </GradientText>
                      </>
                    )}
                  </ButtonView>
                </PdfDownloadLink>
              </View>
            </View>
          </View>
        </SpacedView>
        <BlockMe2WithPills />
        <SpacedView horizontal="l" style={{ height: 3, width: "100%" }}>
          <GradientLinear style={{ borderRadius: 4 }} stops={gradientFlashyStops(theme)} />
        </SpacedView>
      </Container>

      {/* ==================================================== Summary intro */}
      <Container horizontal="l" vertical="l" gap="m" maxWidth={900}>
        <Text
          style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
          role="heading"
          aria-level={2}
        >
          {t(tagline)}
        </Text>
        <Text style={[fontStyles.iosEm.callout, theme.styles.textLight1]} role="paragraph">
          {t(summary)}
        </Text>
      </Container>

      {/* ==================================================== Profile stats */}
      <Spacer size="xl" />
      <ResumeStats stats={profileStats(items, lang)} />

      {/* =========================================================== Skills */}
      <Spacer size="xl" />
      <Container maxWidth={900}>
        <SpacedView
          role="region"
          aria-label={t({ en: "Skills", fr: "Compétences" })}
          horizontal="l"
          gap="l"
        >
          <GradientText
            stops={gradientIndigoStopsInv(theme)}
            style={[fontStyles.iosEm.largeTitle]}
            role="heading"
            aria-level={2}
          >
            {t({ en: "Skills", fr: "Compétences" })}
          </GradientText>
          {/* Same distribution as /cv: the feature card big on the left, the
              other domains stacked in a column next to it - the flat mosaic
              left the blocks unbalanced. */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
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
                  glass={true}
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
                    glass={true}
                  />
                ))}
            </View>
          </View>
          <View
            role="list"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: size("s"),
            }}
          >
            {techs.map(({ Icon, label }) => (
              <View role="listitem" key={t(label)} style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    overflow: "hidden",
                    color: theme.dynamicColors.text,
                  }}
                >
                  <Icon width={40} height={40} />
                </View>
                <Text style={[fontStyles.ios.caption2, theme.styles.textLight1]}>{t(label)}</Text>
              </View>
            ))}
          </View>
        </SpacedView>
      </Container>

      {/* ======================================================= Experience */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView
          role="region"
          aria-label={t({ en: "Key Experience", fr: "Expériences clés" })}
          horizontal="l"
          gap="m"
        >
          <GradientText
            stops={gradientFlashyStops(theme)}
            style={[fontStyles.iosEm.largeTitle]}
            role="heading"
            aria-level={2}
          >
            {t({ en: "Key Experience", fr: "Expériences clés" })}
          </GradientText>
          {/* Full-width rows: copy on the left, the illustration fading in
              from the right. The ⓘ opens the detail modal (the whole group's
              missions for grouped clients). */}
          <View style={{ gap: size("m") }}>
            {highlights.map((h) => (
              <ExperienceCard
                key={h.slug}
                image={h.image}
                icon={h.icon}
                pretitle={h.job_title}
                title={titleOf(h)}
                company={h.company}
                dates={(() => {
                  const periods = groupPeriods(membersOf(h));
                  return periods.length > 1 ? periods.join(" · ") : monthRange(h, lang);
                })()}
                text={pitchOf(h)}
                stats={h.stats}
                tags={h.hashtags}
                infoHref={h.group ? `/resume/group/${h.group}` : resumeEntryPath(h)}
                infoLabel={`${t({ en: "All the details about", fr: "Tous les détails sur" })} ${h.company}`}
                infoOnPress={(event) => openGroup(h, event)}
              />
            ))}
          </View>
        </SpacedView>
      </Container>

      {/* ====================================================== Open Source */}
      {/* Full-bleed band like the stats one (opposite skew), so the entry
          cards sit directly on it - no more card-in-a-card. */}
      <Spacer size="xxl" />
      <SpacedView vertical="xxxl">
        <GradientLinear
          angle={60}
          stops={[
            { offset: 10, color: "#010244" },
            { offset: 100, color: "#0F7CB7" },
          ]}
          style={[StyleSheet.absoluteFill, { transform: [{ skewY: "-1deg" }] }]}
        />
        <Container maxWidth={900}>
          <SpacedView
            role="region"
            aria-label={t({ en: "Open Source", fr: "Open source" })}
            horizontal="l"
            gap="m"
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: size("s"),
              }}
            >
              <Image
                src="/github-arctic-code-vault-contributor.png"
                width={224 / 7}
                height={254 / 7}
                alt="GitHub Arctic Code Vault Contributor"
              />
              <Text
                role="heading"
                aria-level={2}
                style={[fontStyles.iosEm.largeTitle, { color: colors.white }]}
              >
                {t({ en: "Open Source", fr: "Open source" })}
              </Text>
              <View style={{ flexGrow: 1, flexShrink: 1 }} />
              <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.72) }]}>
                {`${compactCount(githubFollowers)} followers · on GitHub since ${githubSince}`}
              </Text>
            </View>
            <Text style={[fontStyles.ios.callout, { color: alpha(colors.white, 0.85) }]}>
              {t(openSourceIntro)}
            </Text>
            <View
              role="list"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: size("m"),
              }}
            >
              {openSource.map((item) => {
                const [headline, ...rest] = item.stats ?? [];
                const logo = openSourceLogos[projectName(item)];
                return (
                  <Card
                    key={item.slug}
                    role="listitem"
                    style={{ flexBasis: 380 }}
                    background="glass"
                    icon={
                      logo ? (
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: colors.white,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {logo}
                        </View>
                      ) : undefined
                    }
                    pretitle={`${item.job_title ?? ""} · ${yearRange(item, lang)}`}
                    title={projectName(item)}
                    text={item.title.trim()}
                    infoHref={resumeEntryPath(item)}
                    infoLabel={`${t({ en: "All the details about", fr: "Tous les détails sur" })} ${projectName(item)}`}
                    infoOnPress={(event) => openEntry(item, event)}
                  >
                    {headline ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-end",
                          flexWrap: "wrap",
                          gap: size("xs"),
                        }}
                      >
                        <Text>
                          <Text
                            style={{
                              fontSize: 22,
                              lineHeight: 24,
                              fontWeight: weight.black,
                              color: colors.white,
                            }}
                          >
                            {headline.stat}
                          </Text>
                          <Text
                            style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.8) }]}
                          >
                            {` ${headline.label}`}
                          </Text>
                        </Text>
                        {rest.length > 0 ? (
                          <Text
                            style={[fontStyles.ios.caption2, { color: alpha(colors.white, 0.6) }]}
                          >
                            {rest
                              .map((s) => `${s.stat} ${lowerKeepingAcronyms(s.label)}`)
                              .join(" · ")}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                  </Card>
                );
              })}
            </View>
            <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.72) }]}>
              {t({ en: "Also: ", fr: "Aussi : " })}
              {openSourceCredits.map((credit, i) => (
                <LinkText key={credit.label} href={credit.url} underlineOnFocus={true}>
                  {i > 0 ? " · " : ""}
                  <Text style={{ color: colors.white, fontWeight: weight.semibold }}>
                    {credit.label}
                  </Text>
                  {` ${credit.note}`}
                </LinkText>
              ))}
            </Text>
          </SpacedView>
        </Container>
      </SpacedView>

      {/* ============= Talks & Community, Education & Beyond Code */}
      {/* One wrapping row, three columns. The talk list itself lives in the
          timeline below (talks are entries there), so this column only keeps
          the community figures, stacked. */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView
          role="region"
          aria-label={t({
            en: "Talks & Community",
            fr: "Conférences & communauté",
          })}
          horizontal="l"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "stretch",
            gap: size("xl"),
          }}
        >
          <View style={{ flexGrow: 1, flexBasis: 280, gap: size("m") }}>
            <GradientText
              stops={gradientIndigoStopsInv(theme)}
              style={[fontStyles.iosEm.title1]}
              role="heading"
              aria-level={2}
            >
              {t({ en: "Talks & Community", fr: "Conférences & communauté" })}
            </GradientText>
            <View style={{ gap: size("s") }}>
              <View style={{ flexDirection: "row" }}>
                <StatTile
                  valueFontSize={22}
                  stat={{
                    stat: `${talks.length}`,
                    label: t({
                      en: "Conference talks",
                      fr: "Conférences données",
                    }),
                    comment: "in French & English",
                    url: "/talks",
                  }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <StatTile
                  valueFontSize={22}
                  stat={{
                    // blog.json only indexes moox.io; putaindecode.io is a
                    // manual figure from profile.tsx (see STATS.md).
                    stat: `${blog.length + putaindecodeArticles}`,
                    label: t({ en: "Blog posts", fr: "Articles de blog" }),
                    comment: "on moox.io & putaindecode.io",
                    url: "/blog",
                  }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <StatTile
                  valueFontSize={22}
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
          </View>

          <View
            style={{
              flexGrow: 1,
              flexBasis: 280,
              gap: size("m"),
              justifyContent: "space-between",
            }}
          >
            <View
              role="region"
              aria-label={t({ en: "Education", fr: "Formation" })}
              style={{ gap: size("m") }}
            >
              <GradientText
                stops={gradientFlashyStops(theme)}
                style={[fontStyles.iosEm.title1]}
                role="heading"
                aria-level={2}
              >
                {t({ en: "Education", fr: "Formation" })}
              </GradientText>
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
                      alt={e.company}
                      style={{ borderRadius: 8 }}
                    />
                  ) : null}
                  <View style={{ flexGrow: 1, flexShrink: 1 }}>
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
            <View
              role="region"
              aria-label={t({ en: "Beyond Code", fr: "Au-delà du code" })}
              style={{ gap: size("m") }}
            >
              <GradientText
                stops={gradientIndigoStopsInv(theme)}
                style={[fontStyles.iosEm.title1]}
                role="heading"
                aria-level={2}
              >
                {t({ en: "Beyond Code", fr: "Au-delà du code" })}
              </GradientText>
              <View
                role="list"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {hobbies.map(({ Icon, label }) => (
                  <View role="listitem" key={t(label)} style={{ alignItems: "center" }}>
                    <Icon width={48} height={48} fill="url(#profileGrad)" />
                    <Text
                      style={[
                        fontStyles.ios.caption1,
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
        </SpacedView>
      </Container>

      {/* ===================================================== Full history */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView
          role="region"
          aria-label={t({ en: "All Experience", fr: "Tout le parcours" })}
          horizontal="l"
        >
          <GradientText
            stops={gradientFlashyStops(theme)}
            style={[fontStyles.iosEm.largeTitle]}
            role="heading"
            aria-level={2}
          >
            {t({ en: "All Experience", fr: "Tout le parcours" })}
          </GradientText>
          <Spacer size="l" />
          <ResumeTimeline
            items={items}
            talks={talks}
            activeSlug={activeSlug}
            onOpenEntry={openEntry}
          />
          <Spacer />
        </SpacedView>
      </Container>
      <Spacer size="xl" />
      {/* The entry detail as a modal above the page (?detail=…, masked as
          /resume/<slug>). Direct loads of that URL get the standalone page. */}
      {modalItems.length > 0 ? (
        <ResumeEntryModal
          items={modalItems}
          activeSlug={activeEntry?.slug}
          label={
            group
              ? (activeEntry?.company ?? group)
              : (detailItem?.title ?? t({ en: "Experience detail", fr: "Détail de l'expérience" }))
          }
        />
      ) : null}
    </WebsiteWrapper>
  );
}
