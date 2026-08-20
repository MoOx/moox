import { surfacePaint } from "@/react-multiversal/design/elevation";
import { ElevatedSurfaceProps } from "@/react-multiversal/ElevatedSurface.types";
import { GlassView, type GlassViewProps, isLiquidGlassAvailable } from "expo-glass-effect";
import { StyleSheet, View } from "react-native";

/**
 * iOS half. The import above is why this is a `.ios.tsx` and not a branch:
 * Metro resolves imports statically, so a `Platform.OS` guard would still pull
 * `expo-glass-effect` into the Android graph (and `expo export` would hide it,
 * because `babel-preset-expo` folds the comparison and drops the dead branch
 * before resolution, while the dev server does not). `npm run check:bundle` is
 * the check that catches that class of mistake.
 *
 * Evaluated once, at module scope: liquid glass is a property of the OS the
 * app was launched on, not a piece of render state. Below iOS 26 the call
 * returns false and the surface falls back to `raised` in the same language,
 * which is the point of an ordered elevation axis: there is always a rung
 * below.
 */
const liquidGlass = isLiquidGlassAvailable();

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
  if (elevation === "floating" && language === "apple" && liquidGlass) {
    return (
      <GlassView
        // Not `auto`: `auto` follows the OS, while the site has its own
        // light/dark toggle, so a forced-dark page would otherwise grow a
        // light pill.
        colorScheme={colorScheme}
        // The whole reason the two materials are named after Apple's: here it
        // is one prop, and the web half has to imitate what this does natively.
        glassEffectStyle={material}
        // `GlassView` types its style as a plain `ViewStyle` array rather than
        // a `StyleProp`, and `types/react-native-web.d.ts` widens `ViewStyle`
        // on top of that, so the two never line up. The value is a style
        // either way.
        style={
          [StyleSheet.absoluteFill, { borderRadius: radius }, style] as GlassViewProps["style"]
        }
        tintColor={tint}
      />
    );
  }
  return (
    <View
      aria-hidden
      style={[
        StyleSheet.absoluteFill,
        { borderRadius: radius },
        surfacePaint({
          background,
          borderColor,
          colorScheme,
          elevation: elevation === "floating" ? "raised" : elevation,
          language,
        }),
        style,
      ]}
    />
  );
}
