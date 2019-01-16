[@bs.module "./TextLink"]
external reactClass: ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type jsProps = {
  [@bs.optional]
  accessibilityLabel: string,
  href: string,
  [@bs.optional]
  style: BsReactNative.Style.t,
  [@bs.optional]
  activeStyle: BsReactNative.Style.t,
  [@bs.optional]
  onMouseEnter: unit => unit,
  [@bs.optional]
  onMouseLeave: unit => unit,
};

let make =
    (
      ~accessibilityLabel=?,
      ~href,
      ~style=?,
      ~activeStyle=?,
      ~onMouseEnter=?,
      ~onMouseLeave=?,
      children,
    ) => {
  ReasonReact.wrapJsForReason(
    ~reactClass,
    ~props=
      jsProps(
        ~accessibilityLabel?,
        ~href,
        ~style?,
        ~activeStyle?,
        ~onMouseEnter?,
        ~onMouseLeave?,
        (),
      ),
    children,
  );
};
