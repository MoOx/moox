open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "separator":
        style(
          ~height=Predefined.hairlineWidth->pt,
          ~backgroundColor=Predefined.Colors.separator,
          (),
        ),
    })
  );

[@react.component]
let make = (~style as s=?) => {
  <View style=Style.(arrayOption([|Some(styles##separator), s|])) />;
};
