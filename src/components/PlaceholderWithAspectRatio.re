open BsReactNative;

let styles =
  Style.(StyleSheet.create({"container": style([overflow(Hidden)])}));

let component = ReasonReact.statelessComponent("PlaceholderWithAspectRatio");

[@react.component]
let make = (~ratio, ~children, ()) => {
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View
        pointerEvents=`boxNone
        style={Style.style([
          Style.width(Pct(100.)),
          Style.paddingBottom(Pct(100. *. ratio)),
        ])}>
        children
      </View>,
  });
};
