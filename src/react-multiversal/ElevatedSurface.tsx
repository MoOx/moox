import { surfacePaint } from "@/react-multiversal/design/elevation";
// Importing the module is what registers the material's one CSS rule.
import { glassDataSet, pinnedGlassVars } from "@/react-multiversal/design/glass";
import { ElevatedSurfaceProps } from "@/react-multiversal/ElevatedSurface.types";
import { StyleSheet, View, type ViewStyle } from "react-native";

/**
 * Web half. Read `ElevatedSurface.types.ts` for why this is a layer, and
 * `design/glass.ts` for the material, which the menus and the contact surfaces
 * already wear.
 *
 * The painted `raised` style is left underneath the glass on purpose. Those
 * rules live inside `@supports (backdrop-filter: none)` and win with
 * `!important`, so a browser that can blur gets the material and a browser
 * that cannot keeps a perfectly good raised surface. The degradation is a
 * cascade fact: no capability check of ours, no JS, and nothing that could
 * differ between the server render and the client one.
 *
 * The rule sets `border-color` and never `border-width`, so the rim only paints
 * on a surface that asked for a border: glass without one is glass with nothing
 * but its bezel, which is a real style and used to be impossible.
 */
export default function ElevatedSurface({
  backdrop,
  background,
  borderColor,
  colorScheme,
  elevation,
  language,
  material = "regular",
  radius,
  style,
  tint,
}: ElevatedSurfaceProps) {
  const glass = elevation === "floating" && language === "apple";
  // A tinted glass, the same thing `tintColor` does natively. Overriding the
  // custom property rather than `background-color` is what lets it through the
  // rule's `!important`: the declaration is untouched, only what it reads
  // changes. `color-mix` keeps the value a `var(…)`, so it still follows the
  // theme between light and dark.
  // Before the tint, so a tinted glass still wins: pinning answers "which
  // scheme", tinting answers "which colour".
  const pinned =
    glass && backdrop !== undefined
      ? (pinnedGlassVars(material, backdrop) as ViewStyle)
      : undefined;
  const tinted =
    glass && tint !== undefined
      ? ({ "--rm-glass-fill": `color-mix(in srgb, ${tint} 65%, transparent)` } as ViewStyle)
      : undefined;
  return (
    <View
      aria-hidden
      dataSet={glass ? glassDataSet(material) : undefined}
      style={[
        StyleSheet.absoluteFill,
        { borderRadius: radius },
        surfacePaint({
          background,
          borderColor,
          colorScheme,
          elevation: glass ? "raised" : elevation,
          language,
        }),
        pinned,
        tinted,
        style,
      ]}
    />
  );
}
