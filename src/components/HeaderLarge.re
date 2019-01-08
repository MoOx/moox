open BsReactNative;

let component = ReasonReact.statelessComponent("HeaderLarge");

let styles =
  StyleSheet.create(
    Style.{
      "menu": style([justifyContent(Center), alignItems(Center)]),
      "bar":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(SpaceBetween),
        ]),
      "barWrapper": style([backgroundColor(String("#030303"))]),
      "icons": style([flexDirection(Row)]),
      "barLinks": style([flexDirection(Row)]),
      "barLink":
        style([
          padding(Pt(10.)),
          fontSize(Float(18.)),
          lineHeight(18. *. 1.7),
          color(String("#FBFCF8")),
        ]),
      "barLinkActive":
        style([textDecorationLine(Underline), textDecorationStyle(Solid)]),
    },
  );

let make = (~currentLocation, _children) => {
  ...component,
  render: _self =>
    <View style=styles##menu>
      <Container style=styles##bar wrapperStyle=styles##barWrapper>
        <View style=styles##barLinks>
          {Consts.menuLinks
           ->Belt.List.map(item => {
               let isActive =
                 item.isActive(currentLocation##pathname, item.link);
               <TextLink
                 key={item.link}
                 href={item.link}
                 style=Style.(
                   concat([
                     styles##barLink,
                     isActive ? styles##barLinkActive : style([]),
                   ])
                 )>
                 {item.text |> R.string}
               </TextLink>;
             })
           ->R.list}
        </View>
        <SocialIcons
          wrapperStyle=styles##icons
          iconStyle=styles##barLink
          iconSize=22.
        />
      </Container>
    </View>,
};

[@bs.deriving abstract]
type jsProps = {currentLocation: {. "pathname": string}};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~currentLocation=jsProps->currentLocationGet, [||])
  );
