import { fetchAll } from "@/api";
import BlockMe2WithPills from "@/components/BlockMe2WithPills";
import ButtonView from "@/components/ButtonView";
import ResumeIntro from "@/components/ResumeIntro";
import ResumeStats from "@/components/ResumeStats";
import { ResumeTimeline } from "@/components/ResumeTimeline";
import SkillsCards from "@/components/SkillsCards";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { socials, visualUrl } from "@/consts";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextForReader from "@/react-multiversal/TextForReader";
import {
  gradientFlashyStops,
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
  gradientTextIndigoStyles,
  gradientTextIndigoStylesInv,
  useTheme,
} from "@/styles";
import SVGDownload from "@/svgs/components/SVGDownload";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import { createFileRoute } from "@tanstack/react-router";
import { StyleSheet, Text, View } from "react-native";

export const Route = createFileRoute("/resume")({
  loader: () => fetchAll({ data: "resume" }),
  head: () => ({
    meta: [
      {
        title:
          "Maxime Thirouin Résumé - Senior Front-End Developer, React & React Native Expert.",
      },
      {
        name: "description",
        content:
          "Max is a Senior Front-End Developer, available as a Freelance Developer since 2013. He masters React & React Native and has a passion for building great products with a focus on user experience.",
      },
    ],
  }),
  component: PageResume,
});

function PageResume() {
  const theme = useTheme();
  const items = Route.useLoaderData();

  const headline = (viewTransitionName: string) => (
    <>
      <Text
        style={[
          theme.styles.text,
          gradientTextIndigoStyles(theme),
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
        {"Front-End Developer."}
      </Text>
      <Text
        style={[fontStyles.ios.headline, theme.styles.textMainDark]}
        role="heading"
        aria-level={2}
      >
        {"Freelance "}
        <Text
          style={[
            theme.styles.textLight2,
            { fontStyle: "italic", fontWeight: "200" },
          ]}
        >
          {"since 2013"}
        </Text>
      </Text>
    </>
  );

  return (
    <WebsiteWrapper>
      <Spacer size="m" />
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
              {headline("text--front-end-developer")}
            </SpacedView>
            <Spacer size="xxxl" />
          </IfWindowWidthIs>
          <IfWindowWidthIs smallerThan={WindowWidth.m}>
            {headline("text--front-end-developer-m")}
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
          <View>
            <LinkView
              href={socials.github.value}
              underlineOnFocus={true}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <SVGSocialGithub
                width={16}
                height={16}
                fill={theme.dynamicColors.textMainDark}
              />
              <Spacer size="xs" />
              <Text style={theme.styles.textLight1}>
                {visualUrl(socials.github.value)}
              </Text>
            </LinkView>
            <Spacer size="s" />
            <LinkView
              href={socials.linkedin.value}
              underlineOnFocus={true}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <SVGSocialLinkedin
                width={16}
                height={16}
                fill={theme.dynamicColors.textMainDark}
              />
              <Spacer size="xs" />
              <Text style={theme.styles.textLight1}>
                {visualUrl(socials.linkedin.value)}
              </Text>
            </LinkView>
            <Spacer size="l" />
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

      <Container maxWidth={900}>
        <SpacedView horizontal="l">
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
          <Spacer size="l" />
          <SkillsCards mode="mini" />
        </SpacedView>
      </Container>
      <Spacer size="xxl" />
      <ResumeIntro />
      <Spacer size="xxl" />
      <ResumeStats />
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
            {"Latest Experiences"}
          </Text>
          <Spacer size="l" />
          <ResumeTimeline items={items} />
        </SpacedView>
        <Spacer />
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
