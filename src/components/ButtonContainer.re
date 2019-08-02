open BsReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "container":
        style([
          borderRadius(6.),
          justifyContent(Center),
          alignItems(Center),
          borderWidth(1.),
        ]),
      "rounded": style([borderRadius(100.)]),
      "activityIndicatorContainer":
        style([
          zIndex(1),
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          left(Pt(0.)),
          right(Pt(0.)),
          justifyContent(Center),
          alignItems(Center),
        ]),
    })
  );

type mode =
  | Contained
  | ContainedInverted
  | Outlined;

[@react.component]
let make =
    (
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
    style=Style.(
      arrayOption([|
        Some(
          switch (mode) {
          | Contained =>
            array([|
              styles##container,
              style([
                backgroundColor(String(c1)),
                borderColor(String(c1)),
              ]),
            |])
          | ContainedInverted =>
            array([|
              styles##container,
              style([
                backgroundColor(String(c1)),
                borderColor(String("transparent")),
              ]),
            |])
          | Outlined =>
            array([|
              styles##container,
              style([
                backgroundColor(String(c2)),
                borderColor(String(c1)),
              ]),
            |])
          },
        ),
        round ? Some(styles##rounded) : None,
        s,
      |])
    )>
    <SpacedView horizontal vertical>
      {activityIndicator
         ? <View style=styles##activityIndicatorContainer>
             <ActivityIndicator
               size=`small
               color={
                 Style.String(
                   switch (mode) {
                   | Contained => c2
                   | ContainedInverted
                   | Outlined => c1
                   },
                 )
               }
             />
           </View>
         : ReasonReact.null}
      <Text
        style=Style.(
          array([|
            switch (mode) {
            | Contained =>
              style([
                fontSize(Float(textSize)),
                fontWeight(`_600),
                color(String(c2)),
              ])
            | ContainedInverted =>
              style([
                fontSize(Float(textSize)),
                fontWeight(`_600),
                color(String(c1)),
              ])
            | Outlined =>
              style([
                fontSize(Float(textSize)),
                fontWeight(`_400),
                color(String(c1)),
              ])
            },
            style([opacity(Float(activityIndicator ? 0. : 1.))]),
          |])
        )>
        children
      </Text>
    </SpacedView>
  </View>;
