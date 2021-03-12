open Belt
// ! \\  Optional values MUST be encoded as Js.Null.t
// They will be used for JSON serialization for Next's static generation
type link = {
  title: string,
  url: string,
}

type t = {
  body: Js.null<MyBodyRenderer.t>,
  company: Js.null<string>,
  dateEnd: Js.null<string>,
  dateStart: string,
  description: Js.null<string>,
  hashtags: array<string>,
  id: string,
  image: Js.null<string>,
  links: Js.null<array<link>>,
  title: string,
  url: Js.null<string>,
}

let decode = (id, rawJson: Js.Json.t): result<t, string> => {
  open Json.Decode
  switch {
    body: rawJson
    ->Js.Json.decodeObject
    ->Option.flatMap(json => json->Js.Dict.get("body"))
    ->Option.flatMap(body => body->Js.Json.decodeObject)
    ->Option.map(body => body->Obj.magic)
    ->Js.Null.fromOption,
    company: rawJson->optional(field("company", string), _)->Js.Null.fromOption,
    dateEnd: rawJson->optional(field("dateEnd", string), _)->Js.Null.fromOption,
    dateStart: rawJson->field("dateStart", string, _),
    description: rawJson->optional(field("description", string), _)->Js.Null.fromOption,
    hashtags: rawJson->field("hashtags", array(string), _),
    id: id,
    image: rawJson->optional(field("image", string), _)->Js.Null.fromOption,
    links: rawJson
    ->optional(
      field(
        "links",
        array(json => {
          title: json->field("title", string, _),
          url: json->field("url", string, _),
        }),
      ),
      _,
    )
    ->Js.Null.fromOption,
    title: rawJson->field("title", string, _),
    url: rawJson->optional(field("url", string), _)->Js.Null.fromOption,
  } {
  | data => Ok(data)
  | exception DecodeError(str) => Error(str)
  }
}

let orderByDate = (posts: array<t>): array<t> =>
  posts
  ->Js.Array.copy
  ->Js.Array2.sortInPlaceWith((a, b) => {
    let aV = a.dateStart
    let bV = b.dateStart
    if aV === bV {
      0
    } else if aV > bV {
      -1
    } else {
      1
    }
  })
