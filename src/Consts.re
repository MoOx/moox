let title = {j|MoOx|j};
let defaultTitle = title ++ {j|, Front-End Web & Mobile Developer|j};
let titleTemplate = {j|%s - |j} ++ title;

type menuLink = {
  link: string,
  text: string,
  icon:
    (~width: float, ~height: float, ~fill: string, unit) =>
    ReasonReact.reactElement,
  isActive: (string, string) => bool,
};

let menuLinks = [
  {
    link: "/",
    text: {j|Home|j},
    icon: (~width, ~height, ~fill, _) => <SVGMenuHome width height fill />,
    isActive: (current, link) => current == link,
  },
  {
    link: "/talks/",
    text: {j|Talks|j},
    icon: (~width, ~height, ~fill, _) => <SVGMenuTalk width height fill />,
    isActive: (current, _link) =>
      Js.String.startsWith("/talks/", current)
      || Js.String.startsWith("/talk/", current),
  },
  {
    link: "/blog/",
    text: {j|Blog|j},
    icon: (~width, ~height, ~fill, _) => <SVGMenuBlog width height fill />,
    isActive: (current, _link) => Js.String.startsWith("/blog/", current),
  },
  {
    link: "/contact/",
    text: {j|Contact|j},
    icon: (~width, ~height, ~fill, _) => <SVGMenuContact width height fill />,
    isActive: (current, link) => current == link,
  },
];

type socialLink = {
  link: string,
  componentFunc:
    (~iconColor: string, ~iconSize: float) => ReasonReact.reactElement,
};

let socialLinks = [
  {
    link: "https://github.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialGithub fill=iconColor width=iconSize height=iconSize />,
  },
  {
    link: "https://www.linkedin.com/in/maxthirouin/",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialLinkedin fill=iconColor width=iconSize height=iconSize />,
  },
  {
    link: "https://twitter.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialTwitter fill=iconColor width=iconSize height=iconSize />,
  },
];
