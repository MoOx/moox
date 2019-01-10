open BsReactNative;

let component = ReasonReact.statelessComponent("ButtonLink");

let styles =
  StyleSheet.create(
    Style.{
      "btnWrapper":
        style([
          flexGrow(0.),
          borderWidth(3.),
          borderColor(String("rgb(0, 112, 201)")),
          borderRadius(10.),
        ]),
      "btn":
        style([
          flexGrow(0.),
          fontSize(Float(24.)),
          fontWeight(`_300),
          paddingVertical(Pt(Spacer.space)),
          paddingHorizontal(Pt(Spacer.space *. 1.5)),
          color(String("rgb(0, 112, 201)")),
        ]),
    },
  );

let make =
    (
      ~href,
      ~style=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      children,
    ) => {
  ...component,
  render: _self =>
    <View style=styles##btnWrapper>
      <ViewLink
        href
        style={Style.concat([
          styles##btn,
          style->Belt.Option.getWithDefault(Style.style([])),
        ])}
        ?activeStyle
        ?onMouseEnter
        ?onMouseLeave>
        ...children
      </ViewLink>
    </View>,
};
