import LinkButton from "@/components/LinkButton";
import SkillsCards from "@/components/SkillsCards";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text, View } from "react-native";

export default function BlockFrontendArchitect() {
  const theme = useTheme();

  return (
    <View style={theme.styles.back}>
      <Container>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <SpacedView
            horizontal="xl"
            gap="m"
            style={{ flexBasis: 1024 / 2, flexShrink: 1 }}
          >
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
              role="heading"
              aria-level={2}
            >
              {"Front-end Architect."}
            </Text>
            <Text
              style={[fontStyles.iosEm.callout, theme.styles.textLight1]}
              role="paragraph"
            >
              {`My various experiences made me confident about the technologies & tools I use in order to help you & your team, whether you need some advices, training or help to boostrap your project so you can focus on the feature your user needs.
Over the years, I refined my way to approach development, which allows me to confidently takes high-level design choices when building web & mobile apps, and selecting tools adapted to the user interface you need.`}
            </Text>
          </SpacedView>
        </View>
        <Spacer size="xxl" />
        <SpacedView horizontal="xl" gap="m">
          <SkillsCards />

          <LinkButton
            href="/resume/"
            color={theme.dynamicColors.backAlt}
            textColor={theme.dynamicColors.text}
            spaceHorizontal="m"
            style={{ alignSelf: "flex-end" }}
          >
            <SpacedView horizontal="m">
              <Text style={fontStyles.iosEm.callout}>{"Check my resume"}</Text>
            </SpacedView>
          </LinkButton>
        </SpacedView>
      </Container>
    </View>
  );
}
