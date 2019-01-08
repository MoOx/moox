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
  | Custom(float);

let styles =
  StyleSheet.create(
    Style.{
      "xxl": style([width(Pt(space *. 4.)), height(Pt(space *. 4.))]),
      "xl": style([width(Pt(space *. 3.)), height(Pt(space *. 3.))]),
      "l": style([width(Pt(space *. 2.)), height(Pt(space *. 2.))]),
      "m": style([width(Pt(space *. 1.)), height(Pt(space *. 1.))]),
      "s":
        style([
          width(Pt(space *. 3. /. 4.)),
          height(Pt(space *. 3. /. 4.)),
        ]),
      "xs":
        style([
          width(Pt(space *. 2. /. 4.)),
          height(Pt(space *. 2. /. 4.)),
        ]),
      "xxs":
        style([
          width(Pt(space *. 1. /. 4.)),
          height(Pt(space *. 1. /. 4.)),
        ]),
    },
  );

let make = (~size=M, ~style=Style.style([]), _) => {
  ...component,
  render: _self =>
    <View
      style={Style.concat([
        switch (size) {
        | XXL => styles##xxl
        | XL => styles##xl
        | L => styles##l
        | M => styles##m
        | S => styles##s
        | XS => styles##xs
        | XXS => styles##xxs
        | Custom(value) =>
          Style.style([Style.width(Pt(value)), Style.height(Pt(value))])
        },
        style,
      ])}
    />,
};
