open BsReactNative;

let component = ReasonReact.statelessComponent("MyBodyRenderer");

type htmlProps = {
  .
  "id": string,
  "name": string,
  "for": string,
  "class": string,
  "href": string,
};

type reasonChildren = list(reasonChild)
and reasonChild =
  | String(string)
  | Element(string, htmlProps, reasonChildren)
  | Empty;

type jsBody = {
  .
  "t": string,
  "p": htmlProps,
  "c": Js.Undefined.t(array(jsBody)),
};

let rec jsTreeToReason = (jsChild: jsBody) =>
  switch ([%bs.raw {| Object.prototype.toString.call(jsChild) |}]) {
  | "[object String]" => String(Js.String.make(jsChild))
  | "[object Object]" =>
    let tag = Js.String.make(jsChild##t);
    let props = jsChild##p;
    let children =
      switch (Js.Undefined.to_opt(jsChild##c)) {
      | Some(c) => List.map(jsTreeToReason, Array.to_list(c))
      | None => []
      };
    Element(tag, props, children);
  | _ => Empty
  };

let string_map_partial = (f, s) => {
  let b = Buffer.create(String.length(s));
  let addperhaps = c =>
    switch (f(c)) {
    | None => ()
    | Some(c') => Buffer.add_char(b, c')
    };
  String.iter(addperhaps, s);
  Buffer.contents(b);
};

let lastSiblingHasLineBreaking = ref(false);

let rec renderChild = (parentTag, index: int, child) => {
  /* @todo we can do better */
  let key = string_of_int(index);
  let siblingHasLineBreaking = lastSiblingHasLineBreaking^;
  lastSiblingHasLineBreaking := false;
  let renderChildren = (parentTag, children) =>
    if (List.length(children) == 0) {
      ReasonReact.null;
    } else {
      ReasonReact.array(
        Array.of_list(List.mapi(renderChild(parentTag), children)),
      );
    };
  switch (child) {
  | String(string) =>
    switch (parentTag) {
    | "ul" => ReasonReact.null
    | "ol" => ReasonReact.null
    | _ =>
      let newString =
        string_map_partial(
          char =>
            if (char === '\n' && siblingHasLineBreaking) {
              None;
            } else {
              Some(char === '\n' ? ' ' : char);
            },
          string,
        );
      ReasonReact.string(newString);
    }
  | Element(tag, props, children) =>
    switch (tag) {
    | "a" =>
      <UnderlinedTextLink key href=props##href>
        (renderChildren(tag, children))
      </UnderlinedTextLink>
    | "h1" => <Html.H1 key> (renderChildren(tag, children)) </Html.H1>
    | "h2" => <Html.H2 key> (renderChildren(tag, children)) </Html.H2>
    | "h3" => <Html.H3 key> (renderChildren(tag, children)) </Html.H3>
    | "h4" => <Html.H4 key> (renderChildren(tag, children)) </Html.H4>
    | "h5" => <Html.H5 key> (renderChildren(tag, children)) </Html.H5>
    | "h6" => <Html.H6 key> (renderChildren(tag, children)) </Html.H6>
    | "p" => <Html.P key> (renderChildren(tag, children)) </Html.P>
    | "ul" => <Html.Ul key> (renderChildren(tag, children)) </Html.Ul>
    | "li" => <Html.Li key> (renderChildren(tag, children)) </Html.Li>
    | "blockquote" =>
      <Html.BlockQuote key> (renderChildren(tag, children)) </Html.BlockQuote>
    | "br" =>
      lastSiblingHasLineBreaking := true;
      <Html.Br key />;
    | "hr" => <Html.Hr key />
    | _ =>
      ReactDOMRe.createElement(
        tag,
        ~props=ReactDOMRe.objToDOMProps(props),
        [|renderChildren(tag, children)|],
      )
    }
  | Empty => ReasonReact.null
  };
};

let make = (~body: jsBody, ~renderChild=renderChild, _children) => {
  ...component,
  render: _self => {
    let tree = jsTreeToReason(body);
    <View> (renderChild("", 0, tree)) </View>;
  },
};
