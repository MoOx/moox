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

[@react.component]
let make = () => {
  <AppWrapper>
    <Container maxWidth=1200.> <Spacer /> <Services /> <Spacer /> </Container>
    <Container> <Skills /> </Container>
  </AppWrapper>;
};

let default = make;
