open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  StyleSheet.create(
    Style.(
      {
        "list": style([alignItems(FlexStart), margin(Pt(20.))]),
        "flex": style([width(Pct(100.))]),
        "yearText":
          style([
            width(Pct(100.)),
            marginTop(Pt(20.)),
            textAlign(Center),
            fontSize(Float(22.)),
            fontWeight(`_700),
          ]),
      }
    ),
  );

let component = ReasonReact.statelessComponent("TalkList");

let make = (~talks, _) => {
  ...component,
  render: _self => {
    let latestYear = ref(talks[0]##date |> Js.String.slice(~from=0, ~to_=4));
    <View style=styles##list>
      (
        talks
        |> Array.map(item => {
             let year = item##date |> Js.String.slice(~from=0, ~to_=4);
             let newYear = year !== latestYear^;
             latestYear := year;
             <View key=item##id style=styles##flex>
               (
                 newYear ?
                   <Text style=styles##yearText> (year |> R.string) </Text> :
                   R.null
               )
               <TalkPreview item />
             </View>;
           })
        |> ReasonReact.array
      )
    </View>;
  },
};
