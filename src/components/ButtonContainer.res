open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "container": style(
      ~borderRadius=6.,
      ~justifyContent=#center,
      ~alignItems=#center,
      ~borderWidth=1.,
      (),
    ),
    "rounded": style(~borderRadius=100., ()),
    "activityIndicatorContainer": style(
      ~zIndex=1,
      ~position=#absolute,
      ~top=0.->dp,
      ~bottom=0.->dp,
      ~left=0.->dp,
      ~right=0.->dp,
      ~justifyContent=#center,
      ~alignItems=#center,
      (),
    ),
  })
}

type mode =
  | Contained
  | ContainedInverted
  | Outlined

@react.component
let make = (
  ~textSize=16.,
  ~accessibilityLabel=?,
  ~mode: mode=Contained,
  ~round=false,
  ~horizontalSpace as horizontal: SpacedView.size=M,
  ~verticalSpace as vertical: SpacedView.size=S,
  ~style as s=?,
  ~color as c1="black",
  ~color2 as c2="white",
  ~activityIndicator=false,
  ~children,
  _,
) =>
  <View
    ?accessibilityLabel
    style={
      open Style
      arrayOption([
        Some(
          switch mode {
          | Contained =>
            array([styles["container"], style(~backgroundColor=c1, ~borderColor=c1, ())])
          | ContainedInverted =>
            array([styles["container"], style(~backgroundColor=c1, ~borderColor="transparent", ())])
          | Outlined =>
            array([styles["container"], style(~backgroundColor=c2, ~borderColor=c1, ())])
          },
        ),
        round ? Some(styles["rounded"]) : None,
        s,
      ])
    }>
    <SpacedView horizontal vertical>
      {activityIndicator
        ? <View style={styles["activityIndicatorContainer"]}>
            <ActivityIndicator
              size=ActivityIndicator.Size.small
              color={switch mode {
              | Contained => c2
              | ContainedInverted
              | Outlined => c1
              }}
            />
          </View>
        : ReasonReact.null}
      <Text
        style={
          open Style
          array([
            switch mode {
            | Contained => style(~fontSize=textSize, ~fontWeight=#_600, ~color=c2, ())
            | ContainedInverted => style(~fontSize=textSize, ~fontWeight=#_600, ~color=c1, ())
            | Outlined => style(~fontSize=textSize, ~fontWeight=#_400, ~color=c1, ())
            },
            style(~opacity=activityIndicator ? 0. : 1., ()),
          ])
        }>
        children
      </Text>
    </SpacedView>
  </View>
