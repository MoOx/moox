@react.component
let make = (~accessibilityLabel=?, ~href, ~style as styl=?, ~activeStyle=?, ~children) =>
  <TextLink
    ?accessibilityLabel
    href
    style={
      open ReactNative
      open Style
      arrayOption([Some(style(~display=#flex, ~flexDirection=#column, ())), styl])
    }
    ?activeStyle>
    children
  </TextLink>
