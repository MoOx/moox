open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles =
  StyleSheet.create(
    Style.(
      {
        "avatar":
          style([
            borderRadius(96.),
            width(Pt(96.)),
            height(Pt(96.)),
            borderColor("#030303"),
            borderWidth(2.),
          ]),
      }
    ),
  );

let make = _children => {
  ...component,
  render: _self =>
    <Image
      source=(
        URI(
          Image.(
            imageURISource(~uri="/avatar.jpg", ~width=96., ~height=96., ())
          ),
        )
      )
      style=styles##avatar
    />,
};
