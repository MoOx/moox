open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Header");

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
            marginBottom(Pt(60.)),
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
            fontSize(Float(22.)),
            lineHeight(44.),
            color(String("#FBFCF8")),
          ]),
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
        <SocialIcons
          wrapperStyle=styles##icons
          iconStyle=styles##barLink
          iconSize=22.
        />
      </Container>
    </View>,
};
