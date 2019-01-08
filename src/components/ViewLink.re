[@bs.module "./TextLink"]
external reactClass: ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type jsProps = {
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
        ~href,
        ~style=
          BsReactNative.(
            Style.concat([
              Style.style(Style.[display(Flex), flexDirection(Column)]),
              style->Belt.Option.getWithDefault(Style.style([])),
            ])
          ),
        ~activeStyle?,
        ~onMouseEnter?,
        ~onMouseLeave?,
        (),
      ),
    children,
  );
};
