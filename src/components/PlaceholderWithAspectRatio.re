open ReactNative;

let styles =
  Style.(StyleSheet.create({"container": style(~overflow=`hidden, ())}));

[@react.component]
let make = (~ratio, ~children, ()) => {
  <View
    pointerEvents=`boxNone
    style=Style.(
      style(~width=100.->pct, ~paddingBottom=(100. *. ratio)->pct, ())
    )>
    children
  </View>;
};
