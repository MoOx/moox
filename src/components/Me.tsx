import Image from "next/image";
import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "@/app/styles";
import GradientBorderCircle from "@/components/GradientBorderCircle";
import { GradientRadial } from "@/react-multiversal/GradientRadial";

export default function Me({
  src = "/max-1.png",
  imgWidth = 512 / 2,
  imgHeight = 835 / 2,
  style,
  children,
}: {
  src?: string;
  imgWidth?: number;
  imgHeight?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 450,
          maxWidth: 450,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View>
        <View
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            bottom: -40,
            left: -80,
          }}
        >
          <GradientBorderCircle
            width={300}
            borderWidth={1}
            stops={[
              {
                offset: 0,
                stopColor: theme.dynamicColors.textLight2,
                stopOpacity: "0.3",
              },
              {
                offset: 80,
                stopColor: theme.dynamicColors.textLight1,
                stopOpacity: "0",
              },
            ]}
            style={{
              margin: (360 - 280) / 2,
              position: "absolute",
              transform: [
                { translateX: 40 },
                { translateY: -10 },
                { rotate: "130deg" },
              ],
            }}
          />
          <GradientBorderCircle
            width={420}
            borderWidth={1}
            stops={[
              {
                offset: 0,
                stopColor: theme.dynamicColors.textLight2,
                stopOpacity: "0.4",
              },
              {
                offset: 80,
                stopColor: theme.dynamicColors.textLight1,
                stopOpacity: "0",
              },
            ]}
            style={{
              position: "absolute",
              transform: [{ rotate: "-70deg" }],
            }}
          />
          <GradientRadial
            width={400}
            height={400}
            stops={[
              {
                offset: 0,
                stopColor: theme.colors.backMain,
                stopOpacity: "0.5",
              },
              {
                offset: 100,
                stopColor: theme.colors.backMain,
                stopOpacity: "0",
              },
            ]}
            style={{ position: "absolute", left: -10, bottom: -0 }}
          />
        </View>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .userColorScheme-auto,
                .userColorScheme-light {
                  --maxMeBrightness: 110%
                }
                .userColorScheme-dark {
                  --maxMeBrightness: 90%
                }
                @media (prefers-color-scheme: dark) {
                  .userColorScheme-auto {
                    --maxMeBrightness: 90%
                  }
                }
                `,
          }}
        />
        <Image
          src={src}
          alt="Picture of the Max"
          width={imgWidth}
          height={imgHeight}
          style={{
            // zIndex: 1,
            // mixBlendMode: "luminosity",
            filter: "brightness(var(--maxMeBrightness))",
          }}
        />
      </View>
      {children}
    </View>
  );
}
