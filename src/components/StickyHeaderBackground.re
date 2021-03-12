open Belt;
open ReactNative;

[@bs.module "react-native"]
external unstable_createElement:
  (
    string,
    {. "style": option(ReactNative.Style.t)},
    option(React.element)
  ) =>
  React.element =
  "unstable_createElement";

[@react.component]
let make = (~backdropFilter=?, ~style as s=?, ~children=?) =>
  unstable_createElement(
    "div",
    {
      "style":
        Some(
          Style.(
            arrayOption([|
              s,
              backdropFilter->Option.map(f =>
                unsafeStyle({"WebkitBackdropFilter": f, "backdropFilter": f})
              ),
            |])
          ),
        ),
    },
    children,
  );
