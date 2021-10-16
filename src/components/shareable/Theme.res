open ReactNative
open ReactNative.Style
open ReactMultiversal

type acceptedMode = [#light | #dark | #auto]
type t = [#light | #dark]

type themed<'t> = {
  light: 't,
  dark: 't,
}

type styleSheet<'s> = 's
type styleSheets<'s> = themed<styleSheet<'s>>

type colorMap = {
  back: string,
  backDark: string,
  main: string,
  text: string,
  textLight1: string,
  textLight2: string,
  textOnDarkLight: string,
  textOnMain: string,
}

type themedColors = themed<colorMap>

let namedColors = theme =>
  switch theme {
  | #light => Predefined.Colors.Ios.light
  | #dark => Predefined.Colors.Ios.dark
  }

type theme<'c> = {
  mode: t,
  styles: styleSheet<'c>,
  colors: Predefined.Colors.Ios.t,
  namedColors: colorMap,
}

type themes<'a> = themed<theme<'a>>

module type T = {
  let colors: themedColors
}

module Default = {
  let colors = {
    light: {
      back: "#fff",
      backDark: "#f2f2f7",
      main: Predefined.Colors.Ios.light.indigo,
      text: "#111",
      textLight1: Predefined.Colors.Ios.light.gray,
      textLight2: Predefined.Colors.Ios.light.gray2,
      textOnDarkLight: "rgba(0,0,0,0.5)",
      textOnMain: "#fff",
    },
    dark: {
      back: Predefined.Colors.Ios.dark.gray6,
      backDark: "#000",
      main: Predefined.Colors.Ios.dark.indigo,
      text: "rgba(255,255,255,0.98)",
      textLight1: Predefined.Colors.Ios.light.gray,
      textLight2: Predefined.Colors.Ios.light.gray2,
      textOnDarkLight: "rgba(255,255,255,0.5)",
      textOnMain: "rgba(255,255,255,0.98)",
    },
  }
}

let htmlKey = "react-multiversal"
let htmlId = htmlKey ++ "--root"
let htmlCssId = htmlKey ++ "-css"

module MakeTheme = (Th: T) => {
  let webCss = ref("")
  let colors = if Platform.os === Platform.web {
    let prefix = `--${htmlKey}-theme-`
    webCss :=
      `
    .${htmlId} {
      ${prefix}back: ${Th.colors.light.back};
      ${prefix}backDark: ${Th.colors.light.backDark};
      ${prefix}main: ${Th.colors.light.main};
      ${prefix}text: ${Th.colors.light.text};
      ${prefix}textLight1: ${Th.colors.light.textLight1};
      ${prefix}textLight2: ${Th.colors.light.textLight2};
      ${prefix}textOnDarkLight: ${Th.colors.light.textOnDarkLight};
      ${prefix}textOnMain: ${Th.colors.light.textOnMain};
    }
    @media (prefers-color-scheme: dark) {
      .${htmlId} {
        ${prefix}back: ${Th.colors.dark.back};
        ${prefix}backDark: ${Th.colors.dark.backDark};
        ${prefix}main: ${Th.colors.dark.main};
        ${prefix}text: ${Th.colors.dark.text};
        ${prefix}textLight1: ${Th.colors.dark.textLight1};
        ${prefix}textLight2: ${Th.colors.dark.textLight2};
        ${prefix}textOnDarkLight: ${Th.colors.dark.textOnDarkLight};
        ${prefix}textOnMain: ${Th.colors.dark.textOnMain};
      }
    }
    `
    let webColors = {
      back: `var(${prefix}back)`,
      backDark: `var(${prefix}backDark)`,
      main: `var(${prefix}main)`,
      text: `var(${prefix}text)`,
      textLight1: `var(${prefix}textLight1)`,
      textLight2: `var(${prefix}textLight2)`,
      textOnDarkLight: `var(${prefix}textOnDarkLight)`,
      textOnMain: `var(${prefix}textOnMain)`,
    }
    {light: webColors, dark: webColors}
  } else {
    Th.colors
  }
  let colorStyleSheets = {
    light: {
      "text": textStyle(~color=colors.light.text, ()),
      "textButton": textStyle(~color=Predefined.Colors.Ios.light.blue, ()),
      "textLight1": textStyle(~color=colors.light.textLight1, ()),
      "textLight2": textStyle(~color=colors.light.textLight2, ()),
      "textMain": textStyle(~color=colors.light.main, ()),
      "textOnDarkLight": textStyle(~color=colors.light.textOnDarkLight, ()),
      "textOnMain": textStyle(~color=colors.light.textOnMain, ()),
      "textBlue": textStyle(~color=Predefined.Colors.Ios.light.blue, ()),
      "textGreen": textStyle(~color=Predefined.Colors.Ios.light.green, ()),
      "textIndigo": textStyle(~color=Predefined.Colors.Ios.light.indigo, ()),
      "textOrange": textStyle(~color=Predefined.Colors.Ios.light.orange, ()),
      "textPink": textStyle(~color=Predefined.Colors.Ios.light.pink, ()),
      "textPurple": textStyle(~color=Predefined.Colors.Ios.light.purple, ()),
      "textRed": textStyle(~color=Predefined.Colors.Ios.light.red, ()),
      "textTeal": textStyle(~color=Predefined.Colors.Ios.light.teal, ()),
      "textYellow": textStyle(~color=Predefined.Colors.Ios.light.yellow, ()),
      "textGray": textStyle(~color=Predefined.Colors.Ios.light.gray, ()),
      "textGray2": textStyle(~color=Predefined.Colors.Ios.light.gray2, ()),
      "textGray3": textStyle(~color=Predefined.Colors.Ios.light.gray3, ()),
      "textGray4": textStyle(~color=Predefined.Colors.Ios.light.gray4, ()),
      "textGray5": textStyle(~color=Predefined.Colors.Ios.light.gray5, ()),
      "textGray6": textStyle(~color=Predefined.Colors.Ios.light.gray6, ()),
      "back": viewStyle(~backgroundColor=colors.light.back, ()),
      "backDark": viewStyle(~backgroundColor=colors.light.backDark, ()),
      "backGray": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray, ()),
      "backGray2": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray2, ()),
      "backGray3": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray3, ()),
      "backGray4": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray4, ()),
      "backGray5": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray5, ()),
      "backGray6": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray6, ()),
      "backMain": viewStyle(~backgroundColor=colors.light.main, ()),
      "separatorOnBack": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray3, ()),
      "separatorLightOnBack": viewStyle(~backgroundColor=Predefined.Colors.Ios.light.gray4, ()),
      "stackHeader": viewStyle(
        ~backgroundColor=colors.light.back,
        ~borderBottomColor=Predefined.Colors.Ios.light.gray4,
        ~shadowColor=Predefined.Colors.Ios.light.gray4,
        (),
      ),
    }->StyleSheet.create,
    dark: {
      "text": textStyle(~color=Th.colors.dark.text, ()),
      "textButton": textStyle(~color=Predefined.Colors.Ios.dark.blue, ()),
      "textLight1": textStyle(~color=Th.colors.dark.textLight1, ()),
      "textLight2": textStyle(~color=Th.colors.dark.textLight2, ()),
      "textMain": textStyle(~color=Th.colors.dark.main, ()),
      "textOnDarkLight": textStyle(~color=Th.colors.dark.textOnDarkLight, ()),
      "textOnMain": textStyle(~color=Th.colors.dark.textOnMain, ()),
      "textBlue": textStyle(~color=Predefined.Colors.Ios.dark.blue, ()),
      "textGreen": textStyle(~color=Predefined.Colors.Ios.dark.green, ()),
      "textIndigo": textStyle(~color=Predefined.Colors.Ios.dark.indigo, ()),
      "textOrange": textStyle(~color=Predefined.Colors.Ios.dark.orange, ()),
      "textPink": textStyle(~color=Predefined.Colors.Ios.dark.pink, ()),
      "textPurple": textStyle(~color=Predefined.Colors.Ios.dark.purple, ()),
      "textRed": textStyle(~color=Predefined.Colors.Ios.dark.red, ()),
      "textTeal": textStyle(~color=Predefined.Colors.Ios.dark.teal, ()),
      "textYellow": textStyle(~color=Predefined.Colors.Ios.dark.yellow, ()),
      "textGray": textStyle(~color=Predefined.Colors.Ios.dark.gray, ()),
      "textGray2": textStyle(~color=Predefined.Colors.Ios.dark.gray2, ()),
      "textGray3": textStyle(~color=Predefined.Colors.Ios.dark.gray3, ()),
      "textGray4": textStyle(~color=Predefined.Colors.Ios.dark.gray4, ()),
      "textGray5": textStyle(~color=Predefined.Colors.Ios.dark.gray5, ()),
      "textGray6": textStyle(~color=Predefined.Colors.Ios.dark.gray6, ()),
      "back": viewStyle(~backgroundColor=Th.colors.dark.back, ()),
      "backDark": viewStyle(~backgroundColor=Th.colors.dark.backDark, ()),
      "backGray": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray, ()),
      "backGray2": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray2, ()),
      "backGray3": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray3, ()),
      "backGray4": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray4, ()),
      "backGray5": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray5, ()),
      "backGray6": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray6, ()),
      "backMain": viewStyle(~backgroundColor=Th.colors.dark.main, ()),
      "separatorOnBack": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray4, ()),
      "separatorLightOnBack": viewStyle(~backgroundColor=Predefined.Colors.Ios.dark.gray5, ()),
      "stackHeader": viewStyle(
        ~backgroundColor=Th.colors.dark.back,
        ~borderBottomColor=Predefined.Colors.Ios.dark.gray4,
        ~shadowColor=Predefined.Colors.Ios.dark.gray4,
        (),
      ),
    }->StyleSheet.create,
  }
  let themes = {
    light: {
      mode: #light,
      styles: colorStyleSheets.light,
      colors: Predefined.Colors.Ios.light,
      namedColors: Th.colors.light,
    },
    dark: {
      mode: #dark,
      styles: colorStyleSheets.dark,
      colors: Predefined.Colors.Ios.dark,
      namedColors: Th.colors.dark,
    },
  }

  let useTheme = (currentMode): theme<'a> => {
    let colorScheme = Appearance.useColorScheme()->Js.Null.toOption
    let mode = switch currentMode {
    | #auto =>
      switch colorScheme {
      | Some(#dark) => #dark
      | _ => #light
      }
    | #light => #light
    | #dark => #dark
    }
    switch mode {
    | #light => themes.light
    | #dark => themes.dark
    }
  }

  let getThemeStyleSheet = () =>
    <style dangerouslySetInnerHTML={{"__html": webCss.contents}} id={htmlCssId} />

  let getThemeHtmlId = () => htmlId
}

module Radius = {
  let button = 10.
  let card = 6.
}

module StatusBar = {
  @module("react-native") @scope("Platform")
  external versionIos: string = "Version"
  @module("react-native") @scope("Platform")
  external versionAndroid: int = "Version"

  let barsStyle = (theme, barStyle) =>
    switch (theme, barStyle) {
    | (#light, #lightContent) => #"light-content"
    | (#light, #darkContent) => #"dark-content"
    | (#dark, #darkContent) => #"light-content"
    | (#dark, #lightContent) => #"dark-content"
    }

  let barStyle = (theme, barStyle) =>
    switch (theme, barStyle) {
    | (#light, #lightContent) => #lightContent
    | (#light, #darkContent) => #darkContent
    | (#dark, #darkContent) => #lightContent
    | (#dark, #lightContent) => #darkContent
    }

  let isFormSheetSupported = Platform.os === Platform.ios && versionIos > "13"

  let formSheetSafeArea = isFormSheetSupported ? false : true
}
