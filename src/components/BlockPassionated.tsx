"use client";

import Image from "next/image";
import { StyleSheet, Text, View } from "react-native";

import { gradientFlashyStops, useTheme } from "@/app/styles";
import LinkButton from "@/components/LinkButton";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

const skew = [{ skewY: "1deg" }, { scaleY: 1.1 }];

export default function BlockPassionated() {
  const theme = useTheme();
  return (
    <View>
      <GradientLinear
        stops={gradientFlashyStops(theme)}
        angle={190}
        style={[StyleSheet.absoluteFill, { transform: skew }]}
      />
      <Container style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <SpacedView
          horizontal="xl"
          gap="m"
          // vertical="xxl"
          style={{ maxWidth: 1024 * 0.5, flexShrink: 1 }}
        >
          <Spacer size="xxl" />
          <Text
            style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
            role="heading"
            aria-level={2}
          >
            {"Passionated and Curious."}
          </Text>
          <Text
            style={[
              fontStyles.iosEm.body,
              theme.styles.textOnMain,
              { opacity: 0.6 },
            ]}
            role="paragraph"
          >
            {`I made my first website in 1998, and fell in love with web development. Since then, I never stopped to learn things, especially now with the rise of AI.
From Dreamweaver to Cursor, years passed, but not my appetite to always discover new tools and technics to made even more cool and performant interfaces.`}
          </Text>
          <LinkButton
            href="/resume/"
            color={theme.dynamicColors.back}
            textColor={theme.dynamicColors.text}
            spaceHorizontal="m"
            style={{ alignSelf: "flex-start" }}
          >
            <SpacedView horizontal="m">
              <Text style={fontStyles.iosEm.callout}>
                {"Discover my story"}
              </Text>
            </SpacedView>
          </LinkButton>
        </SpacedView>
        <View>
          <Parallax
            staticTransforms={[{ perspective: 800 }, { scale: 0.8 }]}
            transforms={[{ rotateY: "-20deg" }, { rotateX: "20deg" }]}
            style={{
              filter: "drop-shadow(4px 6px 10px rgba(0, 0, 0, 0.4))",
            }}
          >
            <View
              style={{
                padding: 16,
                paddingTop: 32,
                paddingBottom: 64,
                flexGrow: 0,
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 4,
                    overflow: "hidden",
                  },
                ]}
              >
                <Parallax
                  staticTransforms={[{ scale: 1.6 }]}
                  transforms={[{ rotate: "-180deg" }]}
                  style={[
                    StyleSheet.absoluteFill,
                    { transformOrigin: "50% 50%" },
                  ]}
                  contentStyle={StyleSheet.absoluteFill}
                >
                  <GradientLinear
                    stops={[
                      { stopColor: "#f0f0cf", offset: 0 },
                      { stopColor: "#ffffff", offset: 30 },
                      { stopColor: "#ffffff", offset: 60 },
                      { stopColor: "#e0e0d8", offset: 100 },
                    ]}
                    angle={10}
                  />
                </Parallax>
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 10,
                  height: 42,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(0, 0, 0, 0.01)",
                  filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.02))",
                  overflow: "hidden",
                  boxShadow: "inset 0 0 16px rgba(255,255,255, 0.2)",
                }}
              >
                <SpacedView horizontal="xxs" vertical="xxs">
                  <Text
                    style={[
                      fontStyles.ios.caption1,
                      theme.styles.text,
                      {
                        fontFamily: "Comic Sans MS, Chalkboard SE",
                        opacity: 0.5,
                      },
                    ]}
                  >
                    {"Max about to discover Comic Sans"}
                  </Text>
                  <Text
                    style={[
                      fontStyles.ios.caption2,
                      theme.styles.text,
                      {
                        fontFamily: "Comic Sans MS, Chalkboard SE",
                        fontStyle: "italic",
                        textAlign: "right",
                        opacity: 0.25,
                      },
                    ]}
                  >
                    {"Feb. 1996"}
                  </Text>
                </SpacedView>
              </View>
              <Image
                src="/max-kid.jpg"
                alt=""
                width={1024 / 4}
                height={1079 / 4}
                style={{
                  zIndex: 1,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(0, 0, 0, 0.25)",
                  filter: "contrast(130%) grayscale(25%)",
                }}
              />
              <Text
                style={[
                  fontStyles.ios.caption2,
                  theme.styles.textOnMain,
                  {
                    zIndex: 3,
                    position: "absolute",
                    left: 24,
                    top: 36,
                    textShadow: "0 0 2px rgba(0,0,0, 0.5)",
                    opacity: 0.8,
                  },
                ]}
              >
                {"Not AI generated."}
              </Text>
              <Text
                style={[
                  fontStyles.ios.caption2,
                  theme.styles.textOnMain,
                  {
                    zIndex: 3,
                    position: "absolute",
                    left: 24,
                    bottom: 72,
                    textShadow: "0 0 2px rgba(0,0,0, 0.5)",
                    opacity: 0.4,
                  },
                ]}
              >
                {"Original photo."}
              </Text>
              <View
                // @ts-ignore
                style={{
                  zIndex: 2,
                  position: "absolute",
                  left: 16,
                  right: 16,
                  top: 32,
                  bottom: 64,
                  overflow: "hidden",
                  mixBlendMode: "plus-lighter",
                }}
              >
                <Parallax
                  transforms={[{ rotate: "-200deg" }]}
                  style={[
                    StyleSheet.absoluteFill,
                    { transformOrigin: "50% 50%" },
                  ]}
                  contentStyle={StyleSheet.absoluteFill}
                >
                  <GradientLinear
                    style={[StyleSheet.absoluteFill, { scale: 1.4 }]}
                    stops={[
                      { stopColor: "#fff", offset: 0, stopOpacity: "0.0" },
                      { stopColor: "#fff", offset: 25, stopOpacity: "0.05" },
                      { stopColor: "#fff", offset: 45, stopOpacity: "0.35" },
                      { stopColor: "#fff", offset: 65, stopOpacity: "0.05" },
                      { stopColor: "#fff", offset: 100, stopOpacity: "0.0" },
                    ]}
                    angle={8}
                  />
                </Parallax>
              </View>
            </View>
          </Parallax>
        </View>
      </Container>
    </View>
  );
}
