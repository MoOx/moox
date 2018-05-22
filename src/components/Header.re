open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Header");

type link = {
  link: string,
  text: string
};

let links = [{link: "/", text: {j|Home|j}}, {link: "/talks/", text: {j|Talks|j}}, {link: "/contact/", text: {j|Contact|j}}];

let styles =
  StyleSheet.create(
    Style.(
      {
        "header":
          style([
            justifyContent(Center),
            alignItems(Center),
            marginBottom(Pt(60.))
          ]),
        "topbar":
          style([
            flexDirection(Row),
            flexWrap(Wrap),
            justifyContent(SpaceBetween)
          ]),
        "topbarWrapper": style([backgroundColor("#030303")]),
        "icons": style([flexDirection(Row)]),
        "topbarLinks": style([flexDirection(Row)]),
        "topbarLink":
          style([padding(Pt(10.)), fontSize(Float(22.)), lineHeight(44.),color("#FBFCF8")])
      }
    )
  );

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##header>
      <Container style=styles##topbar wrapperStyle=styles##topbarWrapper>
        <View style=styles##topbarLinks>
          (
            List.map(
              item =>
                <MyLink
                  key=item.link style=styles##topbarLink href=item.link>
                  (item.text |> text)
                </MyLink>,
              links
            )
            |> list
          )
        </View>
        <SocialIcons wrapperStyle=styles##icons iconStyle=styles##topbarLink iconSize=22./>
      </Container>
    </View>
};
