"use client";

import Image from "next/image";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/app/styles";
import Avatar from "@/react-multiversal/Avatar";
import GradientLinear from "@/react-multiversal/GradientLinear";
import Parallax from "@/react-multiversal/Parallax";
import SVGFlashyTriangle3 from "@/svgs/components/SVGFlashyTriangle3";

export default function WebsiteFooterLandscape({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const skySize = 400;
  const parallaxOffset = 200;

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
        <View style={{ height: skySize }}>
          <Parallax
            transforms={[{ translateY: parallaxOffset }]}
            springOptions={{ mass: 0.25 }}
          >
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                top: -parallaxOffset,
                height: skySize + parallaxOffset,
                backgroundImage: `radial-gradient(farthest-side at 50% 100%, ${
                  theme.dynamicColors.gradientLandscape1
                } 0%, ${theme.dynamicColors.gradientLandscape2} 50%, ${
                  theme.dynamicColors.gradientLandscape3
                } 100%)`,
              }}
            />
          </Parallax>
          <Parallax
            transforms={[{ translateY: parallaxOffset * 1.25 }]}
            springOptions={{ mass: 0.25 }}
          >
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                top: -parallaxOffset,
                height: skySize + parallaxOffset,
                backgroundImage: `linear-gradient(to bottom, ${
                  theme.dynamicColors.gradientLandscape3
                } 50%, ${theme.dynamicColors.gradientLandscape2} 75%, ${
                  theme.dynamicColors.gradientLandscape1
                } 100%)`,
              }}
            />
          </Parallax>
        </View>
        {/* Sun */}
        <Parallax
          transforms={[{ translateY: 60 }, { scale: -0.3 }]}
          springOptions={{ mass: 0.25 }}
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            height: skySize + 40,
          }}
        >
          <Image src="/_/landscape-sun.svg" alt="" width={400} height={400} />
        </Parallax>
        {/* Floor */}
        <View
          style={{
            height: 120,
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
            height: skySize + 30,
          }}
        >
          <Image
            src="/_/landscape-mountains.svg"
            alt=""
            width={623 * 0.85}
            height={180 * 0.85}
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
      <View style={[StyleSheet.absoluteFill]}>{children}</View>
    </View>
  );
}
