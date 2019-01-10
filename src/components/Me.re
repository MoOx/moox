open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let styles = StyleSheet.create(Style.{"img": style([])});

let uri = "/me.png";
let width: Style.pt_only = Style.Pt(780. /. 2.5);
let height: Style.pt_only = Style.Pt(1000. /. 2.5);

let make = _children => {
  ...component,
  render: _self =>
    <div
      style={ReactDOMRe.Style.make(
        ~display="flex",
        ~flexDirection="column",
        ~flex="1 1 auto",
        ~filter=
          [|
            "brightness(0.8)",
            "contrast(1.1)",
            "saturate(1.15)",
            "hue-rotate(-1deg)",
            "drop-shadow(0 0 20px rgba(0,0,0,0.2))",
          |]
          |> Js.Array.joinWith(" "),
        (),
      )}>
      <Image
        source={`URI(Image.(imageURISource(~uri, ~width, ~height, ())))}
        defaultSource={
                        `URI(
                          Image.(defaultURISource(~uri, ~width, ~height, ())),
                        )
                      }
        style=styles##img
      />
    </div>,
};
