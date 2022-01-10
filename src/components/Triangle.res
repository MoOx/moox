open ReactNative

let coef = 2. *. 0.8660254

@react.component
let make = (~height as h=50., ~color as colour, ~style as styl=?, ()) =>
  <View
    style={
      open Style
      arrayOption([
        Some(
          style(
            ~width=0.->dp,
            ~height=0.->dp,
            ~borderTopWidth=0.,
            ~borderTopColor="transparent",
            ~borderLeftWidth=h /. coef,
            ~borderLeftColor="transparent",
            ~borderRightWidth=h /. coef,
            ~borderRightColor="transparent",
            ~borderBottomWidth=h,
            ~borderBottomColor=colour,
            (),
          ),
        ),
        styl,
      ])
    }
  />
