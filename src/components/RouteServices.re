open ReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style(
          ~fontSize=28.,
          ~fontWeight=`bold,
          ~textAlign=`center,
          ~marginVertical=20.->dp,
          ~color=Consts.Colors.dark,
          (),
        ),
      "links":
        style(
          ~flexDirection=`row,
          ~justifyContent=`center,
          ~alignItems=`center,
          (),
        ),
    })
  );

[@react.component]
let make = () => {
  <AppWrapper>
    <Container maxWidth={1200.->ReactNative.Style.dp}>
      <Spacer />
      <Services />
      <Spacer />
    </Container>
    <Container> <Skills /> </Container>
  </AppWrapper>;
};

let default = make;
