import { platformColors } from "@/react-multiversal/colors";
import { GradientStop, reverseStops } from "@/react-multiversal/gradient";
import { makeTheme, Theme, ThemeColors } from "@/react-multiversal/theme";
import tinycolor from "tinycolor2";

/**
 * The same color, forced to `value` alpha.
 *
 * Reads the color in JS, so it takes a real value: `theme.colors`, or a literal.
 * Never `theme.dynamicColors`, which are `var(--…)` references on web that
 * tinycolor cannot parse - it would return black. A dynamic color that needs
 * transparency gets its own theme token instead, the way `backMainAlpha05` and
 * `backAlpha85` already do.
 */
export function alpha(color: string, value: number): string {
  return tinycolor(color).setAlpha(value).toHex8String();
}

export const colors = {
  white: "#ffffff",
  black: "#1F1F1F",
  indigo: "#4F3DFF",
};

type ThemedColors = {
  back: string;
  backAlpha01: string;
  backAlpha85: string;
  backAlt: string;
  backOnAlt: string;
  backMain: string;
  backMainAlpha05: string;
  text: string;
  textAlt: string;
  textDark: string;
  textMain: string;
  textMainDark: string;
  textLight1: string;
  textLight2: string;
  textOnDarkLight: string;
  textOnMain: string;
  gradientLandscape1: string;
  gradientLandscape2: string;
  gradientLandscape3: string;
  textFlashy1: string;
  textFlashy2: string;
  textFlashy3: string;
  textFlashy4: string;
  /**
   * Ink versions of the flashy accents. `textFlashy*` are gradient stops -
   * moving them repaints the header band and every gradient on the site - so
   * the values used as *text* on a tinted surface live separately and are
   * tuned for AA.
   */
  inkFlashy: string;
  /** "Available now" - green on its own tinted pill, in both themes. */
  inkSuccess: string;
  textIndigoAlt: string;
  textIndigoAlt2: string;
  ultraLight: string;
  /**
   * The surface of a lifted pane, as a veil rather than as a colour.
   *
   * An absolute value only reads as elevation against the page it was picked
   * for: `#150030` is a step above this theme's background and a black hole on
   * anything else, which is what a raised button looked like over a bright
   * gradient. A translucent light veil lifts whatever is behind it instead, so
   * the same token works on the page, on a photo and on a gradient. It is the
   * same idea as Material's elevation tint.
   */
  backElevated: string;
  /**
   * The liquid-glass material, as theme tokens rather than as a hand-written
   * stylesheet. `makeTheme` already emits every token as a CSS variable and
   * already switches it on `.userColorScheme-*` and `prefers-color-scheme`,
   * which is the entirety of what `GlassFallbackStyles` used to duplicate by
   * hand. Changing the material is now editing four values here.
   *
   * Web reads all four. Native reads `glassFill` (the painted fallback below
   * iOS 26, and the liquid-glass tint above it); `glassFilter` and
   * `glassBezel` are CSS and stay unused there.
   */
  glassFill: string;
  glassBorder: string;
  glassBezel: string;
  glassFilter: string;
  /**
   * The second glass, and not a lighter version of the first one: `regular`
   * guarantees legibility through an opaque enough fill, `clear` gives that up
   * to let the background through. Which is why its fill turns neutral - black
   * or white rather than the theme's background - since it is no longer
   * tinting, it is the dimming layer that keeps the label readable over
   * whatever is behind.
   *
   * Only use it where the background is yours: the hero and the synthwave
   * footer, not a button that might land on plain white.
   */
  glassClearFill: string;
  glassClearBorder: string;
  glassClearBezel: string;
  glassClearFilter: string;
};

export const boxShadows = {
  default: [
    {
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      color: alpha(colors.black, 0.1),
    },
    {
      offsetX: 0,
      offsetY: 4,
      blurRadius: 20,
      color: alpha(colors.black, 0.1),
    },
  ],
  moreVisible: [
    {
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      color: alpha(colors.black, 0.2),
    },
  ],
};

export const themedColors: ThemeColors<ThemedColors> = {
  light: {
    back: colors.white,
    backAlpha01: alpha(colors.white, 0.1),
    backAlpha85: alpha(colors.white, 0.85),
    backAlt: "#f2f2f7",
    backOnAlt: colors.white,
    backMain: colors.indigo,
    backMainAlpha05: alpha(colors.indigo, 0.05),
    text: "#373737",
    textAlt: "#555",
    textDark: "#111",
    textMain: colors.indigo,
    textMainDark: "#3A1E90",
    // AA against backAlt (#f2f2f7), not just white: 4.13 → 4.50.
    textLight1: "#6f6f6f",
    // AA against the tinted card surfaces too (#f6f5ff), not just white:
    // 3.95 → 4.51.
    textLight2: "#717171",
    textOnDarkLight: alpha(colors.black, 0.5),
    textOnMain: colors.white,
    gradientLandscape1: "rgb(248, 205, 74, 0.75)",
    gradientLandscape2: "rgb(253, 18, 200, 0.5)",
    gradientLandscape3: "rgb(253, 18, 200, 0)",
    textFlashy1: "#D0768C",
    textFlashy2: "#BF46A5",
    textFlashy3: "#7029B2",
    textFlashy4: "#2d129b",
    textIndigoAlt: "#792F93",
    textIndigoAlt2: "#2424a9",
    // 4.55 on the palest card background (#f2e7f8); textFlashy2 itself is 3.79.
    inkFlashy: "#ad3c95",
    inkSuccess: "#037e46",
    // flashy1: "#f99b52",
    // flashy2: "#fba64b",
    // flashy3: "#ff5b8a",
    // flashy4: "#2b0aff",
    ultraLight: alpha(colors.black, 0.1),
    // Light mode lifts by going opaque white: there is nothing above white to
    // veil towards.
    backElevated: colors.white,
    // Vibrancy comes from saturation, not brightness; the bezel is an inset
    // white highlight (Safari-safe), and the ambient shadow is what separates
    // the surface from the page.
    glassFill: alpha(colors.white, 0.55),
    glassBorder: alpha(colors.white, 0.5),
    glassBezel: [
      `inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.95)}`,
      `inset -0.5px -0.25px 1px ${alpha(colors.white, 0.95)}`,
      `inset -4px -6px 14px -8px ${alpha(colors.white, 0.2)}`,
      `0 4px 20px ${alpha(colors.black, 0.12)}`,
    ].join(", "),
    glassFilter: "saturate(180%) blur(12px)",
    // Less blur on purpose: the point is to see what is behind, so hiding it
    // would defeat the variant. `brightness` above 1 is the dimming layer in
    // reverse - this theme's text is dark, so the backdrop is lifted, not sunk.
    glassClearFill: alpha(colors.white, 0.12),
    glassClearBorder: alpha(colors.white, 0.35),
    glassClearBezel: [
      `inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.7)}`,
      `inset -0.5px -0.25px 1px ${alpha(colors.white, 0.6)}`,
      `0 2px 12px ${alpha(colors.black, 0.1)}`,
    ].join(", "),
    glassClearFilter: "saturate(200%) brightness(1.08) blur(6px)",
  },
  dark: {
    back: "#0c001b", //platformColors.ios.dark.gray6,
    backAlpha01: alpha("#110028", 0.01),
    backAlpha85: alpha("#110028", 0.85),
    backAlt: "#0c001b",
    backOnAlt: "#150030",
    backMain: colors.indigo,
    backMainAlpha05: alpha(colors.indigo, 0.05),
    text: alpha(colors.white, 0.95),
    textAlt: colors.white,
    textDark: alpha(colors.white, 0.5),
    // Ink, not paint: the brand indigo (#4F3DFF) is 3.34 against this
    // background. `backMain` above still paints with the exact brand colour -
    // only the text variant is lifted to 4.55.
    textMain: "#6d5eff",
    textMainDark: "#8157ff",
    textLight1: platformColors.ios.dark.gray,
    // iOS' systemGray2 (#636366) is 3.40 on this background - dark mode needs
    // a lighter grey than the system one, since the surface is darker too.
    // Tuned against the lightest dark surface (#0f0326): 4.50.
    textLight2: "#78787c",
    textOnDarkLight: alpha(colors.white, 0.5),
    textOnMain: alpha(colors.white, 0.98),
    gradientLandscape1: "rgb(215, 18, 255)",
    gradientLandscape2: "rgba(144, 17, 207, 0.6)",
    gradientLandscape3: "rgba(144, 17, 207, 0)",
    textFlashy1: "#f289a4",
    textFlashy2: "#fa5bd7",
    textFlashy3: "#9336ea",
    textFlashy4: "#5731ee",
    textIndigoAlt: "#c34bee",
    textIndigoAlt2: "#968ee0",
    // Dark mode flips the requirement: the accents sit on a dark surface, so
    // the ink has to be *lighter* than the brand value, not deeper.
    inkFlashy: "#fa5bd7",
    inkSuccess: "#049955",
    ultraLight: alpha(colors.white, 0.15),
    backElevated: alpha(colors.white, 0.12),
    // Dark needs a lift the light theme does not: `brightness(1.3)`, or the
    // material reads as a grey card rather than as glass.
    glassFill: alpha("#0c001b", 0.35),
    glassBorder: alpha(colors.white, 0.18),
    glassBezel: [
      `inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.35)}`,
      `inset -0.5px -0.25px 1px ${alpha(colors.white, 0.25)}`,
      `inset 4px 6px 16px -8px ${alpha(colors.white, 0.2)}`,
      `0 4px 20px ${alpha(colors.black, 0.4)}`,
    ].join(", "),
    glassFilter: "saturate(180%) brightness(1.3) blur(12px)",
    // Dark reverses the dimming: the text is light, so the backdrop is pushed
    // down rather than lifted, and the fill is neutral black instead of the
    // theme's indigo-black.
    glassClearFill: alpha(colors.black, 0.2),
    glassClearBorder: alpha(colors.white, 0.12),
    glassClearBezel: [
      `inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.25)}`,
      `inset -0.5px -0.25px 1px ${alpha(colors.white, 0.18)}`,
      `0 2px 12px ${alpha(colors.black, 0.3)}`,
    ].join(", "),
    glassClearFilter: "saturate(200%) brightness(0.9) blur(6px)",
  },
};

const {
  themeLight,
  themeDark,
  styles,
  dynamicStyles,
  dynamicColors,
  getWebStyleSheet,
  getWebHtmlClass,
  useTheme,
} = makeTheme(themedColors);

export {
  dynamicColors,
  dynamicStyles,
  getWebHtmlClass,
  getWebStyleSheet,
  styles,
  themeDark,
  themeLight,
  useTheme,
};

export const gradientFlashyStops = (theme: Theme<ThemedColors>): GradientStop[] => [
  { offset: 0, color: theme.dynamicColors.textFlashy1 },
  { offset: 10, color: theme.dynamicColors.textFlashy2 },
  { offset: 50, color: theme.dynamicColors.textFlashy3 },
  { offset: 100, color: theme.dynamicColors.textFlashy4 },
];
// need to reverse the stops and the offsets
export const gradientFlashyStopsInv = (theme: Theme<ThemedColors>) =>
  reverseStops(gradientFlashyStops(theme));
export const gradientIndigoStops = (theme: Theme<ThemedColors>): GradientStop[] => [
  { offset: 0, color: theme.dynamicColors.textIndigoAlt },
  { offset: 100, color: theme.dynamicColors.textIndigoAlt2 },
];
export const gradientIndigoStopsInv = (theme: Theme<ThemedColors>) =>
  reverseStops(gradientIndigoStops(theme));

export const gradientStaticIndigoStyles: GradientStop[] = [
  { offset: 0, color: themeLight.colors.textIndigoAlt },
  { offset: 100, color: themeLight.colors.textIndigoAlt2 },
];
export const gradientText = (theme: Theme<ThemedColors>): GradientStop[] => [
  { offset: 0, color: theme.dynamicColors.textAlt },
  { offset: 100, color: theme.dynamicColors.textDark },
];
