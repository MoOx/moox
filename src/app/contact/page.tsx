"use client";
import "@/__DEV__";

import * as React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { themeLight, useTheme } from "@/app/styles";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ButtonView from "@/components/ButtonView";
import LinkButton from "@/components/LinkButton";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { sendStringAsMailString, socials } from "@/consts";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGContact from "@/svgs/components/SVGContact";
import SVGEmail from "@/svgs/components/SVGEmail";
import SVGMenuSpeechFill from "@/svgs/components/SVGMenuSpeechFill";
import SVGPhone from "@/svgs/components/SVGPhone";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";

function ContactButton({
  Icon,
  title,
  subtitle,
}: {
  Icon: React.ComponentType<{
    width: number;
    height: number;
    fill: string;
    style?: StyleProp<ViewStyle>;
  }>;
  title: string;
  subtitle: string;
}) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
        },
      ]}
    >
      <Icon width={32} height={32} fill="#fff" style={{ flexShrink: 0 }} />
      <Spacer size="s" />
      <View>
        <Text style={[fontStyles.iosEm.callout, themeLight.styles.textOnMain]}>
          {title}
        </Text>
        <Text style={[fontStyles.ios.caption2, themeLight.styles.textOnMain]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    maxWidth: 240,
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
      <Container maxWidth={640}>
        <SpacedView vertical="l" horizontal="l">
          <SpacedView
            gap="m"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexGrow: 1 }}>
              <Text style={[fontStyles.iosEm.subhead, theme.styles.textLight2]}>
                {"Awaiting your message"}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"Contact Max"}
              </Text>
            </View>
            <LinkView href="/contact">
              <AvailabilityBadge showText={true} />
            </LinkView>
          </SpacedView>
          <Spacer size="xxxl" />
          <SpacedView
            gap="m"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <LinkButton
              color="rgb(10, 102, 194)"
              style={styles.button}
              href="https://www.linkedin.com/in/maxthirouin"
              spaceHorizontal="xl"
            >
              <ContactButton
                Icon={SVGSocialLinkedin}
                title="Reach Me"
                subtitle="On LinkedIn"
              />
            </LinkButton>

            <LinkButton
              style={styles.button}
              href={!isClient ? "" : "sms:+33" + socials.call}
              color="#1FCE26"
              spaceHorizontal="xl"
            >
              <ContactButton
                Icon={SVGMenuSpeechFill}
                title="Text Me"
                subtitle={"+" + socials.ind + socials.call}
              />
            </LinkButton>

            <LinkButton
              style={styles.button}
              href={
                !isClient
                  ? ""
                  : "mailto:" + sendStringAsMailString(socials.send)
              }
              color="#007AFF"
              spaceHorizontal="xl"
            >
              <ContactButton
                Icon={SVGEmail}
                title="Email Me"
                subtitle={sendStringAsMailString(socials.send, true)}
              />
            </LinkButton>

            <LinkButton
              style={styles.button}
              href={!isClient ? "" : "tel:+33" + socials.call}
              color="#1FCE26"
              spaceHorizontal="xl"
            >
              <ContactButton
                Icon={SVGPhone}
                title="Call Me"
                subtitle={"+" + socials.ind + socials.call}
              />
            </LinkButton>

            <a
              style={{ ...styles.button, textDecoration: "none" }}
              href="/MaximeThirouin.vcf"
            >
              <ButtonView color="#FF2D55" spaceHorizontal="xl">
                <ContactButton
                  Icon={SVGContact}
                  title="Save Me"
                  subtitle="Get my contact infos"
                />
              </ButtonView>
            </a>
          </SpacedView>
          <Spacer size="xxxl" />
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
