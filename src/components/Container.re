open BsReactNative;

let component = ReasonReact.statelessComponent("Container");

let styles =
  Style.(
    StyleSheet.create({
      "wrapper":
        style([
          flex(1.),
          width(Pct(100.)),
          overflow(Hidden),
          alignItems(Center),
        ]),
      "container":
        style([
          justifyContent(Center),
          flex(1.),
          width(Pct(100.)),
          paddingHorizontal(Pt(Spacer.space /. 4.)),
        ]),
    })
  );

let noStyle = Style.style([]);

[@react.component]
let make =
    (
      ~wrapperStyle=?,
      ~style=?,
      ~backgroundColor=Some(Consts.Colors.light),
      ~maxWidth=840.,
      ~children,
      (),
    ) => {
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View
        style={Style.concat([
          styles##wrapper,
          backgroundColor->Belt.Option.mapWithDefault(noStyle, bg =>
            Style.style([Style.backgroundColor(Style.String(bg))])
          ),
          wrapperStyle->Belt.Option.getWithDefault(noStyle),
        ])}>
        <View
          style={Style.concat([
            styles##container,
            Style.style([Style.maxWidth(Pt(maxWidth))]),
            style->Belt.Option.getWithDefault(noStyle),
          ])}>
          children
        </View>
      </View>,
  });
};
