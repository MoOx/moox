open ReactNative

let styles = {
  open Style
  StyleSheet.create({
    "hugeText": style(
      ~display=#flex,
      ~flex=1.,
      ~paddingVertical=40.->dp,
      ~fontSize=120.,
      ~lineHeight=120.,
      ~justifyContent=#center,
      (),
    ),
  })
}

@react.component
let make = (~children, ()) => <Text style={styles["hugeText"]}> children </Text>
