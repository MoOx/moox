open Belt
open ReactNative
open ReactMultiversal

let imageRatio = 240. /. 350.

let styles = {
  open Style
  StyleSheet.create({
    "yearText": style(
      ~width=100.->pct,
      ~marginTop=20.->dp,
      ~textAlign=#center,
      ~fontSize=22.,
      ~fontWeight=#_700,
      (),
    ),
    "item": style(~flexGrow=1., ~flexDirection=#row, ()),
  })
}

let tlSpacer =
  <> <Spacer size=L /> <WindowSizeFilter.MMin> <Spacer size=XXL /> </WindowSizeFilter.MMin> </>

@react.component
let make = (~items: array<ResumeFrontend.t>, ()) => {
  let latestYear = ref(
    (Js.Date.now()->Js.Date.fromFloat->Js.Date.getFullYear +. 1.)->Js.Float.toFixed,
  )
  <SpacedView horizontal=S vertical=None>
    {items
    ->Array.mapWithIndex((i, item) => {
      let year =
        item.dateEnd->Js.Null.toOption->Option.getWithDefault(item.dateStart)
          |> Js.String.slice(~from=0, ~to_=4)
      let newYear = year !== latestYear.contents
      latestYear := year
      <React.Fragment key=item.id>
        {newYear ? <Text style={styles["yearText"]}> {year->React.string} </Text> : React.null}
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
