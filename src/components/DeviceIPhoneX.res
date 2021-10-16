open ReactNative
open Style

let originalHeight = 788.
let originalWidth = 389.
let originalRatio = originalHeight /. originalWidth

@react.component
let make = (~style as s=?, ~width, ~children) => {
  let height = width *. originalRatio
  <Animated.View
    style={arrayOption([s, Some(viewStyle(~width=width->dp, ~height=height->dp, ()))])}>
    <View
      style={viewStyle(
        ~flexGrow=1.,
        ~flexShrink=1.,
        ~backgroundColor="#fff",
        ~margin=(width *. 0.05)->dp,
        ~borderRadius=width *. 0.1,
        ~overflow=#hidden,
        (),
      )}>
      children
    </View>
    <View style={StyleSheet.absoluteFill} pointerEvents=#none>
      <SVGDeviceIphone width={width->dp} height={height->dp} />
    </View>
  </Animated.View>
}
