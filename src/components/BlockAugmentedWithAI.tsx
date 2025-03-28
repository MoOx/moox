"use client";

import * as React from "react";
import { Text } from "react-native";

import { useTheme } from "@/app/styles";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function BlockAugmentedWithAI() {
  const theme = useTheme();
  return (
    <Container style={{ alignItems: "flex-end" }}>
      <SpacedView
        horizontal="xl"
        vertical="xl"
        gap="m"
        style={{ maxWidth: 1024 * 0.75, flexShrink: 0 }}
      >
        <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
          {"Augmented with AI."}
        </Text>
        <Text
          style={[fontStyles.iosEm.body, theme.styles.text, { opacity: 0.6 }]}
        >
          {`Artificial Intelligence is already changing the world, and especially the way we build software.
It's a revolution that will change the way we work profoundly and will have a huge impact on our lives. It will might be more important than the invention of the wheel or the Internet.
The time it's saving us already allows me to create crafted apps with precision, with more attention to the details that make the difference between a good and a great app.`}
        </Text>
        <Spacer size="s" />
      </SpacedView>
    </Container>
  );
}
