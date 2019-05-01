open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  Style.(
    StyleSheet.create({
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
    })
  );

let component = ReasonReact.statelessComponent("ResumeTimeline");

let tlSpacer =
  <>
    <Spacer size=L />
    <WindowSizeFilter.MMin> <Spacer size=XXL /> </WindowSizeFilter.MMin>
  </>;

[@react.component]
let make = (~items, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self => {
      let latestYear =
        ref(items[0]##dateStart |> Js.String.slice(~from=0, ~to_=4));
      <SpacedView horizontal=S>
        {items
         ->Belt.Array.mapWithIndex((i, item) => {
             let year = item##dateStart |> Js.String.slice(~from=0, ~to_=4);
             let newYear = year !== latestYear^;
             latestYear := year;
             <View key=item##id style=styles##flex>
               {newYear
                  ? <Text style=styles##yearText> year->React.string </Text>
                  : React.null}
               <View style=styles##item>
                 {i mod 2 == 1 ? tlSpacer : React.null}
                 <ResumeTimelineEntry item />
                 {i mod 2 == 0 ? tlSpacer : React.null}
               </View>
             </View>;
           })
         ->React.array}
      </SpacedView>;
    },
  });
