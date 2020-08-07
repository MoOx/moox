open ReactNative;

let imageRatio = 240. /. 350.;

let styles =
  Style.(
    StyleSheet.create({
      "flex": style(~width=100.->pct, ()),
      "yearText":
        style(
          ~width=100.->pct,
          ~marginTop=20.->dp,
          ~textAlign=`center,
          ~fontSize=22.,
          ~fontWeight=`_700,
          (),
        ),
    })
  );

[@react.component]
let make = (~talks, ()) => {
  let latestYear =
    ref(Js.Date.make()->Js.Date.getFullYear->Js.Float.toString);
  <>
    {talks
     |> Array.map(item => {
          let year = item##date |> Js.String.slice(~from=0, ~to_=4);
          let newYear = year !== latestYear^;
          latestYear := year;
          <View key=item##id style=styles##flex>
            {newYear
               ? <Text style=styles##yearText> year->React.string </Text>
               : React.null}
            <TalkPreview item />
          </View>;
        })
     |> React.array}
  </>;
};
