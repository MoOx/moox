import { useT } from "@/i18n";
import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { jobSubtitle, jobTitleParts } from "@/profile";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Box from "@/react-multiversal/Box";
import Spacer from "@/react-multiversal/Spacer";
import { gradientTextFlashyStyles, gradientTextStyles, useTheme } from "@/styles";
import { Text, View } from "react-native";

/**
 * Fluid hero size: 34px on a phone, 48px from ~1440px up, interpolated in
 * between. A CSS function in an inline style, which is what react-native-web
 * writes anyway - so no stylesheet rule, no `!important`, and above all **one
 * node**: the two `IfWindowWidthIs` variants this replaces both sat in the
 * HTML, so the <h1> carried the job title twice.
 */
const heroTitleSize = {
  fontSize: "clamp(34px, 1.3vw + 29px, 48px)" as unknown as number,
  lineHeight: "clamp(41px, 0.66vw + 38.5px, 48px)" as unknown as number,
};

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
        <Box
          px="l"
          py="m"
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
                      ...heroTitleSize,
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
        </Box>
        <BlockMe1WithSmallPills />
      </Container>
    </View>
  );
}
