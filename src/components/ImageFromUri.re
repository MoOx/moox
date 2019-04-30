open BsReactNative;

let component = ReasonReact.statelessComponent("ImageFromUri");

[@react.component]
let make = (~uri, ~resizeMode=?, ~style=?, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <Image
        ?resizeMode
        ?style
        source={`URI(Image.(imageURISource(~uri, ())))}
        // SSR workaround https://github.com/necolas/react-native-web/issues/543
        defaultSource={`URI(Image.(defaultURISource(~uri, ())))}
      />,
  });
