open BsReactNative;

let component = ReasonReact.statelessComponent("Footer");

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
      "barWrapper": style([backgroundColor(String(Consts.Colors.dark))]),
      "icons": style([flexDirection(Row)]),
      "barLinks": style([flexDirection(Row)]),
      "barLink":
        style([
          padding(Pt(10.)),
          fontSize(Float(14.)),
          lineHeight(44.),
          color(String("#FBFCF8")),
        ]),
      "barText":
        style([
          fontSize(Float(10.)),
          lineHeight(20.),
          color(String("#FBFCF8")),
        ]),
      "row":
        style([flexDirection(Row), flexWrap(Wrap), alignItems(Center)]),
      "column": style([alignItems(Center), justifyContent(Center)]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##menu>
      <Container style=styles##bar wrapperStyle=styles##barWrapper>
        <View style=styles##barLinks>
          {Consts.menuLinks
           ->Belt.Array.map(item =>
               <TextLink
                 key={item.link} style=styles##barLink href={item.link}>
                 item.text->ReasonReact.string
               </TextLink>
             )
           ->ReasonReact.array}
        </View>
        <View style=styles##column>
          <View style=styles##row>
            <Text style=styles##barText>
              "Made with "->ReasonReact.string
            </Text>
            <TextLink style=styles##barText href="https://phenomic.io">
              "Phenomic"->ReasonReact.string
            </TextLink>
            <Text style=styles##barText> " and "->ReasonReact.string </Text>
            <TextLink style=styles##barText href="https://reasonml.github.io/">
              "Reason"->ReasonReact.string
            </TextLink>
          </View>
          <TextLink
            style=styles##barText href="https://github.com/MoOx/moox.io">
            "Source available on GitHub"->ReasonReact.string
          </TextLink>
        </View>
        <SocialIcons
          wrapperStyle=styles##icons
          iconStyle=styles##barLink
          iconSize=22.
        />
      </Container>
    </View>,
};
