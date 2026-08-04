import BlurView from "@/react-multiversal/BlurView";
import { ReactNode } from "react";
import { ViewProps } from "react-native";

export type BoxShadowGlassProps = {
  borderWidth?: number;
  color?: string;
  colorAlt?: string;
};

export const boxShadowGlass = ({
  borderWidth = 1,
  color = "rgba(255,255,255,0.25)",
  colorAlt = "rgba(255,255,255,0.1)",
}: BoxShadowGlassProps = {}) => [
  {
    inset: true,
    offsetX: borderWidth,
    offsetY: borderWidth,
    color: color,
  },
  {
    inset: true,
    offsetX: -borderWidth,
    offsetY: -borderWidth,
    color: colorAlt,
  },
];

export default function GlassView({
  style,
  children,
  blurAmount = 16,
  borderWidth,
  color,
  colorAlt,
  ...props
}: ViewProps &
  BoxShadowGlassProps & {
    style?: any;
    children?: ReactNode;
    blurAmount?: number;
  }) {
  return (
    <BlurView
      {...props}
      blurAmount={blurAmount}
      style={[
        style,
        {
          boxShadow: [
            ...boxShadowGlass({ borderWidth, color, colorAlt }),
            ...(style?.boxShadow || []),
          ],
        },
      ]}
    >
      {children}
    </BlurView>
  );
}
