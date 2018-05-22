[@bs.module "../../../../src/components/Link"]
external link : ReasonReact.reactClass = "default";

let make =
    (
      ~href: option(string)=?,
      ~style: option(BsReactNative.Style.t)=?,
      ~activeStyle: option(BsReactNative.Style.t)=?,
      ~className: option(string)=?,
      ~activeClassName: option(string)=?,
      children
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=link,
    ~props={
      "href": Js.Nullable.from_opt(href),
      "style": Js.Nullable.from_opt(style),
      "activeStyle": Js.Nullable.from_opt(activeStyle),
      "className": Js.Nullable.from_opt(className),
      "activeClassName": Js.Nullable.from_opt(activeClassName)
    },
    children
  );
