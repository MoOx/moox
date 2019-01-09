open BsReactNative;

let colorInActive = "#909192";
let colorActive = "#000";

let component = ReasonReact.statelessComponent("AppMenu");

let styles =
  StyleSheet.create(
    Style.{
      "wrapper":
        style([
          borderTopWidth(StyleSheet.hairlineWidth),
          borderColor(String("#E3E4E5")),
        ]),
      "container":
        style([
          flex(1.),
          flexDirection(Row),
          minHeight(Pt(50.)),
          alignItems(Center),
        ]),
      "itemWrapper": style([flex(1.), justifyContent(Center)]),
      "item": style([justifyContent(Center), alignItems(Center)]),
      "itemText":
        style([
          flex(1.),
          color(String(colorInActive)),
          fontSize(Float(10.)),
          marginTop(Pt(1.5)),
        ]),
      "itemTextActive": style([color(String(colorActive))]),
    },
  );

let make = (~currentLocation, _children) => {
  ...component,
  render: _self => {
    <SafeAreaView style=styles##wrapper>
      <View style=styles##container>
        {Consts.menuLinks
         ->Belt.Array.map(item => {
             let isActive =
               item.isActive(currentLocation##pathname, item.link);
             <ViewLink
               key={item.link} href={item.link} style=styles##itemWrapper>
               <View style=styles##item>
                 {item.icon(
                    ~width=24.,
                    ~height=24.,
                    ~fill={isActive ? colorActive : colorInActive},
                    (),
                  )}
                 <Text
                   style=Style.(
                     concat([
                       styles##itemText,
                       isActive ? styles##itemTextActive : style([]),
                     ])
                   )>
                   item.text->ReasonReact.string
                 </Text>
               </View>
             </ViewLink>;
           })
         ->ReasonReact.array}
      </View>
    </SafeAreaView>;
  },
};

[@bs.deriving abstract]
type jsProps = {currentLocation: {. "pathname": string}};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~currentLocation=jsProps->currentLocationGet, [||])
  );
