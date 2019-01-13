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
      "contentWrapper":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          left(Pct(40.)),
          right(Pt(0.)),
          flexDirection(Row),
        ]),
      "content": style([flex(1.), justifyContent(Center)]),
      "title":
        style([
          fontSize(Float(44.)),
          fontWeight(`Bold),
          color(String(Consts.Colors.light)),
        ]),
      "subtitle":
        style([
          fontSize(Float(16.)),
          fontWeight(`_200),
          color(String(Consts.Colors.light)),
        ]),
      "textWrapper": style([backgroundColor(String(Consts.Colors.light))]),
      "textStrong":
        style([
          fontSize(Float(30.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "textLight":
        style([
          fontSize(Float(26.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##container>
      <MeBackground style=styles##bg />
      <View style=styles##contentWrapper>
        <WindowSizeFilter.MMin
          style=Style.(style([width(Pct(20.)), height(Pt(1.))]))
        />
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
      </View>
    </View>,
};
