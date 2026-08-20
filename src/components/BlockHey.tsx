import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { useT } from "@/i18n";
import { jobSubtitle, jobTitleParts } from "@/profile";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import TextBlock from "@/react-multiversal/TextBlock";
import Spacer from "@/react-multiversal/Spacer";
import { gradientTextFlashyStyles, gradientTextStyles, useTheme } from "@/styles";
import { Platform, Text, View } from "react-native";

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
            {/* The heading holds the job title and nothing else: the subtitle
                below is an apposition, not part of the <h1>, and the two
                responsive sizes are one node styled by a media query (see
                `heroTitleSize` above) - rendering both variants
                put the title in the HTML twice. */}
            {/* Wrapper: the parent stacks in `column-reverse`, so heading and
                subtitle must travel together to keep the subtitle under the
                title. */}
            <View>
              <View style={{ alignSelf: "flex-start" }} role="heading" aria-level={1}>
                {/* Trailing space: the parts are stacked blocks, so without it a
                  text extractor reads "LeadFront-End Developer.". */}
                <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
                  {`${jobTitleParts[0]} `}
                </Text>
                {/* "Front-End" carries the flashy gradient: it is the term
                  clients search for, so it is the one the eye should catch. */}
                <Text
                  style={[
                    fontStyles.iosEm.largeTitle,
                    theme.styles.text,
                    gradientTextStyles(theme, 176),
                    {
                      fontWeight: weight.black,
                      viewTransitionName: "text--front-end-architect",
                    },
                    Platform.OS === "web" && {
                      fontSize: "clamp(34px, 1.3vw + 29px, 48px)" as unknown as number,
                      lineHeight: "clamp(41px, 0.66vw + 38.5px, 48px)" as unknown as number,
                    },
                  ]}
                >
                  <Text style={[theme.styles.text, gradientTextFlashyStyles(theme, 176)]}>
                    {jobTitleParts[1]}
                  </Text>
                  {` ${jobTitleParts[2]}.`}
                </Text>
              </View>
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
            <TextBlock>
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
            </TextBlock>
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
