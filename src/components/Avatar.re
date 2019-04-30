open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles =
  Style.(
    StyleSheet.create({
      "avatar":
        style([
          borderRadius(96.),
          width(Pt(96.)),
          height(Pt(96.)),
          borderColor(String(Consts.Colors.dark)),
          borderWidth(2.),
        ]),
    })
  );

let uri = "/avatar.jpg";
let width: Style.pt_only = Style.Pt(96.);
let height: Style.pt_only = Style.Pt(96.);

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
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
  });
