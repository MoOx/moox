open BsReactNative;

let component = ReasonReact.statelessComponent("UnderlinedTextLink");

let styles =
  StyleSheet.create(
    {
      Style.{
        "link":
          style([
            textDecorationLine(Underline),
            textDecorationStyle(Solid),
          ]),
      };
    },
  );

[@react.component]
let make = (~href, ~style=?, ~children, ()) => {
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <TextLink
        href
        style={
          switch (style) {
          | None => styles##link
          | Some(style) => Style.concat([styles##link, style])
          }
        }>
        children
      </TextLink>,
  });
};
