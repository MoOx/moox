"use client";

import Image from "next/image";
import * as React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/app/styles";
import BlockInterestedButtons from "@/components/BlockInterestedButtons";
import ThemeToggle from "@/components/ThemeToggle";
import WebsiteFooterLandscape from "@/components/WebsiteFooterLandscape";
import {
  allInternalLinks,
  footerAnchor,
  moreLinks,
  moreLinks2,
  socialLinks,
  socialLinks2,
} from "@/consts";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function WebsiteFooter() {
  const theme = useTheme();

  return (
    <View role="contentinfo">
      <WebsiteFooterLandscape>
        <Parallax
          staticTransforms={[{ translateY: 20 }]}
          transforms={[{ translateY: -20 }, { scale: 0.05 }]}
        >
          <IfWindowWidthIs smallerThan="m">
            <Spacer size="xxxl" />
          </IfWindowWidthIs>
          <BlockInterestedButtons />
        </Parallax>
      </WebsiteFooterLandscape>
      <View
        style={[theme.styles.backAlt, { alignItems: "center" }]}
        id={footerAnchor}
      >
        <Spacer />

        <Container
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          <SpacedView
            horizontal="l"
            vertical="xl"
            gap="m"
            style={{ flexBasis: 190 }}
          >
            <Text
              style={[
                fontStyles.ios.headline,
                theme.styles.text,
                { fontWeight: "200" },
              ]}
            >
              <Spacer size="m" />
              {"Navigation"}
            </Text>
            <View>
              {Object.entries(allInternalLinks)
                .filter(([, l]) => l.href !== "#" + footerAnchor)
                .map(([text, { href, icon }]) => (
                  <LinkView
                    key={href}
                    href={href}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text style={{ opacity: 0.25 }}>
                      {icon({
                        size: size("m"),
                        color: theme.dynamicColors.text,
                        style: { flexShrink: 0 },
                      })}
                    </Text>
                    <SpacedView horizontal="xs" vertical="xs">
                      <Text style={[fontStyles.iosEm.body, theme.styles.text]}>
                        {text}
                      </Text>
                    </SpacedView>
                  </LinkView>
                ))}
            </View>
          </SpacedView>
          <SpacedView
            horizontal="l"
            vertical="xl"
            gap="m"
            style={{ flexBasis: 190 }}
          >
            <Text
              style={[
                fontStyles.ios.headline,
                theme.styles.text,
                { fontWeight: "200" },
              ]}
            >
              <Spacer size="m" />
              {"Follow Me"}
            </Text>
            <View>
              {Object.entries(socialLinks).map(([text, { href, icon }]) => (
                <LinkView
                  key={href}
                  href={href}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {icon({
                    size: size("m"),
                    color: theme.dynamicColors.text,
                    style: { flexShrink: 0 },
                  })}
                  <SpacedView horizontal="xs" vertical="xs">
                    <Text style={[fontStyles.iosEm.body, theme.styles.text]}>
                      {text}
                    </Text>
                  </SpacedView>
                </LinkView>
              ))}
              {Object.entries(socialLinks2).map(([text, { href, icon }]) => (
                <LinkView
                  key={href}
                  href={href}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {icon({
                    size: size("m"),
                    color: theme.dynamicColors.text,
                    style: { flexShrink: 0 },
                  })}
                  <SpacedView horizontal="xs" vertical="xs">
                    <Text style={[fontStyles.ios.body, theme.styles.text]}>
                      {text}
                    </Text>
                  </SpacedView>
                </LinkView>
              ))}
            </View>
          </SpacedView>
          <SpacedView
            horizontal="l"
            vertical="xl"
            gap="m"
            style={{ flexBasis: 190 }}
          >
            <Text
              style={[
                fontStyles.ios.headline,
                theme.styles.text,
                { fontWeight: "200" },
              ]}
            >
              <Spacer size="m" />
              {"More"}
            </Text>
            <View>
              {Object.entries(moreLinks).map(([text, { href, icon }]) => (
                <LinkView
                  key={href}
                  href={href}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {icon({
                    size: size("m"),
                    color: theme.dynamicColors.text,
                    style: { flexShrink: 0 },
                  })}
                  <SpacedView horizontal="xs" vertical="xs">
                    <Text style={[fontStyles.iosEm.body, theme.styles.text]}>
                      {text}
                    </Text>
                  </SpacedView>
                </LinkView>
              ))}
              {Object.entries(moreLinks2).map(([text, { href, icon }]) => (
                <LinkView
                  key={href}
                  href={href}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {icon({
                    size: size("m"),
                    color: theme.dynamicColors.text,
                    style: { flexShrink: 0 },
                  })}
                  <SpacedView horizontal="xs" vertical="xs">
                    <Text style={[fontStyles.ios.body, theme.styles.text]}>
                      {text}
                    </Text>
                  </SpacedView>
                </LinkView>
              ))}
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <ThemeToggle mode="default" showLabelFor={WindowWidth.xxxl} />
            </View>
          </SpacedView>
          <Spacer />
        </Container>

        <Image
          src="/_/paintbrush-bold-orange.svg"
          alt=""
          width={512 / 2}
          height={124 / 2}
        />
        <Spacer size="xxl" />
      </View>
      <SpacedView
        horizontal="l"
        vertical="l"
        style={[
          theme.styles.back,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          },
        ]}
      >
        <View
          suppressHydrationWarning={true}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flexShrink: 1,
            filter: `drop-shadow(-1px 0 0 cyan) drop-shadow(${theme.mode === "light" ? 1 : 2}px 0 0 red) saturate(0.75)`,
            justifyContent: "center",
          }}
        >
          <Text style={[fontStyles.ios.footnote, theme.styles.text]}>
            {"Website made with "}
            <LinkText href="https://reactnative.dev">{"React Native"}</LinkText>
            <LinkText href="https://necolas.github.io/react-native-web/">
              {" for Web"}
            </LinkText>
            {" and "}
            <LinkText href="https://nextjs.org">{"Next.js"}</LinkText>
            {". "}
          </Text>
          <LinkText
            style={[fontStyles.ios.footnote, theme.styles.text]}
            href="https://github.com/MoOx/moox"
          >
            {"100% Over-engineered source available on GitHub"}
          </LinkText>
        </View>
      </SpacedView>
    </View>
  );
}
