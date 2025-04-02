"use client";
import "@/__DEV__";

import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/app/styles";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ChatBot from "@/components/ChatBot";
import ContactCard from "@/components/ContactCard";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { socials } from "@/consts";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGContact from "@/svgs/components/SVGContact";
import SVGEmail from "@/svgs/components/SVGEmail";
import SVGJavaScriptOutline from "@/svgs/components/SVGJavaScriptOutline";
import SVGMenuContactFill from "@/svgs/components/SVGMenuContactFill";
import SVGPhone from "@/svgs/components/SVGPhone";
import SVGSocialBsky from "@/svgs/components/SVGSocialBsky";
import SVGSocialDribbble from "@/svgs/components/SVGSocialDribbble";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import SVGSocialX from "@/svgs/components/SVGSocialX";

const ind = "33";
const sendStringAsMailString = (str: string) => str.replace("/", "@");

const styles = StyleSheet.create({
  gradientEdge: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: size("l"),
    zIndex: 1,
  },
  gradientLeft: {
    left: 0,
  },
  gradientRight: {
    right: 0,
  },
  cardContainer: {
    flexGrow: 1,
  },
});

export default function PageContact() {
  const theme = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <WebsiteWrapper>
      <Container maxWidth={768}>
        <SpacedView vertical="m">
          <SpacedView
            horizontal="l"
            gap="m"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexGrow: 1 }}>
              <Text style={[fontStyles.iosEm.subhead, theme.styles.textLight2]}>
                {"Hey it's BotMax"}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"What can I help with?"}
              </Text>
            </View>
            <AvailabilityBadge showText={true} />
          </SpacedView>
          <Spacer size="xl" />
          <SpacedView>
            <GradientLinear
              angle={0}
              stops={[
                { offset: 0, stopColor: theme.dynamicColors.back },
                {
                  offset: 100,
                  stopColor: theme.dynamicColors.back,
                  stopOpacity: "0",
                },
              ]}
              style={[styles.gradientEdge, styles.gradientLeft]}
            />
            <GradientLinear
              angle={0}
              stops={[
                {
                  offset: 0,
                  stopColor: theme.dynamicColors.back,
                  stopOpacity: "0",
                },
                { offset: 100, stopColor: theme.dynamicColors.back },
              ]}
              style={[styles.gradientEdge, styles.gradientRight]}
            />
            <style>
              {`#contact-scroll { scroll-padding-inline-start: ${size("m")}px }`}
            </style>
            <ScrollView
              id="contact-scroll"
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: size("m") }}
            >
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={!isClient ? "" : "sms:+33" + socials.text.value}
                >
                  <ContactCard
                    Icon={SVGMenuContactFill}
                    title={"Send Max a Message"}
                    subtitle={"+" + ind + socials.text.value}
                    color={socials.text.color}
                    colorAlt={socials.text.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={
                    !isClient
                      ? ""
                      : "mailto:" + sendStringAsMailString(socials.send.value)
                  }
                >
                  <ContactCard
                    Icon={SVGEmail}
                    title={"Send Max\nan Email"}
                    subtitle={sendStringAsMailString(socials.send.value)}
                    color={socials.send.color}
                    colorAlt={socials.send.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={!isClient ? "" : "tel:+33" + socials.call.value}
                >
                  <ContactCard
                    Icon={SVGPhone}
                    title="Call Max"
                    subtitle={"+" + ind + socials.call.value}
                    color={socials.call.color}
                    colorAlt={socials.call.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <a
                  style={{ ...styles.cardContainer, textDecoration: "none" }}
                  href={socials.vcf.value}
                >
                  <ContactCard
                    Icon={SVGContact}
                    title="Download Max's Card"
                    subtitle="Save his info for later"
                    color={socials.vcf.color}
                    colorAlt={socials.vcf.colorAlt}
                  />
                </a>
              </SpacedView>
            </ScrollView>
            <Spacer size="m" />
            <style>
              {`#contact-scroll-2 { scroll-padding-inline-start: ${size("m")}px }`}
            </style>
            <ScrollView
              id="contact-scroll-2"
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: size("m") }}
            >
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={socials.linkedin.value}
                >
                  <ContactCard
                    mode="outline"
                    Icon={SVGSocialLinkedin}
                    title={"Connect\nwith Max"}
                    subtitle="On LinkedIn"
                    color={socials.linkedin.color}
                    colorAlt={socials.linkedin.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={socials.github.value}
                >
                  <ContactCard
                    mode="outline"
                    Icon={SVGSocialGithub}
                    title="Checkout Max's Profile"
                    subtitle="On GitHub"
                    color={socials.github.color}
                    colorAlt={socials.github.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={socials.bsky.value}
                >
                  <ContactCard
                    mode="outline"
                    Icon={SVGSocialBsky}
                    title={"Connect\nwith Max"}
                    subtitle="On Bluesky"
                    color={socials.bsky.color}
                    colorAlt={socials.bsky.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView
                  style={styles.cardContainer}
                  href={socials.dribbble.value}
                >
                  <ContactCard
                    mode="outline"
                    Icon={SVGSocialDribbble}
                    title="Check pixels"
                    subtitle="On Dribbble"
                    color={socials.dribbble.color}
                    colorAlt={socials.dribbble.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView style={styles.cardContainer} href={socials.npm.value}>
                  <ContactCard
                    mode="outline"
                    Icon={SVGJavaScriptOutline}
                    title="$ npm install"
                    subtitle="@moox On NPM"
                    color={socials.npm.color}
                    colorAlt={socials.npm.colorAlt}
                  />
                </LinkView>
              </SpacedView>
              <SpacedView horizontal="xs" style={styles.cardContainer}>
                <LinkView style={styles.cardContainer} href={socials.x.value}>
                  <ContactCard
                    mode="outline"
                    Icon={SVGSocialX}
                    title="Tweet to Max via DM"
                    subtitle="On X"
                    color={socials.x.color}
                    colorAlt={socials.x.colorAlt}
                  />
                </LinkView>
              </SpacedView>
            </ScrollView>
          </SpacedView>
        </SpacedView>
        <ChatBot />
      </Container>
      <Spacer size="xxxl" />
    </WebsiteWrapper>
  );
}
