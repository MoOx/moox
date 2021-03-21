open ReactNative

let uri = "/me-bg.jpg"
let w = 1750. /. 2.
let h = 850. /. 2.

@react.component
let make = (~style as styl=?, ()) =>
  <Image
    source={
      open Image
      Source.fromUriSource(uriSource(~uri, ~width=w, ~height=h, ()))
    }
    defaultSource={
      // SSR workaround https://github.com/necolas/react-native-web/issues/543
      Image.DefaultSource.fromUri(~uri, ~width=w, ~height=h, ())
    }
    style={
      open Style
      arrayOption([Some(style(~width=w->dp, ~height=h->dp, ())), styl])
    }
  />
