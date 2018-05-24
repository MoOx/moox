open BsReactNative;

let component = ReasonReact.statelessComponent("Container");

let styles =
  StyleSheet.create(
    Style.(
      {
        "wrapper":
          style([flexGrow(1.), width(Pct(100.)), alignItems(Center)]),
        "container":
          style([flexGrow(1.), width(Pct(100.)), maxWidth(Pt(840.))]),
      }
    ),
  );

let make = (~wrapperStyle=?, ~style=?, children) => {
  ...component,
  render: _self =>
    <View
      style=(
        switch (wrapperStyle) {
        | None => styles##wrapper
        | Some(wrapperStyle) => Style.concat([styles##wrapper, wrapperStyle])
        }
      )>
      <View
        style=(
          switch (style) {
          | None => styles##container
          | Some(style) => Style.concat([styles##container, style])
          }
        )>
        ...children
      </View>
    </View>,
};
