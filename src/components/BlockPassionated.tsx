"use client";

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { gradientFlashyStops, useTheme } from "@/app/styles";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
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
      <Container style={{ alignItems: "flex-start" }}>
        <SpacedView
          horizontal="xl"
          gap="m"
          vertical="xxl"
          style={{ maxWidth: 1024 * 0.5, flexShrink: 0 }}
        >
          <Text style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}>
            {"Passionated and Curious."}
          </Text>
          <Text
            style={[
              fontStyles.iosEm.body,
              theme.styles.textOnMain,
              { opacity: 0.6 },
            ]}
          >
            {`I made my first website in 1998, and fell in love with web development. Since then, I never stopped to learn things, especially now with the rise of AI.
From Dreamweaver to Cursor, years passed, but not my appetite to always discover new tools and technics to made even more cool and performant interfaces.`}
          </Text>
        </SpacedView>
        <Spacer size="s" />
      </Container>
    </View>
  );
}
