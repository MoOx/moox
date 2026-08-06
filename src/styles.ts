import { platformColors } from "@/react-multiversal/colors";
import { GradientStop } from "@/react-multiversal/GradientLinear";
import { makeTheme, Theme, ThemeColors } from "@/react-multiversal/theme";
import { TextStyle } from "react-native";
import tinycolor from "tinycolor2";

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
  },
  dark: {
    back: "#0c001b", //platformColors.ios.dark.gray6,
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

const reverseStops = (stops: GradientStop[]) =>
  stops
    .slice(0)
    .reverse()
    .map((s) => ({
      ...s,
      offset: 100 - s.offset,
    }));
export const gradientFlashyStops = (theme: Theme<ThemedColors>) => [
  { offset: 0, stopColor: theme.dynamicColors.textFlashy1 },
  { offset: 10, stopColor: theme.dynamicColors.textFlashy2 },
  { offset: 50, stopColor: theme.dynamicColors.textFlashy3 },
  { offset: 100, stopColor: theme.dynamicColors.textFlashy4 },
];
// need to reverse the stops and the offsets
export const gradientFlashyStopsInv = (theme: Theme<ThemedColors>) =>
  reverseStops(gradientFlashyStops(theme));
export const gradientIndigoStops = (theme: Theme<ThemedColors>) => [
  { offset: 0, stopColor: theme.dynamicColors.textIndigoAlt },
  { offset: 100, stopColor: theme.dynamicColors.textIndigoAlt2 },
];
export const gradientIndigoStopsInv = (theme: Theme<ThemedColors>) =>
  reverseStops(gradientIndigoStops(theme));

export const gradientStaticIndigoStyles = [
  { offset: 0, stopColor: themeLight.colors.textIndigoAlt },
  { offset: 100, stopColor: themeLight.colors.textIndigoAlt2 },
];
const makeGradientTextStyles = (
  stops: GradientStop[],
  angle: number = 90,
  // Print/PDF option (used by `/cv`): `background-clip: text` + transparent
  // fill is dropped when printing (notably Safari → invisible text), so fall
  // back to a solid color.
  print: boolean = false,
) =>
  (print
    ? {
        alignSelf: "flex-start",
        color: stops[Math.floor(stops.length / 2)]?.stopColor,
      }
    : {
        alignSelf: "flex-start",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundImage: `linear-gradient(${angle}deg, ${stops.map((s) => `${s.stopColor} ${s.offset}%`).join(", ")})`,
        printColorAdjust: "exact",
      }) as TextStyle;

export const gradientTextIndigoStyles = (
  theme: Theme<ThemedColors>,
  angle?: number,
  print?: boolean,
) => makeGradientTextStyles(gradientIndigoStops(theme), angle, print);
export const gradientTextIndigoStylesInv = (
  theme: Theme<ThemedColors>,
  angle?: number,
  print?: boolean,
) => makeGradientTextStyles(gradientIndigoStopsInv(theme), angle, print);
export const gradientTextFlashyStyles = (
  theme: Theme<ThemedColors>,
  angle?: number,
  print?: boolean,
) => makeGradientTextStyles(gradientFlashyStops(theme), angle, print);
export const gradientTextFlashyStylesInv = (
  theme: Theme<ThemedColors>,
  angle?: number,
  print?: boolean,
) => makeGradientTextStyles(gradientFlashyStopsInv(theme), angle, print);

export const gradientText = (theme: Theme<ThemedColors>) => [
  { offset: 0, stopColor: theme.dynamicColors.textAlt },
  { offset: 100, stopColor: theme.dynamicColors.textDark },
];
export const gradientTextStyles = (
  theme: Theme<ThemedColors>,
  angle: number = 180,
  print?: boolean,
) => makeGradientTextStyles(gradientText(theme), angle, print);
