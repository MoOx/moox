open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
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
    })
  );

let component = ReasonReact.statelessComponent("RouteHome");

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
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
  });

let default = make;
