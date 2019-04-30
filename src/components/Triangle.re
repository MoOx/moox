open BsReactNative;

let component = ReasonReact.statelessComponent("Triangle");

let coef = 2. *. 0.8660254;

[@react.component]
let make =
    (~height=50., ~color=Consts.Colors.light, ~style=Style.style([]), ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View
        style={Style.concat([
          Style.style([
            Style.width(Pt(0.)),
            Style.height(Pt(0.)),
            Style.borderTopWidth(0.),
            Style.borderTopColor(String("transparent")),
            Style.borderLeftWidth(height /. coef),
            Style.borderLeftColor(String("transparent")),
            Style.borderRightWidth(height /. coef),
            Style.borderRightColor(String("transparent")),
            Style.borderBottomWidth(height),
            Style.borderBottomColor(String(color)),
          ]),
          style,
        ])}
      />,
  });
