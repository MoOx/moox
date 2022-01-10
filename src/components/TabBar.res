open Belt
open ReactNative
open ReactMultiversal

let height = 50.

let styles = {
  open Style
  StyleSheet.create({
    "itemWrapper": viewStyle(~flex=1., ~justifyContent=#center, ()),
    "tabbar": viewStyle(
      ~flex=1.,
      ~flexDirection=#row,
      ~minHeight=height->dp,
      ~alignItems=#center,
      (),
    ),
  })
}

@react.component
let make = () => {
  let theme = T.useTheme()
  let currentLocation = Next.Router.useRouter().asPath
  <>
    <style
      dangerouslySetInnerHTML={{
        "__html": `
.TabBarBackground {
  background-color: ${theme.colors.back};
  border-top: 0.5px solid ${theme.colors.back};
}
@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .TabBarBackground {
    background-color: ${theme.colors.back
          ->RescriptTinycolor.TinyColor.makeFromString
          ->Option.map(c =>
            c->RescriptTinycolor.TinyColor.setAlpha(0.75, _)->RescriptTinycolor.TinyColor.toString
          )
          ->Option.getWithDefault(theme.colors.back)};
    -webkit-backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
    backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
  }
}}`,
      }}
    />
    <div className="TabBarBackground FixedBottom">
      <SafeAreaView style={styles["tabbar"]}>
        {Consts.menuLinks
        ->Array.map(({link, text, textSmall, icon, isActive}) =>
          <ViewLink key=link href=link style={styles["itemWrapper"]}>
            <TabBarItem
              icon
              isActive={isActive(currentLocation, link)}
              colorActive={theme.colors.main}
              colorInactive={theme.colors.systemGray}
              text={textSmall->Option.getWithDefault(text)}
            />
          </ViewLink>
        )
        ->React.array}
      </SafeAreaView>
    </div>
    <View style={styles["tabbar"]} />
  </>
}

let default = make
