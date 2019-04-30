[@bs.module "./TextLink"] [@react.component]
external make:
  (
    ~accessibilityLabel: string=?,
    ~href: string,
    ~style: BsReactNative.Style.t=?,
    ~activeStyle: BsReactNative.Style.t=?,
    ~onMouseEnter: unit => unit=?,
    ~onMouseLeave: unit => unit=?,
    ~children: React.element=?
  ) =>
  React.element =
  "default";
