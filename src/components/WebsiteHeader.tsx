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
              borderRadius: 16,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.menuGroup}>
              <LinkView href="/" style={{ flexDirection: "row" }}>
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
                  <svg
                    height="13.158002"
                    viewBox="0 0 52.4516523 13.1580022"
                    width="52.451652"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill={theme.dynamicColors.text}>
                      <path d="m.38093354 12.8880021h2.36700038c.18900003 0 .33300006-.135.35100006-.315l.81900013-7.38900125 2.11500035 7.46100125c.04500001.144.17100003.243.32400005.243h2.18700036c.15300003 0 .27900005-.099.32400006-.243l2.11500037-7.46100125.7830001 7.39800125c.018.189.171.315.3600001.315h2.3670003c.2430001 0 .4050001-.189.3780001-.4320001l-1.5300002-11.91600191c-.027-.18900003-.1710001-.30600005-.3510001-.30600005h-2.8980005c-.153 0-.27900002.09900002-.32400003.24300004l-2.33100038 8.13600133-2.34900038-8.13600133c-.04500001-.14400002-.17100003-.24300004-.32400006-.24300004h-2.88900047c-.18000003 0-.32400005.11700002-.35100006.30600005l-1.52100025 11.90700191c-.027.2430001.13500002.4320001.37800007.4320001z" />
                      <path d="m21.5129343 13.1580022c2.9700005 0 5.2650009-2.2590004 5.2650009-5.08500088 0-2.85300046-2.2860004-5.13900084-5.2470009-5.13900084-2.9520005 0-5.2380009 2.28600038-5.2380009 5.13900084 0 2.81700048 2.2770004 5.08500088 5.2200009 5.08500088zm-2.3400004-5.10300088c0-1.37700023 1.0350002-2.39400039 2.3670004-2.39400039 1.3230002 0 2.3580004 1.01700016 2.3580004 2.39400039 0 1.35900022-1.0350002 2.37600038-2.3580004 2.37600038-1.3320002 0-2.3670004-1.01700016-2.3670004-2.37600038z" />
                      <path d="m34.7069345 13.1130021c3.6990006 0 6.5610011-2.9340004 6.5610011-6.57000103 0-3.6540006-2.8620005-6.54300107-6.5610011-6.54300107-3.7260006 0-6.579001 2.88900047-6.579001 6.54300107 0 3.63600063 2.8530004 6.57000103 6.579001 6.57000103zm-3.4560005-6.56100103c0-2.03400033 1.6110002-3.60000059 3.4560005-3.60000059 1.8360003 0 3.4380006 1.55700026 3.4380006 3.60000059 0 2.04300034-1.5840003 3.60900063-3.4380006 3.60900063-1.8450003 0-3.4560005-1.56600029-3.4560005-3.60900063z" />
                      <path d="m45.6509339 12.6450021 1.7370003-2.97000051 1.7550003 2.97000051c.099.162.2430001.243.4320001.243h2.5740004c.2880001 0 .3870001-.18.225-.4320001l-3.0600005-4.57200071 2.8620005-4.3110007c.144-.22500004.081-.43200008-.234-.43200008h-2.5830004c-.1980001 0-.3420001.08100002-.4320001.25200005l-1.5120003 2.70000044-1.5300002-2.70000044c-.09-.17100003-.2340001-.25200005-.4320001-.25200005h-2.5740004c-.2880001 0-.4050001.18000003-.234.43200008l2.9160004 4.3110007-3.1140005 4.56300071c-.162.2340001-.072.4410001.2340001.4410001h2.5380004c.189 0 .333-.081.432-.243z" />
                    </g>
                  </svg>
                </View>
              </LinkView>
              <LinkView href="/contact">
                <AvailabilityBadge showText={"on-focus"} />
              </LinkView>
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
                <LinkView href={socials.linkedin.value}>
                  <SVGSocialLinkedin
                    width={20}
                    height={20}
                    fill={theme.dynamicColors.text}
                  />
                </LinkView>
                <LinkView href={socials.github.value}>
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
