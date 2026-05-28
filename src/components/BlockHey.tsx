import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import {
  gradientTextFlashyStyles,
  gradientTextStyles,
  useTheme,
} from "@/styles";
import { Text, View } from "react-native";

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
              <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
                {"A Senior"}
              </Text>
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
                  {"Front-End "}
                  <Text
                    style={[
                      theme.styles.text,
                      gradientTextFlashyStyles(theme, 176),
                    ]}
                  >
                    {"Architect."}
                  </Text>
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
                  {"Front-End "}
                  <Text style={gradientTextFlashyStyles(theme, 176)}>
                    {"Architect."}
                  </Text>
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
                {"React, React Native & cross-platform."}
              </Text>
            </View>
            <Spacer size="l" />
            <Text
              role="paragraph"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
                {"Hey,"}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {"I'm "}
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
