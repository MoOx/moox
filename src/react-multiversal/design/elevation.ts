import { DesignLanguage } from "@/react-multiversal/design/designLanguage";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import type { ViewStyle } from "react-native";

/**
 * One ordered axis, not a list of materials. `glass` used to sit next to
 * `subtle` as if they were rival effects, which is what made `mode` and
 * `effect` overlap: both were answering "how far above the page is this?".
 * Ask that once, and the language decides how to express it.
 */
export type Elevation = "flat" | "raised" | "floating";

export type SurfacePaint = {
  /** Painted fill. `transparent` is a legitimate value (a plain button). */
  background?: string;
  borderColor?: string;
  colorScheme: "light" | "dark";
  elevation: Elevation;
  language: DesignLanguage;
};

const shadow = (offsetY: number, blurRadius: number, color: string) => ({
  offsetX: 0,
  offsetY,
  blurRadius,
  color,
});

/**
 * Material expresses height with a shadow whose spread grows with the level;
 * Apple expresses it with a specular bezel and a much softer ambient shadow.
 * Reproducing one language's shadow ramp in the other is exactly the "lowest
 * common denominator" trap, so they simply do not share a scale.
 */
export const surfacePaint = ({
  background,
  borderColor,
  colorScheme,
  elevation,
  language,
}: SurfacePaint): ViewStyle => {
  const base: ViewStyle = {
    backgroundColor: background,
    borderColor,
    borderWidth: borderColor === undefined ? 0 : 1,
  };
  if (elevation === "flat") return base;
  const dark = colorScheme === "dark";
  if (language === "material") {
    // Umbra only, no bezel: a rim light on an opaque surface reads as a bug in
    // this language, where depth comes from the shadow alone.
    return {
      ...base,
      boxShadow:
        elevation === "raised"
          ? [shadow(1, 3, `rgba(0,0,0,${dark ? 0.5 : 0.2})`)]
          : [shadow(4, 8, `rgba(0,0,0,${dark ? 0.6 : 0.24})`), shadow(1, 3, "rgba(0,0,0,0.12)")],
    };
  }
  return {
    ...base,
    boxShadow: [
      ...boxShadowGlass(),
      shadow(elevation === "raised" ? 1 : 4, elevation === "raised" ? 2 : 20, `rgba(0,0,0,${dark ? 0.4 : 0.12})`),
    ],
  };
};
