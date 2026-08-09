import { contactJiggleDataSet } from "@/components/ContactPageStyles";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import { ComponentType } from "react";
import { BoxShadowValue, StyleProp, View, ViewStyle } from "react-native";

/**
 * Apple's superellipse, close enough: the corner radius of an app icon is about
 * 22.4% of its side. Deriving it means a tile is described by its size alone
 * and never drifts into "rounded square" territory when the size changes.
 */
export const tileRadius = (side: number) => Math.round(side * 0.2237);

/**
 * How a tile is lit. `icon` is an app icon sitting on a surface; `recess` is a
 * tile carved into a coloured card, which is lit but casts nothing.
 *
 * `boxShadowGlass()` is the repo's glass bezel, the same rim the header and the
 * menu wear. On a saturated gradient it is what separates an app icon from a
 * coloured rectangle.
 */
const boxShadows: Record<"icon" | "recess", BoxShadowValue[]> = {
  icon: [
    ...boxShadowGlass({
      color: "rgba(255,255,255,0.35)",
      colorAlt: "rgba(0,0,0,0.12)",
    }),
    {
      inset: true,
      offsetX: 0,
      offsetY: 1,
      blurRadius: 0,
      color: "rgba(255,255,255,0.45)",
    },
    {
      inset: true,
      offsetX: 0,
      offsetY: -14,
      blurRadius: 22,
      color: "rgba(0,0,0,0.16)",
    },
    { offsetX: 0, offsetY: 6, blurRadius: 14, color: "rgba(0,0,0,0.3)" },
  ],
  recess: [
    ...boxShadowGlass({
      color: "rgba(255,255,255,0.3)",
      colorAlt: "rgba(0,0,0,0.08)",
    }),
    {
      inset: true,
      offsetX: 0,
      offsetY: 1,
      blurRadius: 0,
      color: "rgba(255,255,255,0.35)",
    },
  ],
};

/** The specular sheen of a glass icon: bright at the top, gone by the middle. */
const gloss = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  height: "55%",
  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0))",
  pointerEvents: "none",
} as const;

export type ContactTileIcon = ComponentType<{
  width: number;
  height: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}>;

/**
 * The app icon of a contact channel: a squircle painted with the channel's own
 * colours, lit from above. Identical in both themes - an app icon does not have
 * a light and a dark variant - which is also what keeps the page recognisable
 * once the surfaces around it change colour.
 */
export default function ContactTile({
  Icon,
  gradient,
  backgroundColor,
  size,
  iconSize,
  iconColor = "#fff",
  depth = "icon",
  style,
}: {
  Icon: ContactTileIcon;
  /** Top and bottom colours of the tile, in that order. */
  gradient?: readonly [string, string];
  /** Flat fill, for a logo that is already a full-bleed app icon of its own. */
  backgroundColor?: string;
  size: number;
  /** Equal to `size` for a full-bleed logo; roughly half of it for a glyph. */
  iconSize: number;
  iconColor?: string;
  depth?: "icon" | "recess";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      // The tile repeats what the title next to it already says.
      aria-hidden={true}
      dataSet={contactJiggleDataSet}
      style={[
        {
          width: size,
          height: size,
          borderRadius: tileRadius(size),
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: boxShadows[depth],
          backgroundColor,
          // A CSS gradient, not `GradientLinear`: that one paints through an
          // inline <svg> whose gradient id is derived from its stops, and the
          // page renders its mobile and desktop layouts at the same time (one
          // of them hidden). Two identical ids in one document, the first of
          // them inside a `display: none` subtree, and the paint silently
          // vanishes on whichever layout is actually visible.
          backgroundImage: gradient
            ? `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})`
            : undefined,
        },
        style,
      ]}
    >
      <Icon width={iconSize} height={iconSize} color={iconColor} />
      <View style={gloss} />
    </View>
  );
}
