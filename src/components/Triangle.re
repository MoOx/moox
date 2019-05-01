open BsReactNative;

let coef = 2. *. 0.8660254;

[@react.component]
let make =
    (
      ~height as h=50.,
      ~color as colour=Consts.Colors.light,
      ~style as styl=?,
      (),
    ) => {
  <View
    style=Style.(
      arrayOption([|
        Some(
          style([
            width(Pt(0.)),
            height(Pt(0.)),
            borderTopWidth(0.),
            borderTopColor(String("transparent")),
            borderLeftWidth(h /. coef),
            borderLeftColor(String("transparent")),
            borderRightWidth(h /. coef),
            borderRightColor(String("transparent")),
            borderBottomWidth(h),
            borderBottomColor(String(colour)),
          ]),
        ),
        styl,
      |])
    )
  />;
};
