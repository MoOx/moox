open ReactNative

@react.component
let make = (~style=?, ~domStyle=?, ~children) =>
  <Animated.View ?style>
    <div className="device device-iphone-x" style=?domStyle>
      <div className="device-frame"> <div className="device-content"> children </div> </div>
      <div className="device-stripe" />
      <div className="device-header" />
      <div className="device-sensors" />
      <div className="device-btns" />
      <div className="device-power" />
      <div className="device-home" />
    </div>
  </Animated.View>
