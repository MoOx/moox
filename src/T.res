open ReactMultiversal
open Theme

module Themes = {
  let colors = {
    light: {
      ...Theme.Default.colors.light,
      main: "#200094",
    },
    dark: {
      ...Theme.Default.colors.dark,
      main: Predefined.Colors.Ios.dark.indigo,
    },
  }
}

include MakeTheme(Themes)
