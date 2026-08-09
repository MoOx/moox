import { useT } from "@/i18n";
import { useHref } from "@/i18n";
import { ResumeItem } from "@/api";
import BlockMaxApp from "@/components/BlockMaxApp";
import LinkButton from "@/components/LinkButton";
import { summary, taglineParts } from "@/profile";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { gradientStaticIndigoStyles, useTheme } from "@/styles";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const skew = [{ skewY: "1deg" }, { scaleY: 1.1 }];
const revertSkew = [{ scaleY: 1 / 1.1 }, { skewY: "-1deg" }];

export default function BlockBuilder({ resumeEntry }: { resumeEntry?: ResumeItem }) {
  const localizeHref = useHref();
  const theme = useTheme();
  const t = useT();
  const deviceWidth = 360;
  // const deviceRatio = 1;
  const windowWidth = useWindowDimensions().width;

  const device = (
    <View
      style={{
        maxHeight: 340,
        maskImage: `url(/mask-gradient-noize.png)`,
        maskSize: "contain",
        maskPosition: "bottom",
        maskRepeat: "repeat-x",
        paddingHorizontal: size("l"),
        paddingTop: size("xl"),
      }}
    >
      <View style={{ transform: revertSkew }}>
        <Parallax
          springOptions={{ mass: 4, damping: 100, stiffness: 100 }}
          staticTransforms={[{ perspective: 800 }]}
          transforms={[
            { translateY: windowWidth > WindowWidth.m ? -640 : -500 },
            { scale: -0.4 },
            { rotateX: "20deg" },
            { skewX: "2deg" },
            { skewY: "1deg" },
          ]}
        >
          <BlockMaxApp resumeEntry={resumeEntry} width={deviceWidth} />
        </Parallax>
      </View>
    </View>
  );

  return (
    <View style={{ zIndex: 1 }}>
      <View
        style={{
          overflow: "hidden",
          transform: skew,
        }}
      >
        <GradientLinear
          stops={gradientStaticIndigoStyles}
          angle={190}
          style={StyleSheet.absoluteFill}
        />
        <Container
          role="region"
          aria-label={t({ en: "Pitch", fr: "Pitch" })}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            {device}
            <Spacer />
          </IfWindowWidthIs>
          <SpacedView
            horizontal="xl"
            gap="m"
            // vertical="xxl"
            style={{
              paddingTop: size("xxl"),
              pointerEvents: "auto",
              flexBasis: 1024 / 2,
              flexShrink: 1,
              transform: revertSkew,
            }}
          >
            {/* The CV's tagline + summary, single source in profile.tsx -
                this indigo band is the home's main pitch. */}
            <View role="heading" aria-level={2}>
              {t(taglineParts).map((part) => (
                <Text key={part} style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}>
                  {part}
                </Text>
              ))}
            </View>
            <Text
              style={[fontStyles.iosEm.body, theme.styles.textOnMain, { opacity: 0.6 }]}
              role="paragraph"
            >
              {t(summary)}
            </Text>
            <LinkButton
              href={localizeHref("/resume/")}
              color={theme.dynamicColors.back}
              textColor={theme.dynamicColors.text}
              spaceHorizontal="m"
              style={{ alignSelf: "flex-end" }}
            >
              <SpacedView horizontal="m">
                <Text style={fontStyles.iosEm.callout}>
                  {t({ en: "More about me", fr: "En savoir plus sur moi" })}
                </Text>
              </SpacedView>
            </LinkButton>
            <Spacer size="m" />
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              <Spacer size="xs" />
            </IfWindowWidthIs>
          </SpacedView>
          <IfWindowWidthIs smallerThan={WindowWidth.m}>{device}</IfWindowWidthIs>
        </Container>
      </View>
    </View>
  );
}
