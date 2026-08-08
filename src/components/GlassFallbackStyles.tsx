import { alpha, colors, themeDark, themeLight } from "@/styles";

/**
 * The `dataSet` that opts an element into the glass material below. Anything
 * carrying it gets the translucent fill, the blur and the bezel - which is why
 * the material is defined once here rather than per surface.
 */
export const glassDataSet = { glass: "true" };

/**
 * Liquid-glass treatment grounded in Apple's material system:
 * - translucent fill (vibrancy comes from saturation, not brightness)
 * - saturate(180%) for vibrancy, ~12px blur (regular-material zone)
 * - inset white highlight at the top edge = specular bezel (Safari-safe)
 * - ambient drop shadow underneath for separation
 *
 * Written as a stylesheet rather than inline styles because it has to key off
 * the `userColorScheme-*` class on `html` - the same class the no-flash inline
 * script sets before React runs - and off `prefers-color-scheme` underneath it.
 * A component cannot express "auto means dark only when the OS says so".
 *
 * Mounted once, in `__root`.
 */
export default function GlassFallbackStyles() {
  const glassLight = `
    background-color: ${alpha(themeLight.colors.back, 0.55)} !important;
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    backdrop-filter: saturate(180%) blur(12px);
    border-color: ${alpha(colors.white, 0.5)} !important;
    box-shadow:
      inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.95)},
      inset -0.5px -0.25px 1px ${alpha(colors.white, 0.95)},
      inset -4px -6px 14px -8px ${alpha(colors.white, 0.2)},
      0 4px 20px ${alpha(colors.black, 0.12)} !important;
  `;
  const glassDark = `
    background-color: ${alpha(themeDark.colors.back, 0.35)} !important;
    -webkit-backdrop-filter: saturate(180%) brightness(1.3) blur(12px);
    backdrop-filter: saturate(180%) brightness(1.3) blur(12px);
    border-color: ${alpha(colors.white, 0.18)} !important;
    box-shadow:
      inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.35)},
      inset -0.5px -0.25px 1px ${alpha(colors.white, 0.25)},
      inset 4px 6px 16px -8px ${alpha(colors.white, 0.2)},
      0 4px 20px ${alpha(colors.black, 0.4)} !important;
  `;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @supports (backdrop-filter: none) or (-webkit-backdrop-filter: none) {
            .userColorScheme-auto [data-glass="true"],
            .userColorScheme-light [data-glass="true"] {
              ${glassLight}
            }
            .userColorScheme-dark [data-glass="true"] {
              ${glassDark}
            }
            @media (prefers-color-scheme: dark) {
              .userColorScheme-auto [data-glass="true"] {
                ${glassDark}
              }
            }
          }`,
      }}
    />
  );
}
