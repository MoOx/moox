import { surfacePaint } from "@/react-multiversal/design/elevation";
// Importing the module is what registers the material's one CSS rule.
import { glassDataSet } from "@/react-multiversal/design/glass";
import { ElevatedSurfaceProps } from "@/react-multiversal/ElevatedSurface.types";
import { StyleSheet, View, type ViewStyle } from "react-native";

const styles = StyleSheet.create({
  // The glass rules set `border-color`, never `border-width`: without a width
  // there is nothing for them to colour.
  glass: { borderWidth: 1, borderColor: "transparent" },
});

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
 */
export default function ElevatedSurface({
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
        glass && styles.glass,
        tinted,
        style,
      ]}
    />
  );
}
