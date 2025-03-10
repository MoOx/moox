import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { gradientTextIndigoStylesInv, useTheme } from "@/app/styles";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGActivityBike from "@/svgs/components/SVGActivityBike";
import SVGActivityCrossfit from "@/svgs/components/SVGActivityCrossfit";
import SVGActivityDiy from "@/svgs/components/SVGActivityDiy";
import SVGActivityRunning from "@/svgs/components/SVGActivityRunning";
import SVGApps from "@/svgs/components/SVGApps";
import SVGDevices from "@/svgs/components/SVGDevices";
import SVGDevTypescript from "@/svgs/components/SVGDevTypescript";
import SVGGraphql from "@/svgs/components/SVGGraphql";
import SVGMicrophone from "@/svgs/components/SVGMicrophone";
import SVGReact from "@/svgs/components/SVGReact";
import SVGSketch from "@/svgs/components/SVGSketch";
import SVGTraining from "@/svgs/components/SVGTraining";

const styles = StyleSheet.create({
  textStrong: {
    fontSize: 32,
    fontWeight: "800",
  },
  textLight: {
    fontSize: 28,
    fontWeight: "200",
  },
  nanoTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#bbc",
  },
  iconText: {
    position: "absolute",
    top: 64,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "300",
    color: "#bbc",
  },
  activities: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

const grayIconDomStyle = {
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  filter: "grayscale(1) brightness(0.9) contrast(0.6) opacity(0.6)",
} as ViewStyle;

export default function ResumeIntro() {
  const theme = useTheme();

  return (
    <Container maxWidth={900} wrapperStyle={theme.styles.back}>
      <SpacedView vertical="xl">
        <SpacedView horizontal="l">
          <Text
            style={[
              fontStyles.iosEm.largeTitle,
              gradientTextIndigoStylesInv(theme),
              { alignSelf: "center" },
            ]}
          >
            {"About Me"}
          </Text>
        </SpacedView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SpacedView
            horizontal="l"
            vertical="l"
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              minWidth: 240,
              maxWidth: 310,
            }}
          >
            <Text style={styles.nanoTitle}>THINGS I WORK WITH</Text>
            <View style={styles.activities}>
              {[
                { Icon: SVGReact, text: "React" },
                { Icon: SVGDevTypescript, text: "TypeScript" },
                { Icon: SVGSketch, text: "Sketch" },
                { Icon: SVGApps, text: "Mobile" },
                { Icon: SVGGraphql, text: "Graphql" },
                { Icon: SVGDevices, text: "Cross-platform" },
              ].map(({ Icon, text }) => (
                <SpacedView key={text} horizontal="xs" vertical="s">
                  <View style={grayIconDomStyle}>
                    <Icon fill="#bbb" width={48} height={48} />
                  </View>
                  <Text style={styles.iconText}>{text}</Text>
                </SpacedView>
              ))}
            </View>
          </SpacedView>
          <SpacedView
            horizontal="l"
            vertical="l"
            style={{
              justifyContent: "center",
              flex: 1,
              flexBasis: 240,
            }}
          >
            <Text style={[fontStyles.ios.body, theme.styles.text]}>
              Hi, I am Maxime Thirouin, also known as MoOx on the web. I live
              near Toulouse, France. I am a software engineer specialized in
              front-end development of mobile & web applications. I love to
              design and develop UIs. I care about UX, responsiveness,
              performance, maintainability and scalability.
            </Text>
          </SpacedView>
          <SpacedView
            horizontal="l"
            vertical="l"
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              minWidth: 240,
              maxWidth: 310,
            }}
          >
            <Text style={styles.nanoTitle}>THINGS I LIKE TO DO</Text>
            <View style={styles.activities}>
              {[
                { Icon: SVGActivityCrossfit, text: "Crossfit" },
                { Icon: SVGActivityDiy, text: "Bricolage" },
                { Icon: SVGActivityBike, text: "Bike" },
                { Icon: SVGActivityRunning, text: "Running" },
                { Icon: SVGMicrophone, text: "Podcast" },
                { Icon: SVGTraining, text: "Teaching" },
              ].map(({ Icon, text }) => (
                <SpacedView key={text} horizontal="xs" vertical="s">
                  <View style={grayIconDomStyle}>
                    <Icon fill="#bbb" width={48} height={48} />
                  </View>
                  <Text style={styles.iconText}>{text}</Text>
                </SpacedView>
              ))}
            </View>
          </SpacedView>
        </View>
      </SpacedView>
    </Container>
  );
}
