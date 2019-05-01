open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "block": style([flex(1.), flexDirection(Row)]),
      "imageContainer": style([overflow(Hidden)]),
      "image":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          right(Pt(0.)),
          left(Pt(0.)),
        ]),
      "row": style([flexDirection(Row), justifyContent(SpaceBetween)]),
      "text":
        style([
          flexDirection(Row),
          flex(1.),
          padding(Pt(20.)),
          alignItems(FlexStart),
          lineHeight(28.),
          color(String(Consts.Colors.dark)),
        ]),
      "title": style([fontSize(Float(22.))]),
    })
  );

[@react.component]
let make = (~item: T.partialContentItem, ()) => {
  let href = "/blog/" ++ item##id ++ "/";
  <View key=item##id style=styles##block>
    <Text style=styles##text>
      <Text> {j|•|j}->React.string </Text>
      <Spacer size=S />
      <UnderlinedTextLink style=styles##title href>
        {item##title->React.string}
      </UnderlinedTextLink>
      <Spacer size=S />
      {switch (Js.Undefined.toOption(item##lang)) {
       | None => React.null
       | Some(lang) => <Text> {("[" ++ lang ++ "] ")->React.string} </Text>
       }}
    </Text>
  </View>;
};
