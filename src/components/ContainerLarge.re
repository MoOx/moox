open BsReactNative;

let component = ReasonReact.statelessComponent("ContainerLarge");

let styles =
  StyleSheet.create(
    Style.{
      "wrapper":
        style([
          flex(1.),
          width(Pct(100.)),
          alignItems(Center),
          backgroundColor(String("#fefefe")),
        ]),
      "container":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(SpaceBetween),
          flex(1.),
          width(Pct(100.)),
          maxWidth(Pt(1200.)),
        ]),
    },
  );

let make = (~wrapperStyle=?, ~style=?, children) => {
  ...component,
  render: _self =>
    <View
      style={
        switch (wrapperStyle) {
        | None => styles##wrapper
        | Some(wrapperStyle) => Style.concat([styles##wrapper, wrapperStyle])
        }
      }>
      <View
        style={
          switch (style) {
          | None => styles##container
          | Some(style) => Style.concat([styles##container, style])
          }
        }>
        ...children
      </View>
    </View>,
};
