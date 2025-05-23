import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { gradientTextIndigoStylesInv, useTheme } from "@/app/styles";
import IconReact from "@/components/IconReact";
import IconReactNative from "@/components/IconReactNative";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGActivityBike from "@/svgs/components/SVGActivityBike";
import SVGActivityBricolage from "@/svgs/components/SVGActivityBricolage";
import SVGActivityCrossfit from "@/svgs/components/SVGActivityCrossfit";
import SVGActivityDj from "@/svgs/components/SVGActivityDj";
import SVGActivityPekinExpress from "@/svgs/components/SVGActivityPekinExpress";
import SVGActivityRun from "@/svgs/components/SVGActivityRun";
import SVGActivityStandup from "@/svgs/components/SVGActivityStandup";
import SVGCss from "@/svgs/components/SVGCss";
import SVGExpo from "@/svgs/components/SVGExpo";
import SVGGraphql from "@/svgs/components/SVGGraphql";
import SVGJavaScript from "@/svgs/components/SVGJavaScript";
import SVGMicrophone from "@/svgs/components/SVGMicrophone";
import SVGNextjs from "@/svgs/components/SVGNextjs";
import SVGSketch from "@/svgs/components/SVGSketch";
import SVGTraining from "@/svgs/components/SVGTraining";
import SVGTypescript from "@/svgs/components/SVGTypescript";

const styles = StyleSheet.create({
  iconText: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  activities: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default function ResumeIntro() {
  const theme = useTheme();

  return (
    <Container maxWidth={900} wrapperStyle={theme.styles.back}>
      <SpacedView vertical="xl" horizontal="l">
        <Text
          style={[
            fontStyles.iosEm.largeTitle,
            gradientTextIndigoStylesInv(theme),
            // { alignSelf: "center" },
          ]}
        >
          {"About Me"}
        </Text>
        <SpacedView
          // vertical="l"
          gap="xl"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SpacedView
            style={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 300,
            }}
          >
            <Spacer size="l" />
            <Text style={[fontStyles.ios.callout, theme.styles.text]}>
              {
                "I am Maxime Thirouin, also known as MoOx on the web. I live near Toulouse, France. I am a software engineer specialized in front-end development of mobile & web applications. I love to design and develop UIs. I care about UX, responsiveness, performance, maintainability and scalability."
              }
              {"\n"}
              {
                "When I am not coding, I like spend my time with my life partner and friends, doing sports, mixing electronic music or doing some more fun stuff."
              }
            </Text>
          </SpacedView>

          <View
            style={{
              alignItems: "center",
              flexBasis: 200,
            }}
          >
            <Text style={[fontStyles.iosEm.callout, theme.styles.textLight1]}>
              {"Multiverse"}
            </Text>
            <SpacedView gap="xs" style={styles.activities}>
              {[
                { Icon: SVGActivityCrossfit, text: "Crossfit" },
                { Icon: SVGActivityRun, text: "Running" },
                { Icon: SVGActivityBike, text: "Bike" },
                { Icon: SVGActivityDj, text: "DJ" },
                { Icon: SVGActivityBricolage, text: "Bricolage" },
                { Icon: SVGActivityStandup, text: "Standup" },
                { Icon: SVGMicrophone, text: "Podcast" },
                { Icon: SVGTraining, text: "Teaching" },
                { Icon: SVGActivityPekinExpress, text: "Pekin Express #20" },
              ].map(({ Icon, text }) => (
                <SpacedView key={text} horizontal="xxs" vertical="xs">
                  <Icon fill="#666" width={42} height={42} />
                  <Text
                    style={[
                      fontStyles.ios.caption2,
                      { lineHeight: fontStyles.ios.caption2.fontSize },
                      theme.styles.textLight1,
                      styles.iconText,
                    ]}
                  >
                    {text}
                  </Text>
                </SpacedView>
              ))}
            </SpacedView>
          </View>
          <View
            style={{
              alignItems: "center",
              flexBasis: 200,
            }}
          >
            <Text style={[fontStyles.iosEm.callout, theme.styles.textLight1]}>
              {"Toolbox"}
            </Text>
            <SpacedView gap="xs" style={styles.activities}>
              {[
                { Icon: SVGJavaScript, text: "JavaScript" },
                { Icon: SVGTypescript, text: "TypeScript" },
                { Icon: SVGCss, text: "CSS" },
                { Icon: IconReact, text: "React" },
                { Icon: IconReactNative, text: "Native" },
                { Icon: SVGGraphql, text: "Graphql" },
                { Icon: SVGNextjs, text: "Next.js" },
                { Icon: SVGExpo, text: "Expo" },
                { Icon: SVGSketch, text: "Sketch" },
              ].map(({ Icon, text }) => (
                <SpacedView key={text} horizontal="xs" vertical="xs">
                  <Icon width={42} height={42} />
                  <Text
                    style={[
                      fontStyles.ios.caption2,
                      { lineHeight: fontStyles.ios.caption2.fontSize },
                      theme.styles.textLight1,
                      styles.iconText,
                    ]}
                  >
                    {text}
                  </Text>
                </SpacedView>
              ))}
            </SpacedView>
          </View>
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
