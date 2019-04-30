open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

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
  ReactCompat.useRecordApi({
    ...component,
    render: _self => <View style=styles##background> children </View>,
  });
};
