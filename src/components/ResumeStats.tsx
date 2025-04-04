import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  gradientStaticIndigoStyles,
  themeDark,
  themeLight,
} from "@/app/styles";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

const currentYear = new Date().getFullYear();

export default function ResumeStats() {
  // const theme = useTheme();
  return (
    <SpacedView vertical="xl">
      <GradientLinear
        style={[StyleSheet.absoluteFill, { transform: [{ skewY: "1deg" }] }]}
        stops={gradientStaticIndigoStyles}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <SpacedView vertical="s">
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 49,
                lineHeight: 50,
                fontWeight: "700",
              },
            ]}
          >
            {"@MoOx"}
          </Text>
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 26,
                lineHeight: 26,
                fontWeight: "200",
              },
            ]}
          >
            Maxime Thirouin
          </Text>
        </SpacedView>
        <Spacer />
        <SpacedView horizontal="m" vertical="l">
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 18,
                lineHeight: 18,
                fontWeight: "100",
              },
            ]}
          >
            French
          </Text>
          <Text style={{ textAlign: "center" }}>
            <Text
              style={[
                themeDark.styles.text,
                {
                  fontSize: 56,
                  lineHeight: 56,
                  fontWeight: "100",
                },
              ]}
            >
              {currentYear - 1985}
            </Text>
            <Text
              style={[
                themeDark.styles.text,
                {
                  fontSize: 18,
                  lineHeight: 18,
                  fontWeight: "900",
                },
              ]}
            >
              {" "}
              yo{" "}
            </Text>
          </Text>
        </SpacedView>
        <SpacedView horizontal="m" vertical="l">
          <Text style={themeDark.styles.text}>First website</Text>
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 76,
                lineHeight: 76,
                fontWeight: "400",
              },
            ]}
          >
            {currentYear - 1999}
          </Text>
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 18,
                lineHeight: 18,
                fontWeight: "100",
              },
            ]}
          >
            years ago
          </Text>
        </SpacedView>
        <SpacedView horizontal="m" vertical="l">
          <SpacedView
            horizontal="m"
            vertical="m"
            style={[
              themeLight.styles.back,
              {
                borderRadius: 4,
                alignItems: "center",
              },
            ]}
          >
            <Text style={[themeLight.styles.text, { fontSize: 18 }]}>
              First mobile
            </Text>
            <Text style={[themeLight.styles.text, { fontSize: 24 }]}>
              web app
            </Text>
            <Text
              style={[
                themeLight.styles.textMainDark,
                {
                  fontSize: 76,
                  lineHeight: 76,
                  fontWeight: "800",
                },
              ]}
            >
              {currentYear - 2005}
            </Text>
            <Text
              style={[
                themeLight.styles.text,
                {
                  fontSize: 22,
                  lineHeight: 22,
                  fontWeight: "100",
                },
              ]}
            >
              {" "}
              years ago
            </Text>
          </SpacedView>
        </SpacedView>
        <SpacedView
          horizontal="m"
          vertical="l"
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={[themeDark.styles.text, { fontWeight: "200" }]}>
            Professional for
          </Text>
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 116,
                lineHeight: 116,
                fontWeight: "700",
              },
            ]}
          >
            {currentYear - 2007}
          </Text>
          <Text
            style={[
              themeDark.styles.text,
              {
                fontSize: 54,
                lineHeight: 54,
                fontWeight: "100",
              },
            ]}
          >
            {" "}
            years
          </Text>
        </SpacedView>
      </View>
    </SpacedView>
  );
}
