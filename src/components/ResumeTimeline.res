open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

let imageRatio = 240. /. 350.

let styles = {
  "item": style(~flexGrow=1., ~flexShrink=1., ~flexDirection=#row, ()),
}->StyleSheet.create

let tlSpacer =
  <> <Spacer size=L /> <WindowSizeFilter.MMin> <Spacer size=XXL /> </WindowSizeFilter.MMin> </>

@react.component
let make = (~items: array<ResumeFrontend.t>, ()) => {
  let todayDateOnlyAsISOString =
    Js.Date.make()->Js.Date.toISOString->Js.String.slice(~from=0, ~to_=10)
  // let theme = T.useTheme()
  items
  ->Js.Array2.sortInPlaceWith((a, b) => {
    let aDate =
      a.dateEnd->Js.Null.toOption->Option.getWithDefault(todayDateOnlyAsISOString)
        |> Js.String.slice(~from=0, ~to_=10)
    let bDate =
      b.dateEnd->Js.Null.toOption->Option.getWithDefault(todayDateOnlyAsISOString)
        |> Js.String.slice(~from=0, ~to_=10)
    if aDate < bDate {
      1
    } else if aDate > bDate {
      -1
    } else {
      0
    }
  })
  ->ignore
  let latestYear = ref(
    (Js.Date.now()->Js.Date.fromFloat->Js.Date.getFullYear +. 1.)->Js.Float.toFixed,
  )
  <SpacedView horizontal=S vertical=None>
    {items
    ->Array.mapWithIndex((i, item) => {
      let year =
        item.dateEnd->Js.Null.toOption->Option.getWithDefault(todayDateOnlyAsISOString)
          |> Js.String.slice(~from=0, ~to_=4)
      let newYear = year !== latestYear.contents
      latestYear := year
      <React.Fragment key=item.id>
        {newYear
          ? <Center>
              <SpacedView>
                <Text style={array([Font.iosEm["title1"], T.stylesDark["text"]])}>
                  {year->React.string}
                </Text>
              </SpacedView>
            </Center>
          : React.null}
        <View style={styles["item"]}>
          {mod(i, 2) == 1 ? tlSpacer : React.null}
          <ResumeTimelineEntry item />
          {mod(i, 2) == 0 ? tlSpacer : React.null}
        </View>
      </React.Fragment>
    })
    ->React.array}
  </SpacedView>
}
