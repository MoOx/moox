open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "menu": style([justifyContent(Center), alignItems(Center)]),
      "bar":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(SpaceBetween),
        ]),
      "barWrapper": style([backgroundColor(String(Consts.Colors.dark))]),
      "icons": style([flexDirection(Row), alignItems(Center)]),
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
    })
  );

[@react.component]
let make = () => {
  <View style=styles##menu>
    <Container style=styles##bar wrapperStyle=styles##barWrapper>
      <View style=styles##barLinks>
        {Consts.menuLinks
         ->Belt.Array.map(item =>
             <TextLink key={item.link} style=styles##barLink href={item.link}>
               item.text->React.string
             </TextLink>
           )
         ->React.array}
      </View>
      <View style=styles##column>
        <View style=styles##row>
          <Text style=styles##barText> "Made with "->React.string </Text>
          <TextLink style=styles##barText href="https://phenomic.io">
            "Phenomic"->React.string
          </TextLink>
          <Text style=styles##barText> " and "->React.string </Text>
          <TextLink style=styles##barText href="https://reasonml.github.io/">
            "Reason"->React.string
          </TextLink>
        </View>
        <TextLink style=styles##barText href="https://github.com/MoOx/moox.io">
          "Source available on GitHub"->React.string
        </TextLink>
      </View>
      <SocialIcons
        wrapperStyle=styles##icons
        iconStyle=styles##barLink
        iconSize=22.
      />
    </Container>
  </View>;
};
