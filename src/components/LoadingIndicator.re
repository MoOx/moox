open BsReactNative;

let styles =
  Style.(StyleSheet.create({"container": style([justifyContent(Center)])}));

let component = ReasonReact.statelessComponent("LoadingIndicator");

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <SpacedView vertical=XXL>
        <ActivityIndicator size=`large />
      </SpacedView>,
  });
