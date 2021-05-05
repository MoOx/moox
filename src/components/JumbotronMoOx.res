open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "container": style(
      ~flexDirection=#row,
      ~justifyContent=#center,
      ~alignItems=#center,
      ~backgroundColor="#020202",
      ~minHeight=450.->dp,
      (),
    ),
    "bg": style(~position=#absolute, ~top=0.->dp, ~bottom=0.->dp, ~right=50.->pct, ()),
    "contentWrapper": style(
      ~position=#absolute,
      ~top=0.->dp,
      ~bottom=0.->dp,
      ~left=40.->pct,
      ~right=0.->dp,
      ~flexDirection=#row,
      (),
    ),
    "content": style(~flex=1., ~justifyContent=#center, ()),
    "title": style(~fontSize=44., ~fontWeight=#bold, ~color=Consts.Colors.light, ()),
    "subtitle": style(~fontSize=16., ~fontWeight=#_200, ~color=Consts.Colors.light, ()),
    "textWrapper": style(~backgroundColor=Consts.Colors.lightest, ~opacity=0.95, ()),
    "textStrong": style(~fontSize=30., ~color=Consts.Colors.dark, ~fontWeight=#_800, ()),
    "textLight": style(~fontSize=26., ~color=Consts.Colors.dark, ~fontWeight=#_200, ()),
  })
}

@react.component
let make = () =>
  <View style={styles["container"]}>
    <MeBackground style={styles["bg"]} />
    <View style={styles["contentWrapper"]}>
      <WindowSizeFilter.MMin>
        <View
          style={
            open Style
            style(
              ~position=#absolute,
              ~right=dp(-20.),
              ~bottom=dp(-80.),
              ~opacity=0.06,
              ~transform=[rotate(~rotate=6.->deg)],
              (),
            )
          }>
          <SVGLogo width={360.->Style.dp} height={360.->Style.dp} fill=Consts.Colors.lightest />
        </View>
      </WindowSizeFilter.MMin>
      <WindowSizeFilter.MMin style={ReactDOM.Style.make(~width="20%", ~height="1px", ())} />
      <View style={styles["content"]} accessibilityRole=#header>
        <Text style={styles["title"]}> {"MoOx"->React.string} </Text>
        <Text style={styles["subtitle"]}> {"Maxime Thirouin"->React.string} </Text>
        <Spacer />
        <SpacedView style={styles["textWrapper"]}>
          <Text style={styles["textStrong"]}>
            {j`Freelance Front-End Developer`->React.string}
          </Text>
          <Text style={styles["textLight"]}> {j`Mobile & Web`->React.string} </Text>
        </SpacedView>
      </View>
    </View>
  </View>
