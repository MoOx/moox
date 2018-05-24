open BsReactNative;

let component = ReasonReact.statelessComponent("Spacer");

let small = 10.;

let normal = 20.;

let large = 40.;

let styles =
  StyleSheet.create(
    Style.(
      {
        "nope": style([]),
        "default": style([flex(1.)]),
        "normalMargin":
          style([
            marginHorizontal(Pt(normal /. 2.)),
            marginVertical(Pt(normal /. 2.)),
          ]),
        "normalMarginHorizontal":
          style([marginHorizontal(Pt(normal /. 2.))]),
        "normalMarginVertical": style([marginVertical(Pt(normal /. 2.))]),
        "smallMargin":
          style([
            marginHorizontal(Pt(small /. 2.)),
            marginVertical(Pt(small /. 2.)),
          ]),
        "smallMarginVertical": style([marginVertical(Pt(small /. 2.))]),
        "smallMarginHorizontal": style([marginHorizontal(Pt(small /. 2.))]),
        "largeMargin":
          style([
            marginHorizontal(Pt(large /. 2.)),
            marginVertical(Pt(large /. 2.)),
          ]),
        "largeMarginHorizontal": style([marginHorizontal(Pt(large /. 2.))]),
        "largeMarginVertical": style([marginVertical(Pt(large /. 2.))]),
      }
    ),
  );

let make =
    (
      ~horizontal=false,
      ~vertical=false,
      ~small=false,
      ~smallHorizontal=false,
      ~smallVertical=false,
      ~large=false,
      ~largeHorizontal=false,
      ~largeVertical=false,
      ~style=Style.(style([])),
      _,
    ) => {
  ...component,
  render: _self =>
    <View
      style=(
        Style.flatten([|
          styles##default,
          ! horizontal && ! vertical ? styles##normalMargin : styles##nope,
          horizontal ? styles##normalMarginHorizontal : styles##nope,
          vertical ? styles##normalMarginVertical : styles##nope,
          small ? styles##smallMargin : styles##nope,
          large ? styles##largeMargin : styles##nope,
          smallHorizontal ? styles##smallMarginHorizontal : styles##nope,
          smallVertical ? styles##smallMarginVertical : styles##nope,
          largeHorizontal ? styles##largeMarginHorizontal : styles##nope,
          largeVertical ? styles##largeMarginVertical : styles##nope,
          style,
        |])
      )
    />,
};
