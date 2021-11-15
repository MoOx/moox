@react.component
let make = (
  ~accessibilityLabel=?,
  ~href,
  ~style as styl=?,
  ~activeStyle=?,
  ~children,
  ~onPress: option<ReactNative.Event.pressEvent => unit>=?,
) =>
  <TextLink
    ?accessibilityLabel
    href
    style={
      open ReactNative
      open Style
      arrayOption([Some(style(~display=#flex, ~flexDirection=#column, ())), styl])
    }
    ?activeStyle
    ?onPress>
    children
  </TextLink>
