open Belt
// ! \\  Optional values MUST be encoded as Js.Null.t
// They will be used for JSON serialization for Next's static generation
type t = {
  body: Js.null<MyBodyRenderer.t>,
  date: Js.null<string>,
  id: string,
  lang: Js.null<string>,
  // tags: Js.null<array<string>>,
  title: Js.null<string>,
}

let decode = (id, rawJson: Js.Json.t): result<t, string> => {
  open Json.Decode
  switch {
    id: id,
    date: rawJson->optional(field("date", string), _)->Js.Null.fromOption,
    title: rawJson->optional(field("title", string), _)->Js.Null.fromOption,
    lang: rawJson->optional(field("lang", string), _)->Js.Null.fromOption,
    body: rawJson
    ->Js.Json.decodeObject
    ->Option.flatMap(json => json->Js.Dict.get("body"))
    ->Option.flatMap(body => body->Js.Json.decodeObject)
    ->Option.map(body => body->Obj.magic)
    ->Js.Null.fromOption,
    // tags: rawJson
    // ->optional(j => field("tag", string, _))
    // ->Js.Null.fromOption,
  } {
  | data => Ok(data)
  | exception DecodeError(str) => Error(str)
  }
}

let dumbDate = "0001-01-01"

let orderByDate = (posts: array<t>): array<t> =>
  posts
  ->Js.Array.copy
  ->Js.Array2.sortInPlaceWith((a, b) => {
    let aV = a.date
    let bV = b.date
    if aV === bV {
      0
    } else if aV > bV {
      -1
    } else {
      1
    }
  })
