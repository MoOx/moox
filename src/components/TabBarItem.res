open ReactNative

let styles = {
  open Style
  {
    "item": viewStyle(~flex=1., ~justifyContent=#center, ~alignItems=#center, ()),
    "text": textStyle(~flexShrink=1., ~fontSize=10., ~marginTop=1.5->dp, ()),
  }->StyleSheet.create
}

@react.component
let make = (~text, ~icon, ~isActive, ~colorActive, ~colorInactive, ()) => {
  <View style={styles["item"]}>
    {icon(~width=24., ~height=24., ~fill=isActive ? colorActive : colorInactive, ())}
    <Text
      numberOfLines=1
      ellipsizeMode=#tail
      style={Style.array([
        styles["text"],
        isActive
          ? Style.textStyle(~color=colorActive, ())
          : Style.textStyle(~color=colorInactive, ()),
      ])}>
      {text->React.string}
    </Text>
  </View>
}
