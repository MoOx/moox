"use client";

import * as React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/app/styles";
import AIPromptCircle from "@/components/AIPromptCircle";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

const circles = [
  {
    colors: ["#de65f6", "#3A1E90"] as [string, string],
    radiusRatio: 0.33,
    deformationRatio: 0.28,
    borderWidth: 8,
    opacity: 0.8,
    duration: 1500,
    hollow: true,
  },
  {
    colors: ["#48c6ef", "#6f86d6"] as [string, string],
    radiusRatio: 0.315,
    deformationRatio: 0.26,
    borderWidth: 6,
    opacity: 0.7,
    duration: 1500,
    hollow: true,
  },
  {
    colors: ["#96fbc4", "#86dcf9"] as [string, string],
    radiusRatio: 0.3,
    deformationRatio: 0.24,
    borderWidth: 2,
    opacity: 0.6,
    duration: 1500,
    hollow: true,
  },
];

export default function BlockAugmentedWithAI() {
  const theme = useTheme();

  return (
    <Container style={{ flexDirection: "row", flexWrap: "wrap-reverse" }}>
      <View style={{ maxWidth: 400, justifyContent: "center" }}>
        <AIPromptCircle size={250} circles={circles} />
      </View>
      <SpacedView
        horizontal="xl"
        gap="m"
        style={[
          {
            maxWidth: 1024 * 0.6,
            flexShrink: 1,
          },
        ]}
      >
        <Spacer size="l" />
        <Text
          style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
          role="heading"
          aria-level={2}
        >
          {"Augmented with AI."}
        </Text>
        <Text
          style={[fontStyles.iosEm.body, theme.styles.text, { opacity: 0.6 }]}
          role="paragraph"
        >
          {`Artificial Intelligence is already changing the world, and especially the way we build software.
It's a revolution that will change the way we work profoundly and will have a huge impact on our lives. It might be more important than the invention of the wheel or the Internet.
The time it's saving us already allows me to create crafted apps with precision, with more attention to the details that make the difference between a good and a great app.`}
        </Text>
        <Spacer size="s" />
      </SpacedView>
    </Container>
  );
}
