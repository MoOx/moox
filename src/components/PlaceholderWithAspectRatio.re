open BsReactNative;

let styles =
  Style.(StyleSheet.create({"container": style([overflow(Hidden)])}));

[@react.component]
let make = (~ratio, ~children, ()) => {
  <View
    pointerEvents=`boxNone
    style={Style.style([
      Style.width(Pct(100.)),
      Style.paddingBottom(Pct(100. *. ratio)),
    ])}>
    children
  </View>;
};
