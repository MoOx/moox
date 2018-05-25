open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles =
  StyleSheet.create(
    Style.(
      {
        "background":
          style([borderRadius(6.), backgroundColor(String("#FBFCF8"))]),
      }
    ),
  );

let make = children => {
  ...component,
  render: _self => <View style=styles##background> ...children </View>,
};
