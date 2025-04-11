"use client";

import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import {
  alpha,
  boxShadows,
  colors,
  gradientFlashyStops,
  useTheme,
} from "@/app/styles";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import LinkButton from "@/components/LinkButton";
import ThemeToggle from "@/components/ThemeToggle";
import { internalLinks, socials } from "@/consts";
import { size, WindowWidth } from "@/react-multiversal";
import Avatar from "@/react-multiversal/Avatar";
import BlurView from "@/react-multiversal/BlurView";
import Container from "@/react-multiversal/Container";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGMoox from "@/svgs/components/SVGMoox";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";

const styles = StyleSheet.create({
  menuGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    fontWeight: "300",
  },
  linkActive: {
    fontWeight: "800",
  },
});

export default function WebsiteHeader() {
  const theme = useTheme();

  const links = Object.entries(internalLinks).map(([text, link]) => (
    <LinkText
      key={link.href}
      href={link.href}
      style={[theme.styles.text, styles.link]}
      activeStyle={styles.linkActive}
      underlineOnFocus={true}
    >
      {text}
    </LinkText>
  ));

  const contact = (
    <LinkButton
      href="/contact"
      spaceHorizontal="m"
      spaceVertical="xs"
      effect="subtle"
    >
      <Text
        numberOfLines={1}
        style={[theme.styles.textOnMain, { fontSize: 16, fontWeight: "300" }]}
      >
        {"Let's talk"}
      </Text>
    </LinkButton>
  );

  return (
    <>
      <GradientLinear
        style={{
          position: "absolute",
          top: -50,
          left: 0,
          right: 0,
          height: 100,
          transform: [{ skewY: "1deg" }],
        }}
        stops={gradientFlashyStops(theme)}
      />
      <Container
        role="banner"
        wrapperStyle={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          overflow: "visible",
          paddingHorizontal: size("m"),
          paddingVertical: size("s"),
        }}
      >
        <BlurView
          blurAmount={24}
          webBackdropFilter={"saturate(175%)"}
          style={{
            backgroundColor: theme.dynamicColors.backMainAlpha05,
            padding: 5,
            boxShadow: [...boxShadowGlass(), ...boxShadows.default],
            borderRadius: 20,
          }}
        >
          <SpacedView
            horizontal="m"
            vertical="s"
            style={{
              borderWidth: 0.5,
              borderColor: alpha(colors.black, 0.15),
              backgroundColor: theme.dynamicColors.backAlpha85,
              boxShadow: "rgba(0, 0, 0, 0.15) -1px 0px 4px 0px",
              borderRadius: 16,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.menuGroup}>
              <LinkView
                href="/"
                style={{ flexDirection: "row" }}
                aria-label="Go to home page"
              >
                <Avatar size={32} borderWidth={2} borderColor="#000" />
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    zIndex: 1,
                    paddingHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <SVGMoox fill={theme.dynamicColors.text} width={52} />
                </View>
              </LinkView>
              <AvailabilityBadge showText={"on-focus"} />
            </View>
            <IfWindowWidthIs
              smallerThan={WindowWidth.xxs}
              largerThan={WindowWidth.s}
              style={[styles.menuGroup, { justifyContent: "flex-end" }]}
            >
              {contact}
            </IfWindowWidthIs>
            <IfWindowWidthIs
              largerThan={WindowWidth.s}
              style={[styles.menuGroup, { flex: 2 }]}
            >
              <SpacedView
                gap="m"
                style={[styles.menuGroup, { justifyContent: "center" }]}
              >
                {links}
              </SpacedView>
              <SpacedView
                gap="m"
                style={[styles.menuGroup, { justifyContent: "flex-end" }]}
              >
                <LinkView
                  href={socials.linkedin.value}
                  aria-label="@Max on LinkedIn"
                >
                  <SVGSocialLinkedin
                    width={20}
                    height={20}
                    fill={theme.dynamicColors.text}
                  />
                </LinkView>
                <LinkView
                  href={socials.github.value}
                  aria-label="@MoOx on GitHub"
                >
                  <SVGSocialGithub
                    width={20}
                    height={20}
                    fill={theme.dynamicColors.text}
                  />
                </LinkView>
                {contact}
              </SpacedView>
            </IfWindowWidthIs>

            <IfWindowWidthIs largerThan={WindowWidth.s}>
              <SpacedView
                horizontal="m"
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 72,
                  },
                  {
                    right:
                      Platform.OS === "web" ? "env(safe-area-inset-right)" : 0,
                  },
                ]}
              >
                <ThemeToggle />
              </SpacedView>
            </IfWindowWidthIs>
          </SpacedView>
        </BlurView>
      </Container>
    </>
  );
}
