import * as React from "react";
import { Text, View } from "react-native";

import {
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
  gradientTextStyles,
  useTheme,
} from "@/app/styles";
import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextForReader from "@/react-multiversal/TextForReader";

export default function BlockHey() {
  const theme = useTheme();
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
            <View
              style={{ alignSelf: "flex-start" }}
              role="heading"
              aria-level={1}
            >
              <Text style={[fontStyles.ios.headline, theme.styles.textLight2]}>
                {"A Web & Mobile"}
              </Text>
              <IfWindowWidthIs largerThan={WindowWidth.m}>
                <React.unstable_ViewTransition name="text--front-end-developer">
                  <Text
                    style={[
                      fontStyles.iosEm.largeTitle,
                      theme.styles.text,
                      gradientTextFlashyStyles(theme, 176),
                      { fontWeight: weight.black },
                    ]}
                  >
                    {"Front-End Developer."}
                  </Text>
                </React.unstable_ViewTransition>
              </IfWindowWidthIs>
              <IfWindowWidthIs smallerThan={WindowWidth.m}>
                <React.unstable_ViewTransition name="text--front-end-developer-m">
                  <Text
                    style={[
                      fontStyles.iosEm.largeTitle,
                      theme.styles.text,
                      gradientTextFlashyStyles(theme, 0),
                      { fontWeight: weight.black },
                    ]}
                  >
                    {"Front-End Developer."}
                  </Text>
                </React.unstable_ViewTransition>
              </IfWindowWidthIs>
              <Text
                style={[
                  fontStyles.ios.headline,
                  theme.styles.textLight2,
                  {
                    fontWeight: weight.regular,
                    fontStyle: "italic",
                    textAlign: "right",
                  },
                ]}
              >
                {"Augmented with AI."}
              </Text>
            </View>
            <Text
              role="paragraph"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text style={[fontStyles.ios.headline, theme.styles.textLight2]}>
                {"Hey,"}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"I'm "}
                <React.unstable_ViewTransition name="text--max">
                  <Text style={gradientTextFlashyStyles(theme, -16)}>
                    {"Max."}
                  </Text>
                </React.unstable_ViewTransition>
              </Text>
            </Text>
          </View>
          <View>
            <Spacer size="xxl" />
            <Text
              style={[
                theme.styles.text,
                gradientTextStyles(theme, 180),
                {
                  fontSize: 64,
                  lineHeight: 64,
                  fontWeight: weight.bold,
                },
              ]}
              role="paragraph"
            >
              <TextForReader>
                {
                  "Hey, I am Max. I am a Front-End Developer crafting apps and websites. I am available as freelance.\n"
                }
              </TextForReader>
              {"I build "}
              <Text style={gradientTextFlashyStylesInv(theme, -4)}>
                {"apps."}
              </Text>
            </Text>
            <Spacer size="xl" />
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              <Spacer size="xxxl" />
            </IfWindowWidthIs>
          </View>
        </SpacedView>
        <BlockMe1WithSmallPills />
      </Container>
    </View>
  );
}
