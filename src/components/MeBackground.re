open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let uri = "/me-bg.jpg";
let w = 1750. /. 2.;
let h = 850. /. 2.;
let width: Style.pt_only = Style.Pt(w);
let height: Style.pt_only = Style.Pt(h);

[@react.component]
let make = (~style=?, ()) =>
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
        style={Style.concat([
          Style.style([
            Style.width(Style.Pt(w)),
            Style.height(Style.Pt(h)),
          ]),
          style->Belt.Option.getWithDefault(Style.style([])),
        ])}
      />,
  });
