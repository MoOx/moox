open BsReactNative;

let component = ReasonReact.statelessComponent("ButtonLink");

let styles =
  StyleSheet.create(
    Style.{
      "btnWrapper":
        style([flexGrow(0.), borderWidth(2.), borderRadius(10.)]),
      "btn":
        style([
          flexGrow(0.),
          fontSize(Float(24.)),
          fontWeight(`_300),
          paddingVertical(Pt(Spacer.space)),
          paddingHorizontal(Pt(Spacer.space *. 1.5)),
        ]),
    },
  );

let make =
    (
      ~href,
      ~color="#efefff",
      ~style=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      children,
    ) => {
  ...component,
  render: _self =>
    <View
      style={Style.concat([
        styles##btnWrapper,
        Style.style([Style.borderColor(Style.String(color))]),
      ])}>
      <ViewLink
        href
        style={Style.concat([
          styles##btn,
          Style.style([Style.color(Style.String(color))]),
          style->Belt.Option.getWithDefault(Style.style([])),
        ])}
        ?activeStyle
        ?onMouseEnter
        ?onMouseLeave>
        ...children
      </ViewLink>
    </View>,
};
