open ReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "barWrapper":
        style(
          ~shadowColor="#000",
          ~shadowOffset=offset(~width=0., ~height=5.),
          ~shadowOpacity=0.15,
          ~shadowRadius=20.,
          ~zIndex=1,
          ~backgroundColor=Predefined.Colors.white,
          (),
        ),
      "bar":
        style(
          ~flexDirection=`row,
          ~flexWrap=`wrap,
          ~justifyContent=`spaceBetween,
          ~alignItems=`center,
          (),
        ),
      "logo":
        style(
          ~flexDirection=`row,
          ~position=`relative,
          ~zIndex=1,
          ~paddingHorizontal=10.->dp,
          ~alignItems=`center,
          (),
        ),
      "logoText":
        style(
          ~fontSize=26.,
          ~fontWeight=`_700,
          ~color=Predefined.Colors.black,
          (),
        ),
      "icons": style(~flexDirection=`row, ()),
      "icon":
        style(
          ~flexGrow=1.,
          ~flexShrink=0.,
          ~display=`flex,
          ~justifyContent=`center,
          ~alignItems=`center,
          ~paddingHorizontal=12.->dp,
          ~paddingVertical=6.->dp,
          ~fontSize=12.,
          (),
        ),
      "linkContainer": style(~flexDirection=`row, ()),
      "link":
        style(
          ~padding=10.->dp,
          ~fontSize=16.,
          ~lineHeight=18. *. 1.7,
          ~color=Predefined.Colors.black,
          (),
        ),
      "linkActive":
        style(
          ~textDecorationLine=`underline,
          ~textDecorationStyle=`solid,
          (),
        ),
    })
  );

[@react.component]
let make = (~currentLocation, ()) => {
  <Container style=styles##bar wrapperStyle=styles##barWrapper>
    <ViewLink style=styles##logo href="/">
      <SVGLogo
        width={24.->Style.dp}
        height={24.->Style.dp}
        fill=Predefined.Colors.black
      />
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
             color={Predefined.Colors.Ios.light.pink}>
             <ButtonOutlined.Text color=Predefined.Colors.white>
               "Save"->React.string
             </ButtonOutlined.Text>
             <Spacer size=XS />
             <SVGContact
               width={20.->Style.dp}
               height={20.->Style.dp}
               fill=Consts.Colors.light
             />
           </ButtonOutlined>
         </a>
       : <ViewLink href="/contact/">
           <ButtonOutlined
             round=true
             verticalSpace=XXS
             horizontalSpace=S
             color={Predefined.Colors.Ios.light.blue}>
             <ButtonOutlined.Text color=Predefined.Colors.white>
               "Get in touch"->React.string
             </ButtonOutlined.Text>
             <Spacer size=XS />
             {RouteResume.rightArrow(
                ~color=Predefined.Colors.white,
                20.->Style.dp,
              )}
           </ButtonOutlined>
         </ViewLink>}
  </Container>;
};

let default = make;
