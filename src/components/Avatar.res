open ReactNative
open ReactMultiversal

let uri = "/avatar.jpg"

@react.component
let make = (
  ~size,
  ~borderWidth=Predefined.hairlineWidth,
  ~borderColor=Predefined.Colors.separator,
) => {
  let width = size -. borderWidth *. 2.
  let height = size -. borderWidth *. 2.
  <View
  // key=Predefined.hairlineWidth is to avoid SSR/hydrate issue
    key={Predefined.hairlineWidth->Js.Float.toString}
    style={
      open Style
      style(
        ~borderWidth,
        ~borderColor,
        ~borderRadius=size,
        ~width=size->dp,
        ~height=size->dp,
        ~overflow=#hidden,
        (),
      )
    }>
    <Image
      source={Image.Source.fromUriSource(Image.uriSource(~uri, ~width, ~height, ()))}
      defaultSource={
        // SSR workaround https://github.com/necolas/react-native-web/issues/543

        Image.DefaultSource.fromUri(~uri, ~width, ~height, ())
      }
    />
  </View>
}
