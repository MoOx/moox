open BsReactNative;

let component = ReasonReact.statelessComponent("HeaderSmall");

let styles =
  StyleSheet.create(
    Style.{
      "wrapper":
        style([
          flexDirection(Row),
          justifyContent(SpaceBetween),
          backgroundColor(String("#fff")),
          borderTopWidth(10.),
          borderColor(String("#000F2B")),
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.1),
          shadowRadius(20.),
          zIndex(1),
        ]),
      "logo":
        style([
          flexDirection(Row),
          position(Relative),
          zIndex(1),
          paddingHorizontal(Pt(10.)),
          flex(1.),
          alignItems(Center),
        ]),
      "logoText": style([fontSize(Float(18.)), fontWeight(`_700)]),
      "icons":
        style([
          flex(1.),
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
        ]),
      "icon":
        style([
          flexGrow(1.),
          flexShrink(0.),
          display(Flex),
          alignItems(Center),
          padding(Pt(6.)),
          fontSize(Float(12.)),
        ]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <SpacedView vertical=M horizontal=XS style=styles##wrapper>
      <ViewLink style=styles##logo href="/">
        <SVGLogoInverted width=24. height=24. fill="#000F2B" />
        <Text style=styles##logoText>
          {("  " ++ Consts.title)->ReasonReact.string}
        </Text>
      </ViewLink>
      <Spacer />
      <SocialIcons
        wrapperStyle=styles##icons
        iconStyle=styles##icon
        iconColor="#000F2B"
        iconSize=20.
      />
    </SpacedView>,
};
