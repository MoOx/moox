import { fetchAll, ResumeItem, Talk } from "@/api";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import BlockMe2WithPills from "@/components/BlockMe2WithPills";
import ButtonView from "@/components/ButtonView";
import Card from "@/components/Card";
import ExperienceCard from "@/components/ExperienceCard";
import Image from "@/components/Image";
import ResumeStats from "@/components/ResumeStats";
import { ResumeTimeline } from "@/components/ResumeTimeline";
import SkillsCards from "@/components/SkillsCards";
import StatTile from "@/components/StatTile";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { socials, visualUrl } from "@/consts";
import {
  availabilityDetail,
  availabilityLabel,
  compactCount,
  freelanceSince,
  fullName,
  githubFollowers,
  githubSince,
  groupKey,
  groupPeriods,
  hobbies,
  jobSubtitle,
  jobTitle,
  keyExperiences,
  languages,
  lowerKeepingAcronyms,
  metaDescription,
  monthRange,
  nickname,
  openSourceCredits,
  openSourceIntro,
  personJsonLd,
  profileStats,
  projectName,
  putaindecodeArticles,
  putaindecodeArticlesUrl,
  putaindecodePodcastsUrl,
  recommendationsUrl,
  resumeEntryPath,
  selectedTalksSlugs,
  summary,
  tagline,
  techs,
  workLocation,
  yearRange,
} from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextForReader from "@/react-multiversal/TextForReader";
import {
  alpha,
  colors,
  gradientFlashyStops,
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
  gradientTextIndigoStylesInv,
  useTheme,
} from "@/styles";
import SVGDownload from "@/svgs/components/SVGDownload";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";

export const Route = createFileRoute("/resume")({
  loader: async () => {
    const [resume, talks, blog] = await Promise.all([
      fetchAll({ data: "resume" }),
      fetchAll({ data: "talks" }),
      fetchAll({ data: "blog" }),
    ]);
    return { resume, talks, blog };
  },
  head: () => ({
    meta: [
      // Same title vocabulary as `/` and `/cv` (see profile.tsx) - one job
      // title site-wide, for humans and crawlers alike.
      {
        title: `${fullName} (${nickname}) - Résumé & Experience Timeline - ${jobTitle}`,
      },
      { name: "description", content: metaDescription },
    ],
  }),
  component: PageResume,
});

/**
 * The web CV: same structure and content sources as `/cv`, without the
 * two-page constraint. The condensed, CV-shaped read comes first; the full
 * timeline (every experience, with detail modals) closes the page for the
 * readers who scroll that far.
 */
function PageResume() {
  const theme = useTheme();
  const { resume: items, talks, blog } = Route.useLoaderData();
  // Slug of the entry whose detail modal is open (child route /resume/$slug).
  const { slug: activeSlug } = useParams({ strict: false });

  const highlights = keyExperiences(items);
  const membersOf = (item: ResumeItem) =>
    items.filter((i) => groupKey(i) === groupKey(item));
  const education = items
    .filter((i) => i.education)
    .sort((a, b) => ((b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1));
  // Open source reads best as a story: oldest first (cssnext → stylelint → …).
  const openSource = items
    .filter((i) => i.openSource)
    .sort((a, b) => (a.dateStart > b.dateStart ? 1 : -1));

  const talksSelected = selectedTalksSlugs
    .map((slug) => talks.find((t) => t.slug === slug))
    .filter((t): t is Talk => Boolean(t));

  const headline = (viewTransitionName: string) => (
    <>
      <Text
        style={[
          fontStyles.iosEm.caption1,
          theme.styles.textLight2,
          { letterSpacing: 1.4, textTransform: "uppercase" },
        ]}
      >
        {`Freelance since ${freelanceSince} · ${workLocation}`}
      </Text>
      <Text
        style={[
          theme.styles.text,
          gradientTextFlashyStyles(theme, 172),
          {
            fontSize: 48,
            lineHeight: 48,
            fontWeight: "900",
            viewTransitionName,
          },
        ]}
        role="heading"
        aria-level={1}
      >
        {`${jobTitle}.`}
      </Text>
      <Text
        style={[
          fontStyles.ios.subhead,
          theme.styles.textLight1,
          { fontStyle: "italic" },
        ]}
        role="heading"
        aria-level={2}
      >
        {jobSubtitle}
      </Text>
    </>
  );

  return (
    <WebsiteWrapper>
      {/* Machine-readable twin of the page, same data as / and /cv. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(items)),
        }}
      />
      {/* Shared violet gradient for the Beyond Code icon fills. */}
      <Svg width={0} height={0} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="profileGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={theme.dynamicColors.textFlashy1} />
            <Stop offset="1" stopColor={theme.dynamicColors.textFlashy4} />
          </LinearGradient>
        </Defs>
      </Svg>
      <Spacer size="m" />

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
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 300,
            justifyContent: "center",
          }}
        >
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            <SpacedView
              horizontal="l"
              vertical="m"
              style={{ position: "absolute", top: 0, left: 0, right: -300 }}
            >
              {headline("text--front-end-architect")}
            </SpacedView>
            <Spacer size="xxxl" />
            <Spacer size="l" />
          </IfWindowWidthIs>
          <IfWindowWidthIs smallerThan={WindowWidth.m}>
            {headline("text--front-end-architect-m")}
            <Spacer size="xl" />
          </IfWindowWidthIs>
          <Text
            role="paragraph"
            style={[
              theme.styles.text,
              gradientTextFlashyStylesInv(theme),
              {
                fontSize: 64,
                lineHeight: 64,
                fontWeight: "900",
                viewTransitionName: "text--max",
              },
            ]}
          >
            <TextForReader>{"Nickname :"}</TextForReader>
            {"Max."}
          </Text>
          <Text
            role="paragraph"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextForReader>{"Full name :"}</TextForReader>
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
          </Text>
          <Spacer size="l" />
          <View style={{ gap: size("s") }}>
            <LinkView
              href={socials.github.value}
              underlineOnFocus={true}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: size("xs"),
              }}
            >
              <SVGSocialGithub
                width={16}
                height={16}
                fill={theme.dynamicColors.textMainDark}
              />
              <Text style={theme.styles.textLight1}>
                {visualUrl(socials.github.value)}
              </Text>
            </LinkView>
            <LinkView
              href={socials.linkedin.value}
              underlineOnFocus={true}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: size("xs"),
              }}
            >
              <SVGSocialLinkedin
                width={16}
                height={16}
                fill={theme.dynamicColors.textMainDark}
              />
              <Text style={theme.styles.textLight1}>
                {visualUrl(socials.linkedin.value)}
              </Text>
            </LinkView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: size("s"),
              }}
            >
              {languages.map((l) => (
                <Text
                  key={l.label}
                  style={[fontStyles.ios.footnote, theme.styles.textLight1]}
                >
                  {`${l.flag} ${l.label} `}
                  <Text style={theme.styles.text}>{l.level}</Text>
                </Text>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: size("xs"),
              }}
            >
              <AvailabilityBadge showText={true} text={availabilityLabel} />
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {availabilityDetail}
              </Text>
            </View>
            <Spacer size="s" />
            <a
              href="/maxime-thirouin-freelance-front-end-developer-resume.pdf"
              download
              style={{
                alignItems: "flex-start",
                display: "flex",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ButtonView
                mode="outline"
                effect="subtle"
                spaceGap="xs"
                textColor={theme.dynamicColors.textFlashy1}
              >
                {({ color }) => (
                  <>
                    <SVGDownload width={16} height={16} fill={color} />
                    <Text
                      style={[
                        {
                          color,
                          fontWeight: weight.bold,
                        },
                        gradientTextFlashyStyles(theme, 20),
                      ]}
                    >
                      {"Download"}
                    </Text>
                  </>
                )}
              </ButtonView>
            </a>
          </View>
          <Spacer size="xl" />
          <View style={{ height: 3, width: "95%" }}>
            <GradientLinear
              style={[StyleSheet.absoluteFill, { borderRadius: 4 }]}
              stops={gradientFlashyStops(theme)}
            />
          </View>
        </SpacedView>
        <BlockMe2WithPills />
      </Container>

      {/* ================================================== Summary banner */}
      <Spacer size="l" />
      <Container maxWidth={900}>
        <SpacedView horizontal="l">
          <View
            style={{
              borderRadius: size("s"),
              overflow: "hidden",
              backgroundImage: `linear-gradient(4deg,
                ${theme.dynamicColors.textFlashy1} 0%,
                ${theme.dynamicColors.textFlashy2} 25%,
                ${theme.dynamicColors.textFlashy3} 75%,
                ${theme.dynamicColors.textFlashy4} 100%)`,
            }}
          >
            <SpacedView horizontal="l" vertical="m" gap="xs">
              <Text style={[fontStyles.iosEm.title3, { color: colors.white }]}>
                {tagline}
              </Text>
              <Text
                style={[
                  fontStyles.ios.callout,
                  { color: alpha(colors.white, 0.92) },
                ]}
              >
                {summary}
              </Text>
            </SpacedView>
          </View>
        </SpacedView>
      </Container>

      {/* ==================================================== Profile stats */}
      <Spacer size="xl" />
      <ResumeStats stats={profileStats(items)} />

      {/* =========================================================== Skills */}
      <Spacer size="xl" />
      <Container maxWidth={900}>
        <SpacedView horizontal="l" gap="l">
          <Text
            style={[
              fontStyles.iosEm.largeTitle,
              gradientTextIndigoStylesInv(theme),
            ]}
            role="heading"
            aria-level={2}
          >
            {"Skills"}
          </Text>
          <SkillsCards mode="full" />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              rowGap: size("s"),
            }}
          >
            {techs.map(({ Icon, label }) => (
              <View key={label} style={{ alignItems: "center", width: 70 }}>
                <Icon width={40} height={40} />
                <Text
                  style={[fontStyles.ios.caption2, theme.styles.textLight1]}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </SpacedView>
      </Container>

      {/* ======================================================= Experience */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView horizontal="l" gap="m">
          <Text
            style={[
              fontStyles.iosEm.largeTitle,
              gradientTextFlashyStyles(theme),
            ]}
            role="heading"
            aria-level={2}
          >
            {"Experience"}
          </Text>
          {/* Full-width rows: copy on the left, the illustration fading in
              from the right. The ⓘ opens the detail modal (the whole group's
              missions for grouped clients). */}
          <View style={{ gap: size("m") }}>
            {highlights.map((h) => (
              <ExperienceCard
                key={h.slug}
                image={h.image}
                pretitle={h.job_title ?? h.title}
                title={h.company}
                dates={(() => {
                  const periods = groupPeriods(membersOf(h));
                  return periods.length > 1
                    ? periods.join(" · ")
                    : monthRange(h);
                })()}
                text={h.groupPitch ?? h.description}
                stats={h.stats}
                tags={h.hashtags}
                infoHref={resumeEntryPath(h)}
                infoLabel={`All the details about ${h.company}`}
              />
            ))}
          </View>
        </SpacedView>
      </Container>

      {/* ====================================================== Open Source */}
      {/* Full-bleed band like the stats one (opposite skew), so the entry
          cards sit directly on it - no more card-in-a-card. */}
      <Spacer size="xxl" />
      <SpacedView vertical="xl">
        <GradientLinear
          angle={60}
          stops={[
            { offset: 10, stopColor: "#010244" },
            { offset: 100, stopColor: "#0F7CB7" },
          ]}
          style={[StyleSheet.absoluteFill, { transform: [{ skewY: "-1deg" }] }]}
        />
        <Container maxWidth={900}>
          <SpacedView horizontal="l" gap="m">
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
                {"Open Source"}
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={[
                  fontStyles.ios.caption1,
                  { color: alpha(colors.white, 0.72) },
                ]}
              >
                {`${compactCount(githubFollowers)} followers · on GitHub since ${githubSince}`}
              </Text>
            </View>
            <Text
              style={[
                fontStyles.ios.callout,
                { color: alpha(colors.white, 0.85) },
              ]}
            >
              {openSourceIntro}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: size("m"),
              }}
            >
              {openSource.map((item) => {
                const [headline, ...rest] = item.stats ?? [];
                return (
                  <Card
                    key={item.slug}
                    style={{ flexBasis: 380 }}
                    gradient={["#0D0837", "#0F7CB7"]}
                    image={item.image}
                    pretitle={`${item.job_title ?? ""} · ${yearRange(item)}`}
                    title={projectName(item)}
                    text={item.description?.trim()}
                    infoHref={resumeEntryPath(item)}
                    infoLabel={`All the details about ${projectName(item)}`}
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
                            style={[
                              fontStyles.ios.caption1,
                              { color: alpha(colors.white, 0.8) },
                            ]}
                          >
                            {` ${headline.label}`}
                          </Text>
                        </Text>
                        {rest.length > 0 ? (
                          <Text
                            style={[
                              fontStyles.ios.caption2,
                              { color: alpha(colors.white, 0.6) },
                            ]}
                          >
                            {rest
                              .map(
                                (s) =>
                                  `${s.stat} ${lowerKeepingAcronyms(s.label)}`,
                              )
                              .join(" · ")}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                  </Card>
                );
              })}
            </View>
            <Text
              style={[
                fontStyles.ios.caption1,
                { color: alpha(colors.white, 0.72) },
              ]}
            >
              {"Also: "}
              {openSourceCredits.map((credit, i) => (
                <Text key={credit.label}>
                  {i > 0 ? " · " : ""}
                  <Text
                    style={{ color: colors.white, fontWeight: weight.semibold }}
                  >
                    {credit.label}
                  </Text>
                  {` ${credit.note}`}
                </Text>
              ))}
            </Text>
          </SpacedView>
        </Container>
      </SpacedView>

      {/* ================================================ Talks & Community */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView horizontal="l" gap="m">
          <Text
            style={[
              fontStyles.iosEm.largeTitle,
              gradientTextIndigoStylesInv(theme),
            ]}
            role="heading"
            aria-level={2}
          >
            {"Talks & Community"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: size("s"),
            }}
          >
            <StatTile
              valueFontSize={22}
              stat={{
                stat: `${talks.length}`,
                label: "Conference talks",
                comment: "in French & English",
                url: "/talks",
              }}
            />
            <StatTile
              valueFontSize={22}
              stat={{
                // blog.json only indexes moox.io; putaindecode.io is a manual
                // figure from profile.tsx (see STATS.md).
                stat: `${blog.length + putaindecodeArticles}`,
                label: "Blog posts",
                comment: "on moox.io & putaindecode.io",
                url: "/blog",
              }}
            />
            <StatTile
              valueFontSize={22}
              flexBasis={200}
              stat={{
                stat: "co-founder",
                label: visualUrl(socials.putaindecode.value),
                comment: "FR dev community, blog & podcast",
                url: socials.putaindecode.value,
              }}
            />
          </View>
          {talksSelected.length > 0 ? (
            <Text style={[fontStyles.ios.caption1, theme.styles.textLight1]}>
              {"Selected: "}
              {talksSelected
                .map(
                  (t) =>
                    `“${t.title}”${t.conference ? ` - ${t.conference}` : ""}`,
                )
                .join(" · ")}
            </Text>
          ) : null}
          <Text style={[fontStyles.ios.caption1, theme.styles.textLight1]}>
            {"On putaindecode.io: "}
            <LinkText
              href={putaindecodeArticlesUrl}
              underline={true}
              style={[fontStyles.iosEm.caption1, theme.styles.textMain]}
            >
              {"my articles"}
            </LinkText>
            {" · "}
            <LinkText
              href={putaindecodePodcastsUrl}
              underline={true}
              style={[fontStyles.iosEm.caption1, theme.styles.textMain]}
            >
              {"the podcast"}
            </LinkText>
          </Text>
          <LinkView href={recommendationsUrl} underlineOnFocus={true}>
            <Text style={[fontStyles.ios.callout, theme.styles.textLight1]}>
              {"Testimonials: all recommendations on "}
              <Text
                style={[
                  fontStyles.iosEm.callout,
                  { color: theme.dynamicColors.textFlashy3 },
                ]}
              >
                {visualUrl(socials.linkedin.value)}
              </Text>
            </Text>
          </LinkView>
        </SpacedView>
      </Container>

      {/* ========================================= Education & Beyond Code */}
      <Spacer size="xxl" />
      <Container maxWidth={900}>
        <SpacedView
          horizontal="l"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: size("xl"),
          }}
        >
          <View style={{ flexGrow: 1, flexBasis: 280, gap: size("m") }}>
            <Text
              style={[fontStyles.iosEm.title1, gradientTextFlashyStyles(theme)]}
              role="heading"
              aria-level={2}
            >
              {"Education"}
            </Text>
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
                <View style={{ flex: 1 }}>
                  <Text style={[fontStyles.iosEm.footnote, theme.styles.text]}>
                    {e.job_title ?? e.title}
                  </Text>
                  <Text
                    style={[fontStyles.ios.caption1, theme.styles.textLight1]}
                  >
                    {`${e.company} · ${yearRange(e)}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ flexGrow: 1, flexBasis: 280, gap: size("m") }}>
            <Text
              style={[
                fontStyles.iosEm.title1,
                gradientTextIndigoStylesInv(theme),
              ]}
              role="heading"
              aria-level={2}
            >
              {"Beyond Code"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {hobbies.map(({ Icon, label }) => (
                <View key={label} style={{ alignItems: "center" }}>
                  <Icon width={48} height={48} fill="url(#profileGrad)" />
                  <Text
                    style={[
                      fontStyles.ios.caption1,
                      theme.styles.textLight1,
                      { textAlign: "center" },
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </SpacedView>
      </Container>

      {/* ===================================================== Full history */}
      <Spacer size="xxl" />
      <Container maxWidth={840}>
        <SpacedView horizontal="l">
          <Text
            style={[
              fontStyles.iosEm.largeTitle,
              gradientTextFlashyStyles(theme),
              { alignSelf: "center" },
            ]}
            role="heading"
            aria-level={2}
          >
            {"Full History"}
          </Text>
          <Spacer size="s" />
          <Text
            style={[
              fontStyles.ios.callout,
              theme.styles.textLight1,
              { textAlign: "center" },
            ]}
          >
            {
              "Every experience since the beginning - click one for the full story."
            }
          </Text>
          <Spacer size="l" />
          <ResumeTimeline items={items} activeSlug={activeSlug} />
        </SpacedView>
        <Spacer />
      </Container>
      <Spacer size="xl" />
      {/* The /resume/$slug detail renders here, as a modal above the page. */}
      <Outlet />
    </WebsiteWrapper>
  );
}
