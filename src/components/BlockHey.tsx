import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import TextForReader from "@/react-multiversal/TextForReader";
import {
  gradientTextFlashyStyles,
  gradientTextFlashyStylesInv,
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
              <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
                {"A Web & Mobile"}
              </Text>
              <IfWindowWidthIs largerThan={WindowWidth.m}>
                <Text
                  style={[
                    fontStyles.iosEm.largeTitle,
                    theme.styles.text,
                    gradientTextFlashyStyles(theme, 176),
                    {
                      fontWeight: weight.black,
                      viewTransitionName: "text--front-end-developer",
                    },
                  ]}
                >
                  {"Front-End Developer."}
                </Text>
              </IfWindowWidthIs>
              <IfWindowWidthIs smallerThan={WindowWidth.m}>
                <Text
                  style={[
                    fontStyles.iosEm.largeTitle,
                    theme.styles.text,
                    gradientTextFlashyStyles(theme, 0),
                    {
                      fontWeight: weight.black,
                      viewTransitionName: "text--front-end-developer-m",
                    },
                  ]}
                >
                  {"Front-End Developer."}
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
                {"Augmented with AI."}
              </Text>
            </View>
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
