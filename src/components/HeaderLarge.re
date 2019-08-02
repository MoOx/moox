open BsReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "barWrapper":
        style([
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.15),
          shadowRadius(20.),
          zIndex(1),
          backgroundColor(String(Predefined.Colors.white)),
        ]),
      "bar":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(SpaceBetween),
          alignItems(Center),
        ]),
      "logo":
        style([
          flexDirection(Row),
          position(Relative),
          zIndex(1),
          paddingHorizontal(Pt(10.)),
          alignItems(Center),
        ]),
      "logoText":
        style([
          fontSize(Float(26.)),
          fontWeight(`_700),
          color(String(Predefined.Colors.black)),
        ]),
      "icons": style([flexDirection(Row)]),
      "icon":
        style([
          flexGrow(1.),
          flexShrink(0.),
          display(Flex),
          justifyContent(Center),
          alignItems(Center),
          paddingHorizontal(Pt(12.)),
          paddingVertical(Pt(6.)),
          fontSize(Float(12.)),
        ]),
      "linkContainer": style([flexDirection(Row)]),
      "link":
        style([
          padding(Pt(10.)),
          fontSize(Float(16.)),
          lineHeight(18. *. 1.7),
          color(String(Predefined.Colors.black)),
        ]),
      "linkActive":
        style([textDecorationLine(Underline), textDecorationStyle(Solid)]),
    })
  );

[@react.component]
let make = (~currentLocation, ()) => {
  <Container style=styles##bar wrapperStyle=styles##barWrapper>
    <ViewLink style=styles##logo href="/">
      <SVGLogo width=24. height=24. fill=Predefined.Colors.black />
      <Spacer size=XS />
      <Text style=styles##logoText> Consts.title->React.string </Text>
      <Spacer size=XS />
    </ViewLink>
    <View style=styles##linkContainer>
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
    </View>
    {currentLocation##pathname |> Js.String.startsWith("/contact/")
       ? <a
           href="/MaximeThirouin.vcf"
           style={ReactDOMRe.Style.make(~textDecoration="none", ())}>
           <ButtonOutlined
             round=true
             verticalSpace=XXS
             horizontalSpace=S
             color=Predefined.Colors.pink>
             <ButtonOutlined.Text color=Predefined.Colors.white>
               "Save"->React.string
             </ButtonOutlined.Text>
             <Spacer size=XS />
             <SVGContact width=20. height=20. fill=Consts.Colors.light />
           </ButtonOutlined>
         </a>
       : <ViewLink href="/contact/">
           <ButtonOutlined
             round=true
             verticalSpace=XXS
             horizontalSpace=S
             color=Predefined.Colors.blue>
             <ButtonOutlined.Text color=Predefined.Colors.white>
               "Get in touch"->React.string
             </ButtonOutlined.Text>
             <Spacer size=XS />
             {RouteResume.rightArrow(~color=Predefined.Colors.white, 20.)}
           </ButtonOutlined>
         </ViewLink>}
  </Container>;
};

let default = make;
