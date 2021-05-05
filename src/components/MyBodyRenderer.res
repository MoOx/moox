open Belt

type htmlProps = {
  "allowfullscreen": string,
  "class": string,
  "datetime": string,
  "for": string,
  "frameborder": string,
  "href": string,
  "id": string,
  "name": string,
  "src": string,
}

type reactHtmlProps = {
  "allowFullScreen": string,
  "className": string,
  "dateTime": string,
  "htmlFor": string,
  "frameBorder": string,
  "href": string,
  "id": string,
  "name": string,
  "src": string,
}

type rec reasonChildren = array<reasonChild>
and reasonChild =
  | String(string)
  | Element(string, option<htmlProps>, reasonChildren)
  | Empty

type rec t = {
  tag: string,
  props: option<htmlProps>,
  children: Js.Undefined.t<array<t>>,
}

let rec jsTreeToReason = (jsChild: t) =>
  switch %raw(` Object.prototype.toString.call(jsChild) `) {
  | "[object String]" => String(Js.String.make(jsChild))
  | "[object Object]" =>
    let tag = Js.String.make(jsChild.tag)
    let props = jsChild.props
    let children = switch Js.Undefined.toOption(jsChild.children) {
    | Some(c) => c->Array.map(jsTreeToReason)
    | None => []
    }
    Element(tag, props, children)
  | _ => Empty
  }

let stringMapPartial = (s, f) => {
  let b = Buffer.create(String.length(s))
  s |> String.iter(c =>
    switch f(c) {
    | None => ()
    | Some(c') => Buffer.add_char(b, c')
    }
  )
  b->Buffer.contents
}

// let cleanupNewlines = s =>
//   s->stringMapPartial(char => char === '\n' ? None : Some(char));
let cleanupNewlines = s => s->stringMapPartial(char => char === '\n' ? Some(' ') : Some(char))

let optionalCleanString = (s, keepNewlines) => {
  let sc = keepNewlines ? s : cleanupNewlines(s)
  sc === "" || (sc === " " && s != sc) ? None : Some(sc)
}

let keepNewlines = ref(false)

let inlineBreakIfParentIsInline = parentTag =>
  switch parentTag {
  | "li" => <Html.Br />
  | _ => React.null
  }

let rec renderChild = (~keepNewlines=false, parentTag, index: int, child) => {
  /* @todo we can do better for the key */
  let key = index->string_of_int

  let renderChildren = (~keepNewlines, parentTag, children) =>
    children->Array.length > 0
      ? children->Array.mapWithIndex(renderChild(~keepNewlines, parentTag))->React.array
      : React.null

  switch child {
  | String(string) =>
    switch parentTag {
    | "ol" => React.null
    | "ul" => React.null
    | "li" =>
      string
      ->optionalCleanString(keepNewlines)
      ->Option.map(s => <Html.TextNode> {s->React.string} </Html.TextNode>)
      ->Option.getWithDefault(React.null)
    | _ =>
      string
      ->optionalCleanString(keepNewlines)
      ->Option.map(React.string)
      ->Option.getWithDefault(React.null)
    }
  | Element(tag, htmlprops, children) =>
    let props = htmlprops->Option.map(props =>
      {
        "allowFullScreen": props["allowfullscreen"],
        "className": props["class"],
        "dateTime": props["datetime"],
        "htmlFor": props["for"],
        "frameBorder": props["frameborder"],
        "href": props["href"],
        "id": props["id"],
        "name": props["name"],
        "src": props["src"],
      }
    )
    switch tag {
    /* html tags */
    | "a" => <Html.A key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.A>
    | "h1" => <Html.H1 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H1>
    | "h2" => <Html.H2 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H2>
    | "h3" => <Html.H3 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H3>
    | "h4" => <Html.H4 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H4>
    | "h5" => <Html.H5 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H5>
    | "h6" => <Html.H6 key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.H6>
    | "p" => <Html.P key> {renderChildren(~keepNewlines, tag, children)} </Html.P>
    | "img" => <Html.Image key ?props />
    | "ol" => <>
        {inlineBreakIfParentIsInline(parentTag)}
        <Html.Ul key> {renderChildren(~keepNewlines, tag, children)} </Html.Ul>
      </>
    | "ul" => <>
        {inlineBreakIfParentIsInline(parentTag)}
        <Html.Ul key> {renderChildren(~keepNewlines, tag, children)} </Html.Ul>
      </>
    | "li" => <Html.Li key> {renderChildren(~keepNewlines, tag, children)} </Html.Li>
    | "blockquote" =>
      <Html.BlockQuote key> {renderChildren(~keepNewlines, tag, children)} </Html.BlockQuote>
    | "pre" => <Html.Pre key ?props> {renderChildren(~keepNewlines=true, tag, children)} </Html.Pre>
    | "code" =>
      switch parentTag {
      | "pre" =>
        <Html.CodeBlock key ?props> {renderChildren(~keepNewlines, tag, children)} </Html.CodeBlock>
      | _ => <Html.Code key> {renderChildren(~keepNewlines, tag, children)} </Html.Code>
      }
    | "br" => <Html.Br key />
    | "hr" => <Html.Hr key />
    | _ =>
      React.createElementVariadic(
        ReactDOM.stringToComponent(tag),
        props
        ->Option.map(props => Js.Obj.empty()->Js.Obj.assign(props)->Js.Obj.assign({"key": key}))
        ->Option.getWithDefault({"key": key})
        ->Obj.magic,
        [renderChildren(~keepNewlines, tag, children)],
      )
    }
  | Empty => React.null
  }
}

@react.component
let make = (~body: t, ~renderChild=renderChild, ()) => {
  let tree = jsTreeToReason(body)
  <> {renderChild("", 0, tree)} </>
}
