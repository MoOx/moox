open Belt;
open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  Style.(
    StyleSheet.create({
      "yearText":
        style([
          width(Pct(100.)),
          marginTop(Pt(20.)),
          textAlign(Center),
          fontSize(Float(22.)),
          fontWeight(`_700),
        ]),
      "item": style([flexGrow(1.), flexDirection(Row)]),
    })
  );

let tlSpacer =
  <>
    <Spacer size=L />
    <WindowSizeFilter.MMin> <Spacer size=XXL /> </WindowSizeFilter.MMin>
  </>;

[@react.component]
let make = (~items, ()) => {
  let latestYear =
    ref(
      items[0]
      ->Option.map(item =>
          item##dateEnd
          ->Js.undefinedToOption
          ->Option.getWithDefault(item##dateStart)
        )
      ->Option.getWithDefault(Js.Date.make()->Js.Date.toISOString)
      |> Js.String.slice(~from=0, ~to_=4),
    );
  <SpacedView horizontal=S vertical=None>
    {items
     ->Array.mapWithIndex((i, item) => {
         let year =
           item##dateEnd
           ->Js.undefinedToOption
           ->Option.getWithDefault(item##dateStart)
           |> Js.String.slice(~from=0, ~to_=4);
         let newYear = year !== latestYear^;
         latestYear := year;
         <React.Fragment key=item##id>
           {newYear
              ? <Text style=styles##yearText> year->React.string </Text>
              : React.null}
           <View style=styles##item>
             {i mod 2 == 1 ? tlSpacer : React.null}
             <ResumeTimelineEntry item />
             {i mod 2 == 0 ? tlSpacer : React.null}
           </View>
         </React.Fragment>;
       })
     ->React.array}
  </SpacedView>;
};
