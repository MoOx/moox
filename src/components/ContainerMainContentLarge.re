open BsReactNative;

let component = ReasonReact.statelessComponent("ContainerMainContentLarge");

let styles =
  StyleSheet.create(
    Style.{"container": style([flex(2.), flexBasis(Pt(800.))])},
  );

let make = children => {
  ...component,
  render: _self =>
    <ViewWeb accessibilityRole="main" style=styles##container>
      ...children
    </ViewWeb>,
};
