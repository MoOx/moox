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
      "text": style([justifyContent(Center)]),
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
      <Container maxWidth=300.>
        <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
        <SpacedView horizontal=M vertical=L>
          <Text style=styles##title> "Contact"->ReasonReact.string </Text>
          <Spacer size=L />
          <View style=styles##text>
            <Text style=Style.(style([textAlign(Center)]))>
              "Want to get in touch with me?\nIt's easy."->ReasonReact.string
            </Text>
            <Spacer size=XL />
            <Text>
              <Text> "Email: "->ReasonReact.string </Text>
              <Text> "hello (at) moox.io"->ReasonReact.string </Text>
            </Text>
            <br />
            <Text>
              <Text> "Phone: "->ReasonReact.string </Text>
              <UnderlinedTextLink href="tel:+33678135439">
                "+33 6 78 13 54 39"->ReasonReact.string
              </UnderlinedTextLink>
            </Text>
            <br />
            <Text>
              <Text> "Twitter DM: "->ReasonReact.string </Text>
              <UnderlinedTextLink href="https://twitter.com/MoOx">
                "https://twitter.com/MoOx"->ReasonReact.string
              </UnderlinedTextLink>
            </Text>
          </View>
        </SpacedView>
        <Spacer size=XL />
        <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
      </Container>
    </AppWrapper>,
};

let default = ReasonReact.wrapReasonForJs(~component, make);
