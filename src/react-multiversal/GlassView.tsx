import BlurView from "@/react-multiversal/BlurView";

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
  ...boxShadowProps
}: BoxShadowGlassProps & {
  style?: any;
  children?: React.ReactNode;
  blurAmount?: number;
}) {
  return (
    <BlurView
      blurAmount={blurAmount}
      style={[
        style,
        {
          boxShadow: [
            ...boxShadowGlass(boxShadowProps),
            ...(style?.boxShadow || []),
          ],
        },
      ]}
    >
      {children}
    </BlurView>
  );
}
