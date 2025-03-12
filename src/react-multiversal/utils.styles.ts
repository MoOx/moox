export const styles = {
  glass: {
    backgroundColor: "rgba(128, 128, 128, 0.3)",
    backgroundBlendMode: "luminosity",
  },
};
export const boxShadowGlass = ({
  borderWidth = 1,
  colorTopLeft = "rgba(255,255,255,0.25)",
  colorBottomRight = "rgba(255,255,255,0.1)",
}: {
  borderWidth?: number;
  colorTopLeft?: string;
  colorBottomRight?: string;
} = {}) => [
  {
    inset: true,
    offsetX: borderWidth,
    offsetY: borderWidth,
    color: colorTopLeft,
  },
  {
    inset: true,
    offsetX: -borderWidth,
    offsetY: -borderWidth,
    color: colorBottomRight,
  },
];
