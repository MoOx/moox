open BsReactNative;

let component = ReasonReact.statelessComponent("ButtonLink");

let styles =
  Style.(
    StyleSheet.create({
      "btnWrapper": style([borderWidth(2.), borderRadius(10.)]),
      "btn": style([fontSize(Float(24.)), fontWeight(`_300)]),
    })
  );

[@react.component]
let make =
    (
      ~href,
      ~color="#efefff",
      ~style=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      ~children,
      (),
    ) => {
  ReactCompat.useRecordApi({
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
          <SpacedView horizontal=L vertical=M> children </SpacedView>
        </ViewLink>
      </View>,
  });
};
