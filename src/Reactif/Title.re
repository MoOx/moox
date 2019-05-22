open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style(
          ~fontSize=28.,
          ~fontWeight=`_600,
          ~color=Consts.Colors.darkest,
          (),
        ),
    })
  );

[@react.component]
let make = (~style as s=?, ~children) => {
  <Text style=Style.(arrayOption([|Some(styles##title), s|]))>
    children
  </Text>;
};
