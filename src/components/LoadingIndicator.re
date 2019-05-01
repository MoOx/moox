open BsReactNative;

let styles =
  Style.(StyleSheet.create({"container": style([justifyContent(Center)])}));

[@react.component]
let make = () => {
  <SpacedView vertical=XXL> <ActivityIndicator size=`large /> </SpacedView>;
};
