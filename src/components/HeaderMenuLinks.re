open BsReactNative;

let component = ReasonReact.statelessComponent("HeaderMenuLinks");

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
let make = (~currentLocation, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View style=styles##container>
        {Consts.menuLinks
         ->Belt.Array.map(item =>
             <TextLink
               key={item.link}
               href={item.link}
               style=Style.(
                 concat([
                   styles##link,
                   item.isActive(currentLocation##pathname, item.link)
                     ? styles##linkActive : style([]),
                 ])
               )>
               item.text->ReasonReact.string
             </TextLink>
           )
         ->ReasonReact.array}
      </View>,
  });
