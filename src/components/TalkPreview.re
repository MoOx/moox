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

let component = ReasonReact.statelessComponent("TalkPreview");

[@react.component]
let make = (~item: T.partialContentItem, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self => {
      let href = "/talk/" ++ item##id ++ "/";
      <View key=item##id style=styles##block>
        <Text style=styles##text>
          <Text> {j|•|j}->ReasonReact.string </Text>
          <Spacer size=S />
          <UnderlinedTextLink style=styles##title href>
            {item##title->ReasonReact.string}
            <small>
              {switch (Js.Undefined.toOption(item##conference)) {
               | None => ReasonReact.null
               | Some(conference) =>
                 <Text> {(" @ " ++ conference)->ReasonReact.string} </Text>
               }}
            </small>
          </UnderlinedTextLink>
          <Spacer size=S />
          {switch (Js.Undefined.toOption(item##lang)) {
           | None => ReasonReact.null
           | Some(lang) =>
             <Text> {("[" ++ lang ++ "] ")->ReasonReact.string} </Text>
           }}
        </Text>
      </View>;
    },
  });
