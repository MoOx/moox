open BsReactNative;

let component = ReasonReact.statelessComponent("HeaderMenuLinks");

let styles =
  StyleSheet.create(
    Style.{
      "container": style([flexDirection(Row)]),
      "link":
        style([
          padding(Pt(10.)),
          fontSize(Float(16.)),
          lineHeight(18. *. 1.7),
          color(String(Consts.Colors.dark)),
        ]),
      "linkActive":
        style([textDecorationLine(Underline), textDecorationStyle(Solid)]),
    },
  );

let make = (~currentLocation, _children) => {
  ...component,
  render: _self =>
    <View style=styles##container>
      {Consts.menuLinks
       /* ->Belt.Array.sliceToEnd(1) */
       ->Belt.Array.map(item => {
           let isActive = item.isActive(currentLocation##pathname, item.link);
           <TextLink
             key={item.link}
             href={item.link}
             style=Style.(
               concat([
                 styles##link,
                 isActive ? styles##linkActive : style([]),
               ])
             )>
             item.text->ReasonReact.string
           </TextLink>;
         })
       ->ReasonReact.array}
    </View>,
};
