import { useT } from "@/i18n";
import { useHref } from "@/i18n";
import LinkButton from "@/components/LinkButton";
import SkillsCards from "@/components/SkillsCards";
import { skillsPitch, skillsPitchTitle } from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text, View } from "react-native";

/**
 * Intro to the skills teaser cards. The main pitch (tagline + summary) lives
 * higher on the page, in `BlockBuilder`'s indigo band - this block answers
 * the next question: in what shape does the help come. Detail on `/resume`.
 */
export default function BlockPitch() {
  const localizeHref = useHref();
  const theme = useTheme();
  const t = useT();

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
          <SpacedView horizontal="xl" gap="m" style={{ flexBasis: 1024 / 2, flexShrink: 1 }}>
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
              role="heading"
              aria-level={2}
            >
              {t(skillsPitchTitle)}
            </Text>
            <Text style={[fontStyles.iosEm.callout, theme.styles.textLight1]} role="paragraph">
              {t(skillsPitch)}
            </Text>
          </SpacedView>
        </View>
        <Spacer size="xxl" />
        <SpacedView horizontal="xl" gap="m">
          <SkillsCards mode="teaser" />

          <LinkButton
            href={localizeHref("/resume/")}
            color={theme.dynamicColors.backAlt}
            textColor={theme.dynamicColors.text}
            spaceHorizontal="m"
            style={{ alignSelf: "flex-end" }}
          >
            <SpacedView horizontal="m">
              <Text style={fontStyles.iosEm.callout}>
                {t({ en: "Check my resume", fr: "Voir mon CV" })}
              </Text>
            </SpacedView>
          </LinkButton>
        </SpacedView>
      </Container>
    </View>
  );
}
