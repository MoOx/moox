import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

import { getAll, ResumeItem } from "@/api";
import {
  gradientFlashyStops,
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
  useTheme,
} from "@/app/styles";
import BlockCompaniesTried from "@/components/BlockCompaniesTried";
import BlockCompaniesTrust from "@/components/BlockCompaniesTrust";
import BlockFrontendArchitect from "@/components/BlockFrontendArchitect";
import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import BlockPassionated from "@/components/BlockPassionated";
import BlockTestimonials from "@/components/BlockTestimonials";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import {
  calculateGradientCoordinates,
  GradientLinearDefs,
} from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function Home() {
  const theme = useTheme();
  const resumeEntry = getAll<ResumeItem>("resume").find((item) =>
    item.slug.includes("pekin")
  );
  return (
    <WebsiteWrapper>
      <View style={{ zIndex: 1 }}>
        <Svg
          width="600"
          height="120"
          viewBox="0 0 600 120"
          style={[
            StyleSheet.absoluteFill,
            { width: "100%", height: "100%", opacity: 0.025 },
          ]}
        >
          <GradientLinearDefs
            id="gradientFrontEndDeveloper"
            coordinates={calculateGradientCoordinates(0)}
            stops={gradientFlashyStops(theme)}
          />
          <SvgText
            x="10"
            y="60"
            fill="url(#gradientFrontEndDeveloper)"
            fontSize="60px"
            fontFamily={"System"}
            fontWeight="bold"
          >
            {"Front-End Developer."}
          </SvgText>
        </Svg>
        <Container
          // maxWidth={900}
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
            gap="m"
            style={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 450,
            }}
          >
            <View>
              <Text style={[fontStyles.ios.headline, theme.styles.textLight2]}>
                {"Hello,"}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"I'm "}{" "}
                <React.unstable_ViewTransition name="text--max">
                  <Text style={gradientTextFlashyStylesInv(theme)}>
                    {"Max."}
                  </Text>
                </React.unstable_ViewTransition>
              </Text>
            </View>
            <IfWindowWidthIs largerThan={WindowWidth.s}>
              <View>
                <Text
                  style={[fontStyles.iosEm.headline, theme.styles.textLight2]}
                >
                  {"A Web & Mobile"}
                </Text>
                <React.unstable_ViewTransition name="text--front-end-developer">
                  <Text
                    style={[
                      theme.styles.text,
                      gradientTextFlashyStyles(theme),
                      {
                        fontSize: 48,
                        lineHeight: 48,
                        fontWeight: "900",
                      },
                    ]}
                  >
                    {"Front-End Developer."}
                  </Text>
                </React.unstable_ViewTransition>
              </View>
              <Spacer size="m" />
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"I can build the "}
                <Text style={gradientTextFlashyStylesInv(theme)}>{"app"}</Text>
                {"\n"}
                {" you are dreaming about."}
              </Text>
            </IfWindowWidthIs>
            <IfWindowWidthIs smallerThan={WindowWidth.s}>
              <View>
                <Text
                  style={[fontStyles.iosEm.headline, theme.styles.textLight2]}
                >
                  {"A Web & Mobile"}
                </Text>
                <React.unstable_ViewTransition name="text--front-end-developer-m">
                  <Text
                    style={[
                      theme.styles.text,
                      gradientTextFlashyStyles(theme),
                      {
                        fontSize: 48,
                        lineHeight: 48,
                        fontWeight: "900",
                      },
                    ]}
                  >
                    {"Front-End Developer."}
                  </Text>
                </React.unstable_ViewTransition>
              </View>
              <Text
                style={[
                  fontStyles.iosEm.title1,
                  theme.styles.text,
                  { flexShrink: 1 },
                ]}
              >
                {"I can build the "}
                <Text style={gradientTextFlashyStylesInv(theme)}>{"app"}</Text>
                {" you are dreaming about."}
              </Text>
            </IfWindowWidthIs>
            <Spacer size="l" />
          </SpacedView>
          <BlockMe1WithSmallPills />
        </Container>
      </View>
      <BlockPassionated resumeEntry={resumeEntry} />
      <Spacer size="xxxl" />
      <Spacer size="m" />
      <BlockFrontendArchitect />
      <Spacer size="l" />
      <BlockCompaniesTried />
      <Spacer size="xl" />
      <BlockTestimonials />
      <Spacer size="xl" />
      <BlockCompaniesTrust />
    </WebsiteWrapper>
  );
}
