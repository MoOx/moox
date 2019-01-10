open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles =
  StyleSheet.create(
    Style.{
      "avatar":
        style([
          borderRadius(96.),
          width(Pt(96.)),
          height(Pt(96.)),
          borderColor(String("#000F2B")),
          borderWidth(2.),
        ]),
    },
  );

let uri = "/avatar.jpg";
let width: Style.pt_only = Style.Pt(96.);
let height: Style.pt_only = Style.Pt(96.);

let make = _children => {
  ...component,
  render: _self =>
    <Image
      source={`URI(Image.(imageURISource(~uri, ~width, ~height, ())))}
      defaultSource={
                      `URI(
                        Image.(defaultURISource(~uri, ~width, ~height, ())),
                      )
                    }
      style=styles##avatar
    />,
};
