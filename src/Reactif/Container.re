open BsReactNative;

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

[@react.component]
let make =
    (~wrapperStyle=?, ~style as styl=?, ~maxWidth as maxW=840., ~children, ()) => {
  <View style=Style.(arrayOption([|Some(styles##wrapper), wrapperStyle|]))>
    <View
      style=Style.(
        arrayOption([|
          Some(styles##container),
          Some(style([maxWidth(Pt(maxW))])),
          styl,
        |])
      )>
      children
    </View>
  </View>;
};
