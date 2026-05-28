import AIPromptCircle from "@/components/AIPromptCircle";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text, View } from "react-native";

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
        <AIPromptCircle size={200} circles={circles} />
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
          style={[fontStyles.iosEm.body, theme.styles.textLight1]}
          role="paragraph"
        >
          {`AI writes code faster than I do. It just doesn't know what to build, or why — that's still my job.\n The time it saves, I put back into architecture and craft.`}
        </Text>
        <Spacer size="s" />
      </SpacedView>
    </Container>
  );
}
