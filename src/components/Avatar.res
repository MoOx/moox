open ReactNative
open ReactMultiversal

let uri = "/avatar.jpg"

@react.component
let make = (~size) =>
  <View
    key={Predefined.hairlineWidth->Js.Float.toString}
    style=// key=Predefined.hairlineWidth is to avoid SSR/hydrate issue
    {
      open Style
      style(
        ~borderWidth=Predefined.hairlineWidth,
        ~borderColor=Predefined.Colors.separator,
        ~borderRadius=size,
        ~width=size->dp,
        ~height=size->dp,
        ~overflow=#hidden,
        (),
      )
    }>
    <Image
      source={
        open Image
        open Source
        fromUriSource(uriSource(~uri, ~width=size, ~height=size, ()))
      }
      defaultSource=// SSR workaround https://github.com/necolas/react-native-web/issues/543
      {
        open Image
        open DefaultSource
        fromUri(~uri, ~width=size, ~height=size, ())
      }
    />
  </View>
