import { TextStyle } from "react-native";
import tinycolor from "tinycolor2";

import { platformColors } from "@/react-multiversal/colors";
import { GradientStop } from "@/react-multiversal/GradientLinear";
import { makeTheme, Theme, ThemeColors } from "@/react-multiversal/theme";

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
    // textAlt: "#666666",
    textMain: colors.indigo,
    textMainDark: "#3A1E90",
    textLight1: platformColors.ios.light.gray,
    textLight2: platformColors.ios.light.gray2,
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
    backMainAlpha05: alpha(platformColors.ios.dark.gray6, 0.05),
    text: alpha(colors.white, 0.98),
    textMain: colors.indigo,
    textMainDark: "#7b4fff",
    textLight1: platformColors.ios.dark.gray,
    textLight2: platformColors.ios.dark.gray2,
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
  themeLight,
  themeDark,
  styles,
  dynamicStyles,
  dynamicColors,
  getWebStyleSheet,
  getWebHtmlClass,
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
const gradientTextStyles = (stops: GradientStop[]) =>
  ({
    alignSelf: "flex-start",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: `linear-gradient(90deg, ${stops.map((s) => `${s.stopColor} ${s.offset}%`).join(", ")})`,
  }) as TextStyle;

export const gradientTextIndigoStyles = (theme: Theme<ThemedColors>) =>
  gradientTextStyles(gradientIndigoStops(theme));
export const gradientTextIndigoStylesInv = (theme: Theme<ThemedColors>) =>
  gradientTextStyles(gradientIndigoStopsInv(theme));
export const gradientTextFlashyStyles = (theme: Theme<ThemedColors>) =>
  gradientTextStyles(gradientFlashyStops(theme));
export const gradientTextFlashyStylesInv = (theme: Theme<ThemedColors>) =>
  gradientTextStyles(gradientFlashyStopsInv(theme));
