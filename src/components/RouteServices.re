open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "title":
        style([
          fontSize(Float(28.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "links":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("RouteHome");

let make = _ => {
  ...component,
  render: _self =>
    <AppWrapper>
      <HomeJumbotron />
      <Container maxWidth=1200.>
        <Spacer />
        <Services />
        <Spacer />
      </Container>
      <Container> <Skills /> </Container>
    </AppWrapper>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make());
