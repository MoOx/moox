open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
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
    })
  );

[@react.component]
let make = (~currentLocation, ()) => {
  <View style=styles##container>
    {Consts.menuLinks
     ->Belt.Array.map(item =>
         <TextLink
           key={item.link}
           href={item.link}
           style=Style.(
             arrayOption([|
               Some(styles##link),
               item.isActive(currentLocation##pathname, item.link)
                 ? Some(styles##linkActive) : None,
             |])
           )>
           item.text->React.string
         </TextLink>
       )
     ->React.array}
  </View>;
};
