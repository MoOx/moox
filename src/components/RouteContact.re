open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style([
          fontSize(Float(36.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "text": style([justifyContent(Center)]),
    })
  );

let component = ReasonReact.statelessComponent("RouteContact");

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <AppWrapper>
        <BsReactHelmet>
          <title>
            {("Contact - " ++ Consts.defaultTitle)->React.string}
          </title>
        </BsReactHelmet>
        <Container maxWidth=300.>
          <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
          <SpacedView horizontal=M vertical=L>
            <Text style=styles##title> "Contact"->React.string </Text>
            <Spacer size=L />
            <View style=styles##text>
              <Text style=Style.(style([textAlign(Center)]))>
                "Want to get in touch with me?\nIt's easy."->React.string
              </Text>
              <Spacer size=XL />
              <Text>
                <Text> "Email: "->React.string </Text>
                <Text> "hello (at) moox.io"->React.string </Text>
              </Text>
              <br />
              <Text>
                <Text> "Phone: "->React.string </Text>
                <UnderlinedTextLink href="tel:+33678135439">
                  "+33 6 78 13 54 39"->React.string
                </UnderlinedTextLink>
              </Text>
              <br />
              <Text>
                <Text> "Twitter DM: "->React.string </Text>
                <UnderlinedTextLink href="https://twitter.com/MoOx">
                  "https://twitter.com/MoOx"->React.string
                </UnderlinedTextLink>
              </Text>
            </View>
          </SpacedView>
          <Spacer size=XL />
          <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
        </Container>
      </AppWrapper>,
  });

let default = make;
