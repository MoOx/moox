open Belt
open ReactNative

let imageRatio = 240. /. 350.

let styles = {
  open Style
  StyleSheet.create({
    "flex": style(~width=100.->pct, ()),
    "yearText": style(
      ~width=100.->pct,
      ~marginTop=20.->dp,
      ~textAlign=#center,
      ~fontSize=22.,
      ~fontWeight=#_700,
      (),
    ),
  })
}

@react.component
let make = (~posts: array<BlogFrontend.t>, ()) => {
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
        {newYear ? <Text style={styles["yearText"]}> {year->React.string} </Text> : React.null}
        <PostPreview item />
      </View>
    }) |> React.array}
  </>
}
