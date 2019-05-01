open BsReactNative;

let component = ReasonReact.statelessComponent("ButtonLink");

let styles =
  Style.(
    StyleSheet.create({
      "btnWrapper": style([borderWidth(2.), borderRadius(10.)]),
      "btn": style([fontSize(Float(18.)), fontWeight(`_300)]),
    })
  );

[@react.component]
let make =
    (
      ~href,
      ~color as colour="#efefff",
      ~style as styl=?,
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
        style=Style.(
          array([|
            styles##btnWrapper,
            style([borderColor(String(colour))]),
          |])
        )>
        <ViewLink
          href
          style=Style.(
            arrayOption([|
              Some(styles##btn),
              Some(style([color(String(colour))])),
              styl,
            |])
          )
          ?activeStyle
          ?onMouseEnter
          ?onMouseLeave>
          <SpacedView horizontal=M vertical=S> children </SpacedView>
        </ViewLink>
      </View>,
  });
};
