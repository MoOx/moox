open ReactNative
open ReactMultiversal

let triangleHeight = 80.

let styles = {
  open Style
  StyleSheet.create({
    "container": style(~alignItems=#center, ()),
    "icons": style(~textAlign=#center, ~lineHeight=60., ()),
    "icon": style(~paddingHorizontal=26.->dp, ()),
    "text": style(
      ~backgroundColor=Consts.Colors.light,
      ~padding=20.->dp,
      ~alignItems=#center,
      ~width=100.->pct,
      (),
    ),
    "textNodeStrong": style(~fontSize=32., ~color=Consts.Colors.dark, ~fontWeight=#_800, ()),
    "textNode": style(~fontSize=28., ~color=Consts.Colors.dark, ~fontWeight=#_200, ()),
  })
}

let currentYear = Js.Date.getFullYear(Js.Date.make())->int_of_float

@react.component
let make = () =>
  <div
    style={ReactDOM.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~flex="1 1 auto",
      ~background="linear-gradient(hsl(219.1, 100%, 8.5%), hsl(219.1, 40%, 8.5%))",
      (),
    )}>
    <SpacedView
      vertical=L
      style={
        open Style
        style(~width=100.->pct, ~overflow=#hidden, ~alignItems=#flexStart, ())
      }>
      <View
        style={
          open Style
          style(
            ~width=100.->pct,
            ~flexDirection=#row,
            ~justifyContent=#spaceAround,
            ~alignItems=#flexEnd,
            (),
          )
        }>
        ResumeJumbotronLarge.moox <Spacer /> ResumeJumbotronLarge.meta
      </View>
      <Spacer size=L />
      <View
        style={
          open Style
          style(~position=#absolute, ~bottom=40.->dp, ~left=80.->pct, ())
        }>
        <View
          style={
            open Style
            style(~left=-50.->pct, ())
          }>
          <Me />
        </View>
      </View>
      <View
        style={
          open Style
          style(
            ~zIndex=2,
            ~width=100.->pct,
            ~flexDirection=#row,
            ~justifyContent=#spaceAround,
            ~alignItems=#flexEnd,
            (),
          )
        }>
        <View>
          ResumeJumbotronLarge.proForXyears <Spacer /> ResumeJumbotronLarge.firstMobileApp
        </View>
        ResumeJumbotronLarge.firstWebsite
      </View>
    </SpacedView>
  </div>
