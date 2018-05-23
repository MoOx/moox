open BsReactNative;

open Helpers;

let styles =
  StyleSheet.create(
    Style.(
      {
        "title":
          style([
            fontSize(Float(36.)),
            fontWeight(`Bold),
            textAlign(Center),
            marginVertical(Pt(20.)),
            color("#030303"),
          ]),
        "text": 
          style([
            justifyContent(Center),
            alignItems(Center)
          ])
      }
    )
  );

let component = ReasonReact.statelessComponent("Home");

let make = _children => {
  ...component,
  render: _self =>
    <ScrollView>
      <CommonThings />
      <Head title={j|MoOx, Frontend UI Web & Mobile Developer.|j} />
      <Header />
      <Jumbotron />
      <Spacer />
      <Spacer />
      <Spacer />
      <Container>
        <Text style=styles##title> ("Contact" |> text) </Text>
        <Background>
          <View style=styles##text>
            <Text> ("Want to get in touch with me?" |> text) </Text>
            <br />
            <Text> ("hello (at) moox.io" |> text) </Text>
            <br />
            <Text> ("+33 6 78 13 54 39" |> text) </Text>
            <br />
            <Text>
              <a href="https://twitter.com/MoOx"> ("twitter.com/MoOx" |> text) </a>
              <Text> (" (DM open)" |> text) </Text>
            </Text>
          </View>
        </Background>
      </Container>
      <Footer />
    </ScrollView>
};

let default =
  ReasonReact.wrapReasonForJs(~component, make);
