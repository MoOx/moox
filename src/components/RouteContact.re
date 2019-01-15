open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "title":
        style([
          fontSize(Float(36.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "text": style([justifyContent(Center), alignItems(Center)]),
    },
  );

let component = ReasonReact.statelessComponent("RouteContact");

let make = _children => {
  ...component,
  render: _self =>
    <AppWrapper>
      <BsReactHelmet>
        <title>
          {("Contact - " ++ Consts.defaultTitle)->ReasonReact.string}
        </title>
      </BsReactHelmet>
      <Container>
        <Spacer />
        <Text style=styles##title> {"Contact" |> R.string} </Text>
        <Spacer />
        <View style=styles##text>
          <Text> {"Want to get in touch with me?" |> R.string} </Text>
          <br />
          <Text> {"hello (at) moox.io" |> R.string} </Text>
          <br />
          <Text> {"+33 6 78 13 54 39" |> R.string} </Text>
          <br />
          <Text>
            <a href="https://twitter.com/MoOx">
              {"twitter.com/MoOx" |> R.string}
            </a>
            <Text> {" (DM open)" |> R.string} </Text>
          </Text>
        </View>
        <Spacer size=XXL />
      </Container>
    </AppWrapper>,
};

let default = ReasonReact.wrapReasonForJs(~component, make);
