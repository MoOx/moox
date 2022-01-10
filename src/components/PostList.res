open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  "flex": style(~width=100.->pct, ()),
}->StyleSheet.create

@react.component
let make = (~posts: array<BlogFrontend.t>, ()) => {
  let theme = T.useTheme()
  let latestYear = ref(Js.Date.make()->Js.Date.getFullYear->Js.Float.toString)
  <>
    {posts->Array.map(item => {
      let year =
        item.date
        ->Js.Null.toOption
        ->Option.map(s => s->Js.String2.slice(~from=0, ~to_=4))
        ->Option.getWithDefault("2000")
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
        <PostPreview item />
      </View>
    }) |> React.array}
  </>
}
