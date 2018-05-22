open BsReactNative;

let component = ReasonReact.statelessComponent("Footer");

let styles =
  StyleSheet.create(Style.({"footer": style([marginTop(Pt(60.))])}));

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##footer>
      <Container> <Text> (ReasonReact.stringToElement("")) </Text> </Container>
    </View>
};
