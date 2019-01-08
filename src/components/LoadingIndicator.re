open BsReactNative;

let styles =
  StyleSheet.create(Style.{"container": style([justifyContent(Center)])});

let component = ReasonReact.statelessComponent("LoadingIndicator");

let make = _children => {
  ...component,
  render: _self =>
    <SpacedView vertical=XXL> <ActivityIndicator size=`large /> </SpacedView>,
};
