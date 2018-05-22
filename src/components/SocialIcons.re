open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("SocialIcons");

type link = {
  link: string,
  componentFunc:
    (~iconColor: string, ~iconSize: float) => ReasonReact.reactElement
};

let links = [
  {
    link: "https://github.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialGithub fill=iconColor width=iconSize height=iconSize />
  },
  {
    link: "https://www.linkedin.com/in/maxthirouin/",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialLinkedin fill=iconColor width=iconSize height=iconSize />
  },
  {
    link: "https://twitter.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialTwitter fill=iconColor width=iconSize height=iconSize />
  }
];

let make =
    (
      ~wrapperStyle,
      ~iconStyle,
      ~iconColor="#FBFCF8",
      ~iconSize=16.,
      /* note the default value that just wrap with a simple node */
      ~iconWrapperFunc=(~children) => <Text> ...children </Text>,
      _children
    ) => {
  ...component,
  render: _self =>
    <View style=wrapperStyle>
      (
        List.map(
          item =>
            <MyLink key=item.link style=iconStyle href=item.link>
              (
                iconWrapperFunc(
                  ~children=[|item.componentFunc(~iconColor, ~iconSize)|]
                )
              )
            </MyLink>,
          links
        )
        |> list
      )
    </View>
};
