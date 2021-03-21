open ReactNative

@react.component
let make = (~uri, ~resizeMode=?, ~style=?, ()) =>
  <Image
    ?resizeMode
    ?style
    source={
      open Image
      Source.fromUriSource(uriSource(~uri, ()))
    }
    defaultSource={
      // SSR workaround https://github.com/necolas/react-native-web/issues/543
      Image.DefaultSource.fromUri(~uri, ())
    }
  />
