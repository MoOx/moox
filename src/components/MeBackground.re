open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let uri = "/me-bg.jpg";
let w = 1750. /. 2.;
let h = 850. /. 2.;
let ptwidth: Style.pt_only = Style.Pt(w);
let ptheight: Style.pt_only = Style.Pt(h);

[@react.component]
let make = (~style as styl=?, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <Image
        source={
                 `URI(
                   Image.(
                     imageURISource(
                       ~uri,
                       ~width=ptwidth,
                       ~height=ptheight,
                       (),
                     )
                   ),
                 )
               }
        defaultSource={
                        `URI(
                          Image.(
                            defaultURISource(
                              ~uri,
                              ~width=ptwidth,
                              ~height=ptheight,
                              (),
                            )
                          ),
                        )
                      }
        style=Style.(
          arrayOption([|
            Some(style([width(Pt(w)), height(Pt(h))])),
            styl,
          |])
        )
      />,
  });
