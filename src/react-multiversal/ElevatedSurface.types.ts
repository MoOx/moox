import { DesignLanguage } from "@/react-multiversal/design/designLanguage";
import { Elevation } from "@/react-multiversal/design/elevation";
import type { GlassMaterial } from "@/react-multiversal/design/glass.types";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * The background layer of an elevated box, always rendered as an absolutely
 * positioned sibling of the content rather than as its parent.
 *
 * Three reasons, and the first one is not negotiable: `expo-glass-effect`
 * documents that `opacity: 0` on a `GlassView` *or any of its ancestors* stops
 * the effect from rendering at all, and hiding the label under `opacity: 0` is
 * exactly how `Btn` keeps its width while a spinner shows. As a sibling, the
 * hidden content can never be the material's ancestor. Then: the root stays
 * whatever the caller made it (an anchor, a `Pressable`), so focus and hit
 * area stay on one node; and a gradient becomes just another layer instead of
 * a rival mode.
 *
 * Every colour arrives resolved. The surface reads no theme, which is what
 * makes it liftable into a kit that does not own one.
 */
export type ElevatedSurfaceProps = {
  /** Painted fill, and the fill the glass falls back to. */
  background?: string;
  borderColor?: string;
  colorScheme: "light" | "dark";
  elevation: Elevation;
  language: DesignLanguage;
  /** Only consulted at `floating`, the one elevation made of glass. */
  material?: GlassMaterial;
  radius: number;
  style?: StyleProp<ViewStyle>;
  /** iOS only: tints the liquid glass. Ignored everywhere else. */
  tint?: string;
};
