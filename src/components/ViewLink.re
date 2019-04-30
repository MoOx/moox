[@react.component]
let make =
    (
      ~accessibilityLabel=?,
      ~href,
      ~style=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      ~children,
    ) =>
  <TextLink
    ?accessibilityLabel
    href
    style=BsReactNative.(
      Style.concat([
        Style.style(Style.[display(Flex), flexDirection(Column)]),
        style->Belt.Option.getWithDefault(Style.style([])),
      ])
    )
    ?activeStyle
    ?onMouseEnter
    ?onMouseLeave>
    children
  </TextLink>;
