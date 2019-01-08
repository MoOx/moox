open BsReactNative;

let component = ReasonReact.statelessComponent("Spacer");

let space = 20.;

type size =
  | XXL
  | XL
  | L
  | M
  | S
  | XS
  | XXS
  | Custom(float)
  | None;

let make =
    (
      ~vertical=None,
      ~horizontal=None,
      ~style=Style.style([]),
      ~pointerEvents=`auto,
      children,
    ) => {
  ...component,
  render: _self =>
    <View
      style={Style.concat([
        Style.style(
          switch (vertical) {
          | XXL => [Style.paddingVertical(Pt(space *. 4.))]
          | XL => [Style.paddingVertical(Pt(space *. 3.))]
          | L => [Style.paddingVertical(Pt(space *. 2.))]
          | M => [Style.paddingVertical(Pt(space *. 1.))]
          | S => [Style.paddingVertical(Pt(space *. 3. /. 4.))]
          | XS => [Style.paddingVertical(Pt(space *. 2. /. 4.))]
          | XXS => [Style.paddingVertical(Pt(space *. 1. /. 4.))]
          | Custom(value) => [Style.paddingVertical(Pt(value))]
          | None => []
          },
        ),
        Style.style(
          switch (horizontal) {
          | XXL => [Style.paddingHorizontal(Pt(space *. 4.))]
          | XL => [Style.paddingHorizontal(Pt(space *. 3.))]
          | L => [Style.paddingHorizontal(Pt(space *. 2.))]
          | M => [Style.paddingHorizontal(Pt(space *. 1.))]
          | S => [Style.paddingHorizontal(Pt(space *. 3. /. 4.))]
          | XS => [Style.paddingHorizontal(Pt(space *. 2. /. 4.))]
          | XXS => [Style.paddingHorizontal(Pt(space *. 1. /. 4.))]
          | Custom(value) => [Style.paddingHorizontal(Pt(value))]
          | None => []
          },
        ),
        style,
      ])}
      pointerEvents>
      ...children
    </View>,
};
