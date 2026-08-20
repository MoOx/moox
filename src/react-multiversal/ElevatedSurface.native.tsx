import { surfacePaint } from "@/react-multiversal/design/elevation";
import { ElevatedSurfaceProps } from "@/react-multiversal/ElevatedSurface.types";
import { StyleSheet, View } from "react-native";

/**
 * Android (and anything native that is not iOS). There is no liquid glass here
 * and that is the intended outcome, not a missing feature: the whole OS speaks
 * Material, so a refracting pill in the middle of it would not read as
 * "floating", it would read as foreign. `designLanguage()` returns `material`
 * on this platform, so `surfacePaint` already answers with a tonal fill and a
 * shadow ramp.
 *
 * iOS resolves `ElevatedSurface.ios.tsx` instead, which is also what keeps the
 * `expo-glass-effect` import out of this bundle - a `Platform.OS` branch would
 * not, since Metro resolves before it folds constants.
 */
export default function ElevatedSurface({
  background,
  borderColor,
  colorScheme,
  elevation,
  language,
  // Both are iOS-only: there is no glass here to pick a variant of, or to tint.
  material: _material,
  radius,
  style,
  tint: _tint,
}: ElevatedSurfaceProps) {
  return (
    <View
      aria-hidden
      style={[
        StyleSheet.absoluteFill,
        { borderRadius: radius },
        surfacePaint({ background, borderColor, colorScheme, elevation, language }),
        style,
      ]}
    />
  );
}
