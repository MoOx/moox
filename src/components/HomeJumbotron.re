open BsReactNative;

let component = ReasonReact.statelessComponent("Jumbotron");

let triangleHeight = 80.;

let styles =
  StyleSheet.create(
    Style.{
      "container":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
          backgroundColor(String("#020202")),
          minHeight(Pt(450.)),
        ]),
      "bg":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          right(Pct(50.)),
        ]),
      "content":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          left(Pct(50.)),
          right(Pt(0.)),
          justifyContent(Center),
        ]),
      "title":
        style([
          fontSize(Float(44.)),
          fontWeight(`Bold),
          color(String("#fff")),
        ]),
      "subtitle":
        style([
          fontSize(Float(16.)),
          fontWeight(`_200),
          color(String("#fff")),
        ]),
      "textWrapper": style([backgroundColor(String("#fff"))]),
      "textStrong":
        style([
          fontSize(Float(32.)),
          color(String("#000F2B")),
          fontWeight(`_800),
        ]),
      "textLight":
        style([
          fontSize(Float(28.)),
          color(String("#000F2B")),
          fontWeight(`_200),
        ]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##container>
      <MeBackground style=styles##bg />
      <View style=styles##content>
        <Text style=styles##title> {"MoOx" |> R.string} </Text>
        <Text style=styles##subtitle> {"Maxime Thirouin" |> R.string} </Text>
        <Spacer />
        <SpacedView style=styles##textWrapper horizontal=M vertical=M>
          <Text style=styles##textStrong>
            {{j|Freelance Front-End Developer|j} |> R.string}
          </Text>
          <Text style=styles##textLight>
            {{j|Mobile & Web|j} |> R.string}
          </Text>
        </SpacedView>
      </View>
    </View>,
};
