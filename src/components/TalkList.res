open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  "flex": style(~width=100.->pct, ()),
}->StyleSheet.create

@react.component
let make = (~talks: array<TalksFrontend.t>, ()) => {
  let theme = T.useTheme()
  let latestYear = ref(Js.Date.make()->Js.Date.getFullYear->Js.Float.toString)
  <>
    {talks->Array.map(item => {
      let year = item.date |> Js.String.slice(~from=0, ~to_=4)
      let newYear = year !== latestYear.contents
      latestYear := year
      <View key=item.id style={styles["flex"]}>
        {newYear
          ? <View style={Predefined.styles["center"]}>
              <Text style={array([Font.iosEm["title2"], theme.styles["text"]])}>
                {year->React.string}
              </Text>
            </View>
          : React.null}
        <TalkPreview item />
      </View>
    }) |> React.array}
  </>
}
