"use client";

import * as React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { ResumeItem } from "@/api";
import { useTheme } from "@/app/styles";
import { gradientStaticIndigoStyles } from "@/app/styles";
import BlockMaxApp from "@/components/BlockMaxApp";
import { size } from "@/react-multiversal";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

const skew = [{ skewY: "1deg" }, { scaleY: 1.1 }];
const revertSkew = [{ scaleY: 1 / 1.1 }, { skewY: "-1deg" }];

export default function BlockPassionated({
  resumeEntry,
}: {
  resumeEntry?: ResumeItem;
}) {
  const theme = useTheme();
  const deviceWidth = 360;
  // const deviceRatio = 1;
  const windowWidth = useWindowDimensions().width;

  const device = (
    <View
      style={{
        maxHeight: 320,
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
            <View>
              <Text
                style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
                role="heading"
                aria-level={2}
              >
                {"You dream it."}
              </Text>
              <Text
                style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
              >
                {"I craft it."}
              </Text>
            </View>
            <Text
              style={[
                fontStyles.iosEm.body,
                theme.styles.textOnMain,
                { opacity: 0.6 },
              ]}
              role="paragraph"
            >
              {`I have the knowledge and skills to build the app you are dreaming about. My years of experience and my passion for building apps make me the perfect partner to help you bring your ideas to life.`}
            </Text>
            <Spacer size="m" />
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              <Spacer size="xl" />
            </IfWindowWidthIs>
          </SpacedView>
          <IfWindowWidthIs smallerThan={WindowWidth.m}>
            {device}
          </IfWindowWidthIs>
        </Container>
      </View>
    </View>
  );
}
