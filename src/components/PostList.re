open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  Style.(
    StyleSheet.create({
      "flex": style([width(Pct(100.))]),
      "yearText":
        style([
          width(Pct(100.)),
          marginTop(Pt(20.)),
          textAlign(Center),
          fontSize(Float(22.)),
          fontWeight(`_700),
        ]),
    })
  );

[@react.component]
let make = (~posts, ()) => {
  let latestYear =
    ref(Js.Date.make()->Js.Date.getFullYear->Js.Float.toString);
  <>
    {posts
     |> Array.map(item => {
          let year = item##date |> Js.String.slice(~from=0, ~to_=4);
          let newYear = year !== latestYear^;
          latestYear := year;
          <View key=item##id style=styles##flex>
            {newYear
               ? <Text style=styles##yearText> year->React.string </Text>
               : React.null}
            <PostPreview item />
          </View>;
        })
     |> React.array}
  </>;
};
