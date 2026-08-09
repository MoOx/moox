import { useHref, useT } from "@/i18n";
import Image from "@/components/Image";
import LinkButton from "@/components/LinkButton";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { gradientFlashyStops, useTheme } from "@/styles";
import { StyleSheet, Text, View } from "react-native";

const skew = [{ skewY: "1deg" }, { scaleY: 1.1 }];

export default function BlockPassionated() {
  const localizeHref = useHref();
  const t = useT();
  const theme = useTheme();
  return (
    <View>
      <GradientLinear
        stops={gradientFlashyStops(theme)}
        angle={190}
        style={[StyleSheet.absoluteFill, { transform: skew }]}
      />
      <Container
        role="region"
        aria-label={t({ en: "Passionated and Curious", fr: "Passionné et curieux" })}
        style={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        <SpacedView
          horizontal="xl"
          gap="m"
          // vertical="xxl"
          style={{ maxWidth: 1024 * 0.5, flexShrink: 1 }}
        >
          <Spacer size="xxl" />
          <Text
            style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
            role="heading"
            aria-level={2}
          >
            {t({ en: "Passionated and Curious.", fr: "Passionné et curieux." })}
          </Text>
          <Text
            style={[fontStyles.iosEm.body, theme.styles.textOnMain, { opacity: 0.6 }]}
            role="paragraph"
          >
            {t({
              en: `I made my first website in 1998, and fell in love with web development. Since then, I never stopped to learn things, especially now with the rise of AI.
From Dreamweaver to Cursor, years passed, but not my appetite to always discover new tools and technics to made even more cool and performant interfaces.`,
              fr: `J'ai fait mon premier site web en 1998 et je suis tombé amoureux du développement web. Depuis, je n'ai jamais cessé d'apprendre, encore moins avec l'essor de l'IA.
De Dreamweaver à Cursor, les années ont passé, mais pas mon appétit pour de nouveaux outils et de nouvelles techniques, au service d'interfaces toujours plus chouettes et plus rapides.`,
            })}
          </Text>
          <LinkButton
            href={localizeHref("/resume/")}
            color={theme.dynamicColors.back}
            textColor={theme.dynamicColors.text}
            spaceHorizontal="m"
            style={{ alignSelf: "flex-start" }}
          >
            <SpacedView horizontal="m">
              <Text style={fontStyles.iosEm.callout}>
                {t({ en: "Discover my story", fr: "Découvrir mon parcours" })}
              </Text>
            </SpacedView>
          </LinkButton>
        </SpacedView>
        <View>
          <Parallax
            staticTransforms={[{ perspective: 800 }, { scale: 0.8 }]}
            transforms={[{ rotateY: "-20deg" }, { rotateX: "20deg" }]}
            style={{
              filter: "drop-shadow(4px 6px 10px rgba(0, 0, 0, 0.4))",
            }}
          >
            <View
              style={{
                padding: 16,
                paddingTop: 32,
                paddingBottom: 64,
                flexGrow: 0,
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 4,
                    overflow: "hidden",
                  },
                ]}
              >
                <Parallax
                  staticTransforms={[{ scale: 1.6 }]}
                  transforms={[{ rotate: "-180deg" }]}
                  style={[StyleSheet.absoluteFill, { transformOrigin: "50% 50%" }]}
                  contentStyle={StyleSheet.absoluteFill}
                >
                  <GradientLinear
                    stops={[
                      { stopColor: "#f0f0cf", offset: 0 },
                      { stopColor: "#ffffff", offset: 30 },
                      { stopColor: "#ffffff", offset: 60 },
                      { stopColor: "#e0e0d8", offset: 100 },
                    ]}
                    angle={10}
                  />
                </Parallax>
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 10,
                  height: 42,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(0, 0, 0, 0.01)",
                  filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.02))",
                  overflow: "hidden",
                  boxShadow: "inset 0 0 16px rgba(255,255,255, 0.2)",
                }}
              >
                <SpacedView horizontal="xxs" vertical="xxs">
                  <Text
                    style={[
                      fontStyles.ios.caption1,
                      theme.styles.text,
                      {
                        fontFamily: "Comic Sans MS, Chalkboard SE",
                        opacity: 0.5,
                      },
                    ]}
                  >
                    {t({
                      en: "Max about to discover Comic Sans",
                      fr: "Max sur le point de découvrir Comic Sans",
                    })}
                  </Text>
                  <Text
                    style={[
                      fontStyles.ios.caption2,
                      theme.styles.text,
                      {
                        fontFamily: "Comic Sans MS, Chalkboard SE",
                        fontStyle: "italic",
                        textAlign: "right",
                        opacity: 0.25,
                      },
                    ]}
                  >
                    {t({ en: "Feb. 1996", fr: "févr. 1996" })}
                  </Text>
                </SpacedView>
              </View>
              <Image
                src="/max-kid.jpg"
                alt=""
                width={1024 / 4}
                height={1079 / 4}
                style={{
                  zIndex: 1,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(0, 0, 0, 0.25)",
                  filter: "contrast(130%) grayscale(25%)",
                }}
              />
              <Text
                style={[
                  fontStyles.ios.caption2,
                  theme.styles.textOnMain,
                  {
                    zIndex: 3,
                    position: "absolute",
                    left: 24,
                    top: 36,
                    textShadow: "0 0 2px rgba(0,0,0, 0.5)",
                    opacity: 0.8,
                  },
                ]}
              >
                {t({ en: "Not AI generated.", fr: "Pas généré par IA." })}
              </Text>
              <Text
                style={[
                  fontStyles.ios.caption2,
                  theme.styles.textOnMain,
                  {
                    zIndex: 3,
                    position: "absolute",
                    left: 24,
                    bottom: 72,
                    textShadow: "0 0 2px rgba(0,0,0, 0.5)",
                    opacity: 0.4,
                  },
                ]}
              >
                {t({ en: "Original photo.", fr: "Photo d'époque." })}
              </Text>
              <View
                // @ts-ignore
                style={{
                  zIndex: 2,
                  position: "absolute",
                  left: 16,
                  right: 16,
                  top: 32,
                  bottom: 64,
                  overflow: "hidden",
                  mixBlendMode: "plus-lighter",
                }}
              >
                <Parallax
                  transforms={[{ rotate: "-200deg" }]}
                  style={[StyleSheet.absoluteFill, { transformOrigin: "50% 50%" }]}
                  contentStyle={StyleSheet.absoluteFill}
                >
                  <GradientLinear
                    style={[StyleSheet.absoluteFill, { scale: 1.4 }]}
                    stops={[
                      { stopColor: "#fff", offset: 0, stopOpacity: "0.0" },
                      { stopColor: "#fff", offset: 25, stopOpacity: "0.05" },
                      { stopColor: "#fff", offset: 45, stopOpacity: "0.35" },
                      { stopColor: "#fff", offset: 65, stopOpacity: "0.05" },
                      { stopColor: "#fff", offset: 100, stopOpacity: "0.0" },
                    ]}
                    angle={8}
                  />
                </Parallax>
              </View>
            </View>
          </Parallax>
        </View>
      </Container>
    </View>
  );
}
