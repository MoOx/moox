import {
  getUserColorSchemeWebHtmlClass,
  UserColorScheme,
} from "@/react-multiversal/theme/colorScheme";
import { useSystemColorScheme } from "@/react-multiversal/theme/useSystemColorScheme";
import { useUserColorScheme } from "@/react-multiversal/theme/useUserColorScheme";
import { Platform, StyleSheet } from "react-native";
import { match, P } from "ts-pattern";

export type t = "light" | "dark";

export type ThemeMinimalColorMap = Record<string, string>;

export type ThemeColors<ThemeColorMap extends ThemeMinimalColorMap> = {
  light: ThemeColorMap;
  dark: ThemeColorMap;
};

export type ThemeStyleSheet<ThemeColorMap extends ThemeMinimalColorMap> = {
  [Key in keyof ThemeColorMap]: Key extends `back${string}`
    ? { backgroundColor: ThemeColorMap[Key] }
    : { color: ThemeColorMap[Key] };
};

type ThemedStyleSheet<ThemeColorMap extends ThemeMinimalColorMap> = {
  light: ThemeStyleSheet<ThemeColorMap>;
  dark: ThemeStyleSheet<ThemeColorMap>;
};

export type Theme<ThemeColorMap extends ThemeMinimalColorMap> = {
  mode: t;
  styles: ThemeStyleSheet<ThemeColorMap>;
  colors: ThemeColorMap;
  dynamicColors: ThemeColorMap;
};

const generateStyles = <ThemeColorMap extends ThemeMinimalColorMap>(colors: ThemeColorMap) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [
      key,
      match(key)
        .with(
          P.when((k: string) => k.startsWith("back")),
          () => ({ backgroundColor: value }),
        )
        .otherwise(() => ({ color: value })),
    ]),
  ) as ThemeStyleSheet<ThemeColorMap>;

export function makeTheme<ThemeColorMap extends ThemeMinimalColorMap>(
  themedColors: ThemeColors<ThemeColorMap>,
) {
  const styles: ThemedStyleSheet<ThemeColorMap> = {
    light: generateStyles(themedColors.light),
    dark: generateStyles(themedColors.dark),
  };

  const htmlKey = "react-multiversal-";
  const htmlClass = htmlKey + "-root";
  const htmlStyleId = htmlKey + "-css";

  // @todo implement dynamic colors for iOS using DynamicColorIOS & similar for Android
  // (when and if necessary)

  let webCss = "";
  let dynamicColors = themedColors.light;
  if (Platform.OS === "web") {
    const prefix = `--${htmlKey}-theme-`;
    const webCssLight = Object.entries(themedColors.light)
      .map(([key, value]) => `${prefix}-${key}: ${value};`)
      .join("\n");
    const webCssDark = Object.entries(themedColors.dark)
      .map(([key, value]) => `${prefix}-${key}: ${value};`)
      .join("\n");
    webCss = `
      .${htmlClass},
      .${getUserColorSchemeWebHtmlClass("light")}.${htmlClass} { ${webCssLight} }
      .${getUserColorSchemeWebHtmlClass("dark")}.${htmlClass} { ${webCssDark} }
      @media (prefers-color-scheme: dark) {
        .${htmlClass} { ${webCssDark} }
      }`;
    dynamicColors = Object.fromEntries(
      Object.entries(themedColors.light).map(([key]) => [key, `var(${prefix}-${key})`]),
    ) as ThemeColorMap;
  }
  // Registered once here rather than inside `useTheme`, which called
  // `StyleSheet.create` on every render of every themed component. The object
  // never changes, and `create` recompiles what it is handed: the insert was
  // deduplicated downstream, the compile was not.
  const dynamicStyles: ThemeStyleSheet<ThemeColorMap> = StyleSheet.create(
    generateStyles(dynamicColors),
  );

  const themeLight: Theme<ThemeColorMap> = {
    mode: "light" as t,
    styles: StyleSheet.create(styles.light),
    colors: themedColors.light,
    dynamicColors: themedColors.light,
  };
  const themeDark: Theme<ThemeColorMap> = {
    mode: "dark" as t,
    styles: StyleSheet.create(styles.dark),
    colors: themedColors.dark,
    dynamicColors: themedColors.dark,
  };

  const getWebStyleSheet = () => (
    <style key={htmlStyleId} id={htmlStyleId} dangerouslySetInnerHTML={{ __html: webCss }} />
  );
  const getWebHtmlClass = () => htmlClass;

  function useTheme(_currentMode?: UserColorScheme): Theme<ThemeColorMap> {
    // Both hooks are `useSyncExternalStore` under the hood, so they render the
    // server value during hydration and only then read the browser. Calling
    // them unconditionally keeps the hook order identical on both sides.
    const [userColorScheme] = useUserColorScheme();

    const currentMode = _currentMode ?? userColorScheme ?? "auto";

    const colorScheme = useSystemColorScheme();

    const mode = match<UserColorScheme, t>(currentMode)
      .with("auto", () =>
        match(colorScheme)
          .with("dark", (): t => "dark")
          .otherwise((): t => "light"),
      )
      .with("light", () => "light")
      .with("dark", () => "dark")
      .exhaustive();

    // @todo use dynamic colors for native as well
    if (currentMode === "auto" && Platform.OS === "web") {
      return {
        mode,
        styles: dynamicStyles,
        colors: mode === "light" ? themedColors.light : themedColors.dark,
        dynamicColors,
      };
    }

    return mode === "light" ? themeLight : themeDark;
  }

  return {
    themeLight,
    themeDark,
    styles,
    dynamicStyles,
    dynamicColors,
    getWebStyleSheet,
    getWebHtmlClass,
    useTheme,
  };
}
