open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles = StyleSheet.create(Style.{"img": style([])});

let uri = "/me.png";
let width: Style.pt_only = Style.Pt(780. /. 2.5);
let height: Style.pt_only = Style.Pt(1000. /. 2.5);

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
      style=styles##img
    />,
};
