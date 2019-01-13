open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
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
      "bullet": style([]),
      "title": style([fontSize(Float(22.))]),
    },
  );

let component = ReasonReact.statelessComponent("PostPreview");

let make = (~item: T.partialContentItem, _) => {
  ...component,
  render: _self => {
    let href = "/blog/" ++ item##id ++ "/";
    <View key=item##id style=styles##block>
      <Text style=styles##text>
        <Text style=styles##bullet> {{j|•|j} |> R.string} </Text>
        <Spacer size=S />
        <UnderlinedTextLink style=styles##title href>
          {item##title |> R.string}
        </UnderlinedTextLink>
        <Spacer size=S />
        {switch (Js.Undefined.toOption(item##lang)) {
         | None => R.null
         | Some(lang) => <Text> {"[" ++ lang ++ "] " |> R.string} </Text>
         }}
      </Text>
    </View>;
  },
};
