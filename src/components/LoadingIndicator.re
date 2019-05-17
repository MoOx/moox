open BsReactNative;

let styles =
  Style.(StyleSheet.create({"container": style([justifyContent(Center)])}));

[@react.component]
let make = () => {
  <SpacedView vertical=XXL horizontal=None>
    <ActivityIndicator size=`large />
  </SpacedView>;
};
