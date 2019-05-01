open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "menu":
        style([
          justifyContent(Center),
          alignItems(Center),
          borderTopWidth(10.),
          borderColor(String(Consts.Colors.dark)),
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
        ]),
      "barWrapper": style([backgroundColor(String(Consts.Colors.light))]),
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
          fontSize(Float(18.)),
          fontWeight(`_700),
          color(String(Consts.Colors.dark)),
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
        <SVGLogo width=20. height=20. fill=Consts.Colors.dark />
        <Text style=styles##logoText>
          {("  " ++ Consts.title)->React.string}
        </Text>
      </ViewLink>
      <HeaderMenuLinks currentLocation />
      <SocialIcons
        wrapperStyle=styles##icons
        iconStyle=styles##icon
        iconSize=22.
        iconColor=Consts.Colors.dark
      />
    </Container>
  </View>;
};

let default = make;
