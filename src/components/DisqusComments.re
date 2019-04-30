[@bs.module "react-disqus-comments"] [@react.component]
external make:
  (
    ~shortname: string,
    ~identifier: string=?,
    ~title: string=?,
    ~url: string=?,
    ~category_id: string=?
  ) =>
  React.element =
  "default";
