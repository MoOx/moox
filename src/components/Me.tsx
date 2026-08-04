import GradientBorderCircle from "@/components/GradientBorderCircle";
import Image from "@/components/Image";
import { GradientRadial } from "@/react-multiversal/GradientRadial";
import { useTheme } from "@/styles";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

const DEFAULT_WIDTH = 450;

export default function Me({
  src = "/max-1.png",
  width = DEFAULT_WIDTH,
  imgWidth,
  imgHeight,
  style,
  children,
}: {
  src?: string;
  /** Overall width of the component; everything inside scales proportionally. */
  width?: number;
  imgWidth?: number;
  imgHeight?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const theme = useTheme();
  const scale = width / DEFAULT_WIDTH;
  const resolvedImgWidth = (imgWidth ?? (512 / 2) * scale).toFixed(3);
  const resolvedImgHeight = (imgHeight ?? (835 / 2) * scale).toFixed(3);
  return (
    <View
      style={[
        {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: width,
          maxWidth: width,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View
        style={{
          position: "absolute",
          // width: 420 * scale,
          // height: 420 * scale,
          inset: 0,
          width: "100%",
          height: "100%",
          // top: -40 * scale,
          // right: -40 * scale,
          // bottom: -40 * scale,
          // left: -80 * scale,
        }}
      >
        <GradientBorderCircle
          width={300 * scale}
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
            margin: ((360 - 280) / 2) * scale,
            position: "absolute",
            transform: [
              { translateX: 40 * scale },
              { translateY: -10 * scale },
              { rotate: "130deg" },
            ],
          }}
        />
        <GradientBorderCircle
          width={420 * scale}
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
          width={400 * scale}
          height={400 * scale}
          stops={[
            {
              offset: 0,
              stopColor: theme.colors.backMain,
              stopOpacity: "0.25",
            },
            {
              offset: 100,
              stopColor: theme.colors.backMain,
              stopOpacity: "0",
            },
          ]}
          style={{ position: "absolute", left: -10 * scale, bottom: -0 }}
        />
      </View>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .userColorScheme-auto,
                .userColorScheme-light {
                  --maxMeBrightness: 105%
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
        priority={true}
        src={src}
        alt="Picture of the Max"
        width={resolvedImgWidth}
        height={resolvedImgHeight}
        style={{ filter: "brightness(var(--maxMeBrightness))" }}
      />
      {children}
    </View>
  );
}
