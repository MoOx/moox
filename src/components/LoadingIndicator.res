open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({"container": style(~justifyContent=#center, ())})
}

@react.component
let make = () =>
  <SpacedView vertical=XXL horizontal=None>
    <ActivityIndicator size=ActivityIndicator.Size.large />
  </SpacedView>
