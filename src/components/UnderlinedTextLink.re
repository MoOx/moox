open BsReactNative;

let styles =
  StyleSheet.create(
    {
      Style.{
        "link":
          style([
            textDecorationLine(Underline),
            textDecorationStyle(Solid),
          ]),
      };
    },
  );

[@react.component]
let make = (~href, ~style as styl=?, ~children, ()) =>
  <TextLink href style=Style.(arrayOption([|Some(styles##link), styl|]))>
    children
  </TextLink>;
