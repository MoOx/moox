open BsReactNative;

let styles =
  StyleSheet.create(
    {
      Style.{
        "background":
          style([borderRadius(6.), backgroundColor(String("#FBFCF8"))]),
      };
    },
  );

[@react.component]
let make = (~children, ()) => {
  <View style=styles##background> children </View>;
};
