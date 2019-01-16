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
      "textWrapper":
        style([
          backgroundColor(String(Consts.Colors.lightest)),
          opacity(Float(0.95)),
        ]),
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
  render: _self => {
    <View style=styles##container>
      <MeBackground style=styles##bg />
      <View style=styles##contentWrapper>
        <WindowSizeFilter.MMin
          style=Style.(
            style([
              position(Absolute),
              right(Pt(-20.)),
              bottom(Pt(-80.)),
              Transform.make(~rotate="6deg", ()),
            ])
          )>
          <SVGLogo
            width=360.
            height=360.
            fill=Consts.Colors.lightest
            style=Style.(style([opacity(Float(0.06))]))
          />
        </WindowSizeFilter.MMin>
        <WindowSizeFilter.MMin
          style=Style.(style([width(Pct(20.)), height(Pt(1.))]))
        />
        <ViewWeb style=styles##content accessibilityRole="heading">
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
        </ViewWeb>
      </View>
    </View>;
  },
};
