open Belt
open ReactNative
open ReactNativeSvg

type angle = {
  x1: string,
  x2: string,
  y1: string,
  y2: string,
}

type stop = {
  offset: size,
  stopColor: string,
  stopOpacity: string,
}

@module("react-native")
external unstable_createElement: (
  string,
  {"style": option<ReactNative.Style.t>},
  option<React.element>,
) => React.element = "unstable_createElement"

@react.component
let make = (~style as s=?, ~stops: array<stop>, ~angle: float=180., ~children=?) => {
  open RescriptTinycolor
  let stopsAsString =
    stops
    ->Array.map(stop => {
      stop.stopColor
      ->TinyColor.makeFromString
      ->Option.map(c =>
        c->TinyColor.setAlpha(stop.stopOpacity->Js.Float.fromString, _)->TinyColor.toString
      )
      ->Option.getWithDefault("#000") ++
      " " ++
      stop.offset->Obj.magic
    })
    ->Array.joinWith(", ", s => s)
  let gradientStyleAsString =
    "linear-gradient(" ++ angle->Js.Float.toFixed ++ "deg, " ++ stopsAsString ++ ")"
  unstable_createElement(
    "div",
    {
      "style": Some({
        open Style
        arrayOption([
          s,
          Some(Style.viewStyle(~display=#flex, ~flexDirection=#column, ())),
          Some(
            unsafeStyle({
              "backgroundImage": gradientStyleAsString,
            }),
          ),
        ])
      }),
    },
    children,
  )
}
