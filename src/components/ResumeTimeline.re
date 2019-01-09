open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  StyleSheet.create(
    Style.{
      "flex": style([flex(1.)]),
      "yearText":
        style([
          width(Pct(100.)),
          marginTop(Pt(20.)),
          textAlign(Center),
          fontSize(Float(22.)),
          fontWeight(`_700),
        ]),
      "item": style([flex(1.), flexDirection(Row)]),
    },
  );

let component = ReasonReact.statelessComponent("ResumeTimeline");

let tlSpacer =
  <>
    <Spacer size=L />
    <div className="device-large"> <Spacer size=XXL /> </div>
  </>;

let make = (~items, _) => {
  ...component,
  render: _self => {
    let latestYear =
      ref(items[0]##dateStart |> Js.String.slice(~from=0, ~to_=4));
    <SpacedView horizontal=S>
      {items->Belt.Array.mapWithIndex((i, item) => {
         let year = item##dateStart |> Js.String.slice(~from=0, ~to_=4);
         let newYear = year !== latestYear^;
         latestYear := year;
         <View key=item##id style=styles##flex>
           {newYear ?
              <Text style=styles##yearText> {year |> R.string} </Text> : R.null}
           <View style=styles##item>
             {i mod 2 == 1 ? tlSpacer : ReasonReact.null}
             <ResumeTimelineEntry item />
             {i mod 2 == 0 ? tlSpacer : ReasonReact.null}
           </View>
         </View>;
       })
       |> ReasonReact.array}
    </SpacedView>;
  },
};
