"use client";

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ResumeItem } from "@/api";
import { useTheme } from "@/app/styles";
import { gradientStaticIndigoStyles } from "@/app/styles";
import BlockMaxApp from "@/components/BlockMaxApp";
import { size, useWindowWidth, WindowWidth } from "@/react-multiversal";
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
  const windowWidth = useWindowWidth();

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
          springOptions={{ damping: 30, mass: 1, stiffness: 150, velocity: 0 }}
          staticTransforms={[{ perspective: 800 }]}
          transforms={[
            { translateY: windowWidth > WindowWidth.m ? -600 : -420 },
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
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
            >
              {"Passionated Developer."}
            </Text>
            <Text
              style={[
                fontStyles.iosEm.body,
                theme.styles.textOnMain,
                { opacity: 0.6 },
              ]}
            >
              {`I made my first website in 1998, and fell in love with web development. Since then, I never stopped to learn things.
From Dreamweaver to VS Code, years passed, but not my appetite to always discover new tools and technics to made even more cool and performant interfaces.`}
            </Text>
            <IfWindowWidthIs largerThan={WindowWidth.m}>
              <Spacer size="xxl" />
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
