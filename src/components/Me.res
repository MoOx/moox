open ReactNative

let uri = "/me.png"
let width = 390. /. 1.4
let height = 500. /. 1.4

@react.component
let make = () =>
  <div
    style={ReactDOMRe.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~flex="1 1 auto",
      ~filter=[
        "brightness(0.8)",
        "contrast(1.1)",
        "saturate(1.15)",
        "hue-rotate(-1deg)",
        "drop-shadow(0 0 20px rgba(0,0,0,0.2))",
      ] |> Js.Array.joinWith(" "),
      (),
    )}>
    <Image
      source={
        open Image
        Source.fromUriSource(uriSource(~uri, ~width, ~height, ()))
      }
      defaultSource={
        // SSR workaround https://github.com/necolas/react-native-web/issues/543
        Image.DefaultSource.fromUri(~uri, ~width, ~height, ())
      }
    />
  </div>
