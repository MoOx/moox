open Belt
// ! \\  Optional values MUST be encoded as Js.Null.t
// They will be used for JSON serialization for Next's static generation
type link = {
  title: string,
  url: string,
}

type t = {
  body: Js.null<MyBodyRenderer.t>,
  conference: Js.null<string>,
  date: string,
  lang: Js.null<string>,
  slides: Js.null<string>,
  slidesEmbed: Js.null<string>,
  id: string,
  title: string,
  video: Js.null<string>,
  videoEmbed: Js.null<string>,
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
    conference: rawJson->optional(field("conference", string), _)->Js.Null.fromOption,
    date: rawJson->field("date", string, _),
    lang: rawJson->optional(field("lang", string), _)->Js.Null.fromOption,
    slides: rawJson->optional(field("slides", string), _)->Js.Null.fromOption,
    slidesEmbed: rawJson->optional(field("slidesEmbed", string), _)->Js.Null.fromOption,
    id: id,
    title: rawJson->field("title", string, _),
    video: rawJson->optional(field("video", string), _)->Js.Null.fromOption,
    videoEmbed: rawJson->optional(field("videoEmbed", string), _)->Js.Null.fromOption,
  } {
  | data => Ok(data)
  | exception DecodeError(str) => Error(str)
  }
}

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
