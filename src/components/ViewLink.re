[@react.component]
let make =
    (
      ~accessibilityLabel=?,
      ~href,
      ~style as styl=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      ~children,
    ) =>
  <TextLink
    ?accessibilityLabel
    href
    style=ReactNative.(
      Style.(
        arrayOption([|
          Some(style(~display=`flex, ~flexDirection=`column, ())),
          styl,
        |])
      )
    )
    ?activeStyle
    ?onMouseEnter
    ?onMouseLeave>
    children
  </TextLink>;
