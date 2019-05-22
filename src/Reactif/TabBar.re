open BsReactNative;

let tabbarHeight = 50.;

let styles =
  Style.(
    StyleSheet.create({
      "wrapper":
        style([
          borderTopWidth(Predefined.hairlineWidth),
          borderColor(String(Predefined.Colors.separator)),
        ]),
      "container":
        style([
          flex(1.),
          flexDirection(Row),
          minHeight(Pt(tabbarHeight)),
          alignItems(Center),
        ]),
      "itemWrapper": style([flex(1.), justifyContent(Center)]),
      "item": style([justifyContent(Center), alignItems(Center)]),
      "itemText":
        style([flex(1.), fontSize(Float(10.)), marginTop(Pt(1.5))]),
    })
  );

type link = {
  link: string,
  text: string,
  icon: (~width: float, ~height: float, ~fill: string, unit) => React.element,
  isActive: (string, string) => bool,
};

[@react.component]
let make =
    (
      ~links: array(link),
      ~colorInActive=Predefined.Colors.grey,
      ~colorActive=Predefined.Colors.blue,
      ~currentLocation,
    ) => {
  <SafeAreaView
    key={Predefined.hairlineWidth->Js.Float.toString}
    // key=Predefined.hairlineWidth is to avoid SSR/hydrate issue
    style=styles##wrapper>
    <View style=styles##container>
      {links
       ->Belt.Array.map(item =>
           <ViewLink
             key={item.link} href={item.link} style=styles##itemWrapper>
             <View style=styles##item>
               {item.icon(
                  ~width=24.,
                  ~height=24.,
                  ~fill=
                    item.isActive(currentLocation##pathname, item.link)
                      ? colorActive : colorInActive,
                  (),
                )}
               <Text
                 style=Style.(
                   arrayOption([|
                     Some(styles##itemText),
                     Some(style([color(String(colorInActive))])),
                     item.isActive(currentLocation##pathname, item.link)
                       ? Some(style([color(String(colorActive))])) : None,
                   |])
                 )>
                 item.text->React.string
               </Text>
             </View>
           </ViewLink>
         )
       ->React.array}
    </View>
  </SafeAreaView>;
};

let default = make;

// static placeholder
// can be used so you can properly scroll to bottom of the page
// or you can sticky something at the bottom depending on the tabbar visibility
module Placeholder = {
  [@react.component]
  let make = () => {
    <View style=styles##container />;
  };
};
