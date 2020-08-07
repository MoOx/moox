open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "link":
        style(
          ~textDecorationLine=`underline,
          ~textDecorationStyle=`solid,
          (),
        ),
    })
  );

[@react.component]
let make = (~href, ~style as styl=?, ~children, ()) =>
  <TextLink href style=Style.(arrayOption([|Some(styles##link), styl|]))>
    children
  </TextLink>;
