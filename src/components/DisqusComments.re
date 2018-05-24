[@bs.module "react-disqus-comments"]
external disqusComments : ReasonReact.reactClass = "default";

let make =
    (
      ~shortname: string,
      ~identifier: option(string)=?,
      ~title: option(string)=?,
      ~url: option(string)=?,
      ~category_id: option(string)=?,
      _children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=disqusComments,
    ~props={
      "shortname": shortname,
      "identifier": Js.Nullable.fromOption(identifier),
      "title": Js.Nullable.fromOption(title),
      "url": Js.Nullable.fromOption(url),
      "category_id": Js.Nullable.fromOption(category_id),
    },
    [||],
  );
