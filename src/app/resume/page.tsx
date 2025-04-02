import { Metadata } from "next";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getAll, ResumeItem } from "@/api";
import {
  gradientFlashyStops,
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
  gradientTextIndigoStyles,
  gradientTextIndigoStylesInv,
  useTheme,
} from "@/app/styles";
import BlockMe2WithPills from "@/components/BlockMe2WithPills";
import ResumeIntro from "@/components/ResumeIntro";
import ResumeStats from "@/components/ResumeStats";
import { ResumeTimeline } from "@/components/ResumeTimeline";
import SkillsCards from "@/components/SkillsCards";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { socials, visualUrl } from "@/consts";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextForReader from "@/react-multiversal/TextForReader";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";

export const metadata: Metadata = {
  title:
    "Maxime Thirouin Résumé - Senior Front-End Developer, React & React Native Expert.",
  description:
    "Max is a Senior Front-End Developer, available as a Freelance Developer since 2013. He masters React & React Native and has a passion for building great products with a focus on user experience.",
  pagination: {
    next: "https://moox.io/resume",
  },
};

export default function PageResume() {
  const theme = useTheme();
  const items = getAll<ResumeItem>("resume");

  const headline = (transitionName: string) => (
    <>
      <React.unstable_ViewTransition name={transitionName}>
        <Text
          style={[
            theme.styles.text,
            gradientTextIndigoStyles(theme),
            {
              fontSize: 48,
              lineHeight: 48,
              fontWeight: "900",
            },
          ]}
          role="heading"
          aria-level={1}
        >
          {"Front-End Developer."}
        </Text>
      </React.unstable_ViewTransition>
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
          <React.unstable_ViewTransition name="text--max">
            <Text
              role="paragraph"
              style={[
                theme.styles.text,
                gradientTextFlashyStylesInv(theme),
                {
                  fontSize: 64,
                  lineHeight: 64,
                  fontWeight: "900",
                },
              ]}
            >
              <TextForReader>{"Nickname :"}</TextForReader>
              {"Max."}
            </Text>
          </React.unstable_ViewTransition>
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
