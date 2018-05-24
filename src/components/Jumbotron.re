open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles =
  StyleSheet.create(
    Style.(
      {
        "background":
          style([
            marginLeft(Auto),
            marginRight(Auto),
            paddingVertical(Pt(40.)),
            paddingHorizontal(Pt(20.)),
          ]),
        "head":
          style([
            flexDirection(Row),
            justifyContent(Center),
            alignItems(Center),
            marginBottom(Pt(20.)),
          ]),
        "title":
          style([
            textAlign(Center),
            fontSize(Float(36.)),
            fontWeight(`Bold),
            padding(Pt(20.)),
            color("#030303"),
          ]),
        "icons": style([textAlign(Center), lineHeight(60.)]),
        "icon": style([paddingHorizontal(Pt(26.))]),
        "text": style([padding(Pt(20.)), alignItems(Center)]),
        "textNode":
          style([
            fontSize(Float(28.)),
            color("#030303"),
            fontWeight(`_300),
          ]),
      }
    ),
  );

let make = _children => {
  ...component,
  render: _self =>
    <Container style=styles##background>
      <View style=styles##head>
        <Avatar />
        <Text style=styles##title> ("MoOx" |> text) </Text>
      </View>
      <View style=styles##text>
        <Text style=styles##textNode>
          ({j|I make apps with React.|j} |> text)
        </Text>
        <Text style=styles##textNode>
          ({j|Freelancer. Open Sourcer. Trainer.|j} |> text)
        </Text>
      </View>
    </Container>,
};
