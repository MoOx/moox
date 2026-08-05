import { useT } from "@/i18n";
import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { jobSubtitle, jobTitleParts } from "@/profile";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { gradientTextFlashyStyles, gradientTextStyles, useTheme } from "@/styles";
import { Text, View } from "react-native";

export default function BlockHey() {
  const theme = useTheme();
  const t = useT();
  return (
    <View style={{ zIndex: 1 }}>
      <Container
        // maxWidth={920}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <SpacedView
          horizontal="l"
          vertical="m"
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 450,
          }}
          // role="header"
        >
          <View style={{ flexDirection: "column-reverse" }}>
            <View style={{ alignSelf: "flex-start" }} role="heading" aria-level={1}>
              <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
                {jobTitleParts[0]}
              </Text>
              {/* "Front-End" carries the flashy gradient: it is the term
                  clients search for, so it is the one the eye should catch. */}
              <IfWindowWidthIs largerThan={WindowWidth.m}>
                <Text
                  style={[
                    fontStyles.iosEm.largeTitle,
                    theme.styles.text,
                    gradientTextStyles(theme, 176),
                    {
                      fontSize: 48,
                      lineHeight: 48,
                      fontWeight: weight.black,
                      viewTransitionName: "text--front-end-architect",
                    },
                  ]}
                >
                  <Text style={[theme.styles.text, gradientTextFlashyStyles(theme, 176)]}>
                    {jobTitleParts[1]}
                  </Text>
                  {` ${jobTitleParts[2]}.`}
                </Text>
              </IfWindowWidthIs>
              <IfWindowWidthIs smallerThan={WindowWidth.m}>
                <Text
                  style={[
                    fontStyles.iosEm.largeTitle,
                    theme.styles.text,
                    gradientTextStyles(theme, 176),
                    {
                      fontWeight: weight.black,
                      viewTransitionName: "text--front-end-architect-m",
                    },
                  ]}
                >
                  <Text style={gradientTextFlashyStyles(theme, 176)}>{jobTitleParts[1]}</Text>
                  {` ${jobTitleParts[2]}.`}
                </Text>
              </IfWindowWidthIs>
              <Text
                style={[
                  fontStyles.ios.headline,
                  theme.styles.textLight1,
                  {
                    fontWeight: weight.regular,
                    fontStyle: "italic",
                    textAlign: "right",
                  },
                ]}
              >
                {t(jobSubtitle)}
              </Text>
            </View>
            <Spacer size="l" />
            <Text role="paragraph" style={{ display: "flex", flexDirection: "column" }}>
              <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
                {t({ en: "Hey,", fr: "Hey," })}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {t({ en: "I'm ", fr: "Moi c'est " })}
                <Text
                  style={[
                    gradientTextFlashyStyles(theme, -16),
                    { viewTransitionName: "text--max" },
                  ]}
                >
                  {"Max."}
                </Text>
              </Text>
            </Text>
          </View>
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            <Spacer size="xxxl" />
          </IfWindowWidthIs>
        </SpacedView>
        <BlockMe1WithSmallPills />
      </Container>
    </View>
  );
}
