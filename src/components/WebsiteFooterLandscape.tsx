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
        <View style={{ height: skySize }} />
        <Parallax
          // Radial Sun Gradient
          springOptions={{ mass: 1, damping: 50, stiffness: 50 }}
          staticTransforms={[{ scaleX: 2 }]}
          transforms={[{ translateX: 40 }, { translateY: 40 }]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: skySize,
          }}
          contentStyle={[
            StyleSheet.absoluteFill,
            { transformOrigin: "bottom center" },
          ]}
        >
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundImage: `radial-gradient(
                  farthest-side at 50% 100%,
                  ${theme.dynamicColors.gradientLandscape1} 0%,
                  ${theme.dynamicColors.gradientLandscape2} 50%,
                  ${theme.dynamicColors.gradientLandscape3} 100%)`,
              },
            ]}
          />
        </Parallax>
        <Parallax
          // Horizontal Sky Gradient
          springOptions={{ mass: 1, damping: 100, stiffness: 50 }}
          transforms={[{ translateY: 100 }]}
          style={StyleSheet.absoluteFill}
          contentStyle={[
            StyleSheet.absoluteFill,
            {
              backgroundImage: `linear-gradient(to top, ${
                theme.dynamicColors.gradientLandscape1
              } 20%, ${theme.dynamicColors.gradientLandscape2} 50%, ${
                theme.dynamicColors.gradientLandscape3
              } 80%)`,
            },
          ]}
        />
        <Parallax
          // Sun
          springOptions={{ mass: 1, damping: 50, stiffness: 50 }}
          transforms={[
            { translateX: 40 },
            { translateY: 40 },
            { scale: -0.25 },
          ]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: skySize,
          }}
          contentStyle={{
            ...StyleSheet.absoluteFillObject,
            alignItems: "center",
            justifyContent: "flex-end",
            transformOrigin: "bottom center",
          }}
        >
          <Image
            src="/_/landscape-sun.svg"
            alt=""
            width={360}
            height={360}
            style={{ transform: "translateY(100px)" }}
          />
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
            opacity: 0.9,
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
            width={Math.round(622 * 0.85)}
            height={Math.round(180 * 0.85)}
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
          width={Math.round(409 / 2)}
          height={Math.round(96 / 2)}
          style={{
            position: "absolute",
            top: 80,
            left: -20,
          }}
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
