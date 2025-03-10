"use client";

import Image from "next/image";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/app/styles";
import Avatar from "@/react-multiversal/Avatar";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SVGFlashyTriangle3 from "@/svgs/components/SVGFlashyTriangle3";

export default function WebsiteFooterLandscape() {
  const theme = useTheme();
  const skySize = 400;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, overflow: "hidden" }}>
        <GradientLinear
          stops={[
            { offset: 0, stopColor: "#01093C" },
            { offset: 100, stopColor: "#060C4E" },
          ]}
          style={StyleSheet.absoluteFill}
        />
        <div
          style={{
            ...StyleSheet.absoluteFillObject,
            background: "url(/_/stars.png) repeat 0% 0% / 400px 300px",
          }}
        />
        {/* Sky Gradient */}
        <View
          style={{
            height: skySize,
            backgroundImage: `radial-gradient(ellipse at 50% 100%, ${
              theme.dynamicColors.gradientLandscape1
            } 0%, ${theme.dynamicColors.gradientLandscape2} 50%, ${
              theme.dynamicColors.gradientLandscape3
            } 100%)`,
          }}
        />
        {/* Sun */}
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            height: skySize + 120,
          }}
        >
          <Image src="/_/landscape-sun.svg" alt="" width={500} height={500} />
        </View>
        {/* Floor */}
        <View
          style={{
            height: 140,
            backgroundColor: "#01093C",
            backgroundImage: "url(/_/landscape-floor.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 0%",
            backgroundSize: "cover",
          }}
        />
        {/* Mountains */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            height: skySize + 40,
          }}
        >
          <Image
            src="/_/landscape-mountains.svg"
            alt=""
            width={623}
            height={180}
          />
        </View>
        {/* Tree */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: "75%",
            right: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            height: skySize + 80,
          }}
        >
          <Image src="/_/landscape-tree.svg" alt="" width={168} height={160} />
        </View>
      </View>

      {/* Max */}
      <View
        style={{ position: "absolute", top: -40, left: "10%", right: "50%" }}
      >
        <Image
          src="/_/paintbrush-fast-turquoise.svg"
          alt=""
          width={409 / 2}
          height={96 / 2}
          style={{ position: "absolute", top: 80, left: -20 }}
        />
        <SVGFlashyTriangle3
          style={{ position: "absolute", top: 10, left: 0 }}
          width={150}
          height={150}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 28,
            borderRadius: 100,
          }}
        >
          <Avatar size={88} />
        </View>
      </View>
    </View>
  );
}
