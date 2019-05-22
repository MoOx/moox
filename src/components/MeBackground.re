open BsReactNative;

let uri = "/me-bg.jpg";
let w = 1750. /. 2.;
let h = 850. /. 2.;
let ptwidth: Style.pt_only = Style.Pt(w);
let ptheight: Style.pt_only = Style.Pt(h);

[@react.component]
let make = (~style as styl=?, ()) => {
  <Image
    source={
             `URI(
               Image.(
                 imageURISource(~uri, ~width=ptwidth, ~height=ptheight, ())
               ),
             )
           }
    // SSR workaround https://github.com/necolas/react-native-web/issues/543
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
      arrayOption([|Some(style([width(Pt(w)), height(Pt(h))])), styl|])
    )
  />;
};
