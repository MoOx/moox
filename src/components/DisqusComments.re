[@bs.module "react-disqus-comments"] external disqusComments : ReasonReact.reactClass = "default";

let make = (
  ~shortname: string,
  ~identifier: option(string)=?,
  ~title: option(string)=?,
  ~url: option(string)=?,
  ~category_id: option(string)=?,
  _children
) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=disqusComments,
    ~props={
      "shortname": shortname,
      "identifier": Js.Nullable.from_opt(identifier),
      "title": Js.Nullable.from_opt(title),
      "url": Js.Nullable.from_opt(url),
      "category_id": Js.Nullable.from_opt(category_id)
    },
    [||]
  );
