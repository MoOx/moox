open BsReactNative;

let styles =
  StyleSheet.create(Style.{"container": style([overflow(Hidden)])});

let component = ReasonReact.statelessComponent("PlaceholderWithAspectRatio");

let make = (~ratio, children) => {
  ...component,
  render: _self =>
    <View
      pointerEvents=`boxNone
      style={Style.style([
        Style.width(Pct(100.)),
        Style.paddingBottom(Pct(100. *. ratio)),
      ])}>
      ...children
    </View>,
};
