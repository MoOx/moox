open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Footer");

type link = {
  link: string,
  text: string,
};

let links = [
  {link: "/", text: {j|Home|j}},
  {link: "/talks/", text: {j|Talks|j}},
  {link: "/contact/", text: {j|Contact|j}},
];

let styles =
  StyleSheet.create(
    Style.(
      {
        "menu":
          style([
            justifyContent(Center),
            alignItems(Center),
            marginTop(Pt(80.)),
          ]),
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
            fontSize(Float(14.)),
            lineHeight(44.),
            color(String("#FBFCF8")),
          ]),
        "barText":
          style([
            fontSize(Float(12.)),
            lineHeight(24.),
            color(String("#FBFCF8")),
          ]),
        "row":
          style([flexDirection(Row), flexWrap(Wrap), alignItems(Center)]),
        "column": style([alignItems(Center), justifyContent(Center)]),
      }
    ),
  );

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##menu>
      <Container style=styles##bar wrapperStyle=styles##barWrapper>
        <View style=styles##barLinks>
          (
            List.map(
              item =>
                <TextLink key=item.link style=styles##barLink href=item.link>
                  (item.text |> text)
                </TextLink>,
              links,
            )
            |> list
          )
        </View>
        <View style=styles##column>
          <View style=styles##row>
            <Text style=styles##barText> ("Made with " |> text) </Text>
            <TextLink style=styles##barText href="https://phenomic.io">
              ("Phenomic" |> text)
            </TextLink>
            <Text style=styles##barText> (" and " |> text) </Text>
            <TextLink style=styles##barText href="https://reasonml.github.io/">
              ("Reason" |> text)
            </TextLink>
          </View>
          <TextLink
            style=styles##barText href="https://github.com/MoOx/moox.io">
            ("Source available on GitHub" |> text)
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
