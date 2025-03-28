import { Platform, TextStyle } from "react-native";

export const weight = {
  thin: "100",
  ultralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900",
} as const;

export type weight = (typeof weight)[keyof typeof weight];

const iosSpacing = (v: number) => (Platform.OS === "ios" ? v : 0);
const androidLine = (v: number) => v * 1.2;

type PlatformStyles = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: weight;
  fontWeightEm: weight;
};

// Apple HIG for iOS
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
export const platform = {
  // Apple HIG for macOS
  // https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/typography/
  // unused for now, really focused on Desktop App, which is different from Desktop Website
  macos: {
    largeTitle: {
      fontSize: 26,
      lineHeight: 32,
      letterSpacing: 0.22,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title1: {
      fontSize: 22,
      lineHeight: 26,
      letterSpacing: -0.26,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title2: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.43,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title3: {
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.23,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    headline: {
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: -0.08,
      fontWeight: weight.bold,
      fontWeightEm: weight.heavy,
    } as PlatformStyles,
    subhead: {
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.06,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    body: {
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: -0.08,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    callout: {
      fontSize: 12,
      lineHeight: 15,
      letterSpacing: 0.0,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    footnote: {
      fontSize: 10,
      lineHeight: 13,
      letterSpacing: 0.12,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    caption1: {
      fontSize: 10,
      lineHeight: 13,
      letterSpacing: 0.12,
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    caption2: {
      fontSize: 10,
      lineHeight: 13,
      letterSpacing: 0.12,
      fontWeight: weight.medium,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
  },
  ios: {
    largeTitle: {
      fontSize: 34,
      lineHeight: 41,
      letterSpacing: iosSpacing(0.4),
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title1: {
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: iosSpacing(0.38),
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title2: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: iosSpacing(-0.26),
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    title3: {
      fontSize: 20,
      lineHeight: 25,
      letterSpacing: iosSpacing(-0.45),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    headline: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: iosSpacing(-0.43),
      fontWeight: weight.semibold,
      fontWeightEm: weight.heavy,
    } as PlatformStyles,
    body: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: iosSpacing(-0.43),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    callout: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: iosSpacing(-0.31),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    subhead: {
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: iosSpacing(-0.23),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: iosSpacing(-0.08),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    caption1: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: iosSpacing(0.0),
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    caption2: {
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: iosSpacing(0.06),
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
  },
  // Google Material Design
  // https://material.io/design/typography/the-type-system.html#type-scale
  android: {
    // line = nothing defined, web guide show "normal", which is approx 1.2
    headline1: {
      fontSize: 96,
      lineHeight: androidLine(96),
      letterSpacing: -1.5,
      fontWeight: weight.light,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    headline2: {
      fontSize: 60,
      lineHeight: androidLine(60),
      letterSpacing: -0.5,
      fontWeight: weight.light,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    headline3: {
      fontSize: 48,
      lineHeight: androidLine(48),
      letterSpacing: 0,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    headline4: {
      fontSize: 34,
      lineHeight: androidLine(34),
      letterSpacing: 0.25,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    headline5: {
      fontSize: 24,
      lineHeight: androidLine(24),
      letterSpacing: 0,
      fontWeight: weight.regular,
      fontWeightEm: weight.bold,
    } as PlatformStyles,
    headline6: {
      fontSize: 20,
      lineHeight: androidLine(20),
      letterSpacing: 0.15,
      fontWeight: weight.medium,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    subtitle1: {
      fontSize: 16,
      lineHeight: androidLine(16),
      letterSpacing: 0.15,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    subtitle2: {
      fontSize: 14,
      lineHeight: androidLine(14),
      letterSpacing: 0.1,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    body1: {
      fontSize: 16,
      lineHeight: androidLine(16),
      letterSpacing: 0.5,
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    body2: {
      fontSize: 14,
      lineHeight: androidLine(14),
      letterSpacing: 0.25,
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    button: {
      fontSize: 14,
      lineHeight: androidLine(14),
      letterSpacing: 1.25,
      fontWeight: weight.medium,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
    caption: {
      fontSize: 12,
      lineHeight: androidLine(12),
      letterSpacing: 0.4,
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
    overline: {
      fontSize: 10,
      lineHeight: androidLine(10),
      letterSpacing: 1.5,
      fontWeight: weight.regular,
      fontWeightEm: weight.medium,
    } as PlatformStyles,
  },
};

// lets do this: allow people to use HIG or MD naming on any platform
export const sizes = {
  // Apple HIG mapping
  ios: {
    largeTitle: platform.ios.largeTitle,
    title1: platform.ios.title1,
    title2: platform.ios.title2,
    title3: platform.ios.title3,
    headline: platform.ios.headline,
    body: platform.ios.body,
    callout: platform.ios.callout,
    subhead: platform.ios.subhead,
    footnote: platform.ios.footnote,
    caption1: platform.ios.caption1,
    caption2: platform.ios.caption2,
    // Google Material Design inversed mapping
    headline1: platform.ios.largeTitle, // @todo ?
    headline2: platform.ios.largeTitle, // @todo ?
    headline3: platform.ios.largeTitle,
    headline4: platform.ios.title1,
    headline5: platform.ios.title2,
    headline6: platform.ios.title3,
    subtitle1: platform.ios.headline,
    subtitle2: platform.ios.subhead,
    body1: platform.ios.body,
    body2: platform.ios.callout,
    button: platform.ios.callout, // @todo ?
    caption: platform.ios.caption1,
    overline: {
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 0.06,
      fontWeight: weight.regular,
      fontWeightEm: weight.semibold,
    } as PlatformStyles,
  },
  android: {
    // Apple HIG mapping (inversed)
    largeTitle: platform.android.headline3,
    title1: platform.android.headline4,
    title2: platform.android.headline5,
    title3: platform.android.headline6,
    headline: platform.android.subtitle1,
    body: platform.android.body1,
    callout: platform.android.button,
    subhead: platform.android.subtitle2,
    footnote: platform.android.caption,
    caption1: platform.android.caption,
    caption2: platform.android.caption,
    // Google Material Design
    headline1: platform.android.headline1,
    headline2: platform.android.headline2,
    headline3: platform.android.headline3,
    headline4: platform.android.headline4,
    headline5: platform.android.headline5,
    headline6: platform.android.headline6,
    subtitle1: platform.android.subtitle1,
    subtitle2: platform.android.subtitle2,
    body1: platform.android.body1,
    body2: platform.android.body2,
    button: platform.android.button,
    caption: platform.android.caption,
    overline: platform.android.overline,
  },
};

const keepStyles = (styles: PlatformStyles): TextStyle => {
  const { fontSize, lineHeight, letterSpacing, fontWeight } = styles;
  return {
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
  };
};
const keepStylesEm = (styles: PlatformStyles): TextStyle => {
  const {
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeightEm: fontWeight,
  } = styles;
  return {
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
  };
};

export const fontStyles = {
  ios: Object.fromEntries(
    Object.entries(sizes.ios).map(([key, s]) => [key, keepStyles(s)])
  ) as Record<keyof (typeof platform)["ios"], TextStyle>,
  iosEm: Object.fromEntries(
    Object.entries(sizes.ios).map(([key, s]) => [key, keepStylesEm(s)])
  ) as Record<keyof (typeof platform)["ios"], TextStyle>,
  android: Object.fromEntries(
    Object.entries(sizes.android).map(([key, s]) => [key, keepStyles(s)])
  ) as Record<keyof (typeof platform)["android"], TextStyle>,
  androidEm: Object.fromEntries(
    Object.entries(sizes.android).map(([key, s]) => [key, keepStylesEm(s)])
  ) as Record<keyof (typeof platform)["android"], TextStyle>,
};
// @todo for the web, we should use this
// https://webkit.org/blog/3709/using-the-system-font-in-web-content/
// font: -apple-system-body
// font: -apple-system-headline
// font: -apple-system-subhead
// font: -apple-system-caption1
// font: -apple-system-caption2
// font: -apple-system-footnote
// font: -apple-system-short-body
// font: -apple-system-short-headline
// font: -apple-system-short-subhead
// font: -apple-system-short-caption1
// font: -apple-system-short-footnote
// font: -apple-system-tall-body
