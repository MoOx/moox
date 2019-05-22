open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "menu":
        style([
          justifyContent(Center),
          alignItems(Center),
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.15),
          shadowRadius(20.),
          zIndex(1),
        ]),
      "bar":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(SpaceBetween),
          alignItems(Center),
        ]),
      "barWrapper": style([backgroundColor(String(Consts.Colors.darkest))]),
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
          fontSize(Float(24.)),
          fontWeight(`_800),
          color(String(Consts.Colors.light)),
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
    })
  );

[@react.component]
let make = (~currentLocation, ()) => {
  <View style=styles##menu>
    <Container style=styles##bar wrapperStyle=styles##barWrapper>
      <ViewLink style=styles##logo href="/">
        <SVGLogo width=24. height=24. fill=Consts.Colors.light />
        <Spacer size=XS />
        <Text style=styles##logoText> Consts.title->React.string </Text>
        <Spacer size=XS />
      </ViewLink>
      <HeaderMenuLinks currentLocation />
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
               color=Predefined.Colors.green>
               <ButtonOutlined.Text color=Predefined.Colors.white>
                 "Get in touch"->React.string
               </ButtonOutlined.Text>
               <Spacer size=XS />
               {RouteResume.rightArrow(~color=Predefined.Colors.white, 20.)}
             </ButtonOutlined>
           </ViewLink>}
    </Container>
  </View>;
};

let default = make;
