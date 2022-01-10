open ReactNative
open ReactMultiversal

let title = j`MoOx`
let defaultTitle = j`Freelance Creative Developer, Front-End / Mobile & Web`
let titleTemplate = j`%s - ` ++ title

type menuLink = {
  link: string,
  text: string,
  textSmall: option<string>,
  icon: (~width: float, ~height: float, ~fill: string, unit) => React.element,
  isActive: (string, string) => bool,
}

let menuLinks: array<menuLink> = [
  {
    link: "/",
    text: j`Home`,
    textSmall: None,
    icon: (~width, ~height, ~fill, _) =>
      <SVGMenuHome width={width->Style.dp} height={height->Style.dp} fill />,
    isActive: (current, link) => current == link,
  },
  {
    link: "/resume",
    text: j`About`,
    textSmall: None,
    icon: (~width, ~height, ~fill, _) =>
      <SVGMenuResume width={width->Style.dp} height={height->Style.dp} fill />,
    isActive: (current, _link) => Js.String.startsWith("/resume", current),
  },
  {
    link: "/development",
    text: `Development`,
    textSmall: Some(`Dev`),
    icon: (~width, ~height, ~fill, _) =>
      <SVGCode width={width->Style.dp} height={height->Style.dp} fill />,
    isActive: (current, link) => current == link,
  },
  // {
  //   link: "/apps",
  //   text: `Apps`,
  //   textSmall: None,
  //   icon: (~width, ~height, ~fill, _) =>
  //     <SVGApps width={width->Style.dp} height={height->Style.dp} fill />,
  //   isActive: (current, link) => current == link,
  // },
  // {
  //   link: "/solutions",
  //   text: {j|Solutions|j},
  //   icon: (~width, ~height, ~fill, _) =>
  //     <SVGMenuResume width={width->Style.dp} height={height->Style.dp} fill />,
  //   isActive: (current, _link) =>
  //     Js.String.startsWith("/solutions", current),
  // },

  {
    link: "/talks",
    text: j`Talks`,
    textSmall: None,
    icon: (~width, ~height, ~fill, _) =>
      <SVGMenuTalk width={width->Style.dp} height={height->Style.dp} fill />,
    isActive: (current, _link) =>
      Js.String.startsWith("/talks", current) || Js.String.startsWith("/talk", current),
  },
  {
    link: "/blog",
    text: j`Blog`,
    textSmall: None,
    icon: (~width, ~height, ~fill, _) =>
      <SVGMenuBlog width={width->Style.dp} height={height->Style.dp} fill />,
    isActive: (current, _link) => Js.String.startsWith("/blog", current),
  },
]

type socialLink = {
  text: string,
  alt: string,
  link: string,
  componentFunc: (~iconColor: string, ~iconSize: float) => React.element,
}
type lightLink = {
  text: string,
  link: string,
}

let socialLinks = [
  {
    text: "GitHub",
    alt: "@MoOx on GitHub",
    link: "https://github.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialGithub fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
  {
    text: "Twitter",
    alt: "@MoOx on Twitter",
    link: "https://twitter.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialTwitter fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
  {
    text: "LinkedIn",
    alt: "@MoOx on LinkedIn",
    link: "https://www.linkedin.com/in/maxthirouin",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialLinkedin fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
]
let socialLinks2 = [
  {
    text: "Dribbble",
    alt: "@MoOx on Dribbble",
    link: "https://dribbble.com/MoOx",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialDribbble fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
  {
    text: "Youtube",
    alt: "@MoOx on Youtube",
    link: "https://www.youtube.com/channel/UCn_edMm2hg7k58E4eQGU7pA",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGSocialYoutube fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
]

let moreLinks = [
  {
    text: "App Store",
    alt: "@MoOx on Apple App Store",
    link: "https://apps.apple.com/us/developer/maxime-thirouin/id1312839982",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGAppStoreApple fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
  {
    text: "Play Store",
    alt: "@MoOx on Google Play Store",
    link: "https://play.google.com/store/apps/dev?id=8171431484805703288",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGAppStoreGoogle fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
  {
    text: "npm",
    alt: "@MoOx on npm",
    link: "https://www.npmjs.com/~moox",
    componentFunc: (~iconColor, ~iconSize) =>
      <SVGAppStoreNpm fill=iconColor width={iconSize->Style.dp} height={iconSize->Style.dp} />,
  },
]
let moreLinks2 = [
  {
    text: "Putain de code!",
    link: "https://putaindecode.io",
  },
  {
    text: "Source Karma",
    link: "https://sourcekarma.vercel.app/MoOx",
  },
  {
    text: "Git Awards",
    link: "http://git-awards.com/users/moox",
  },
]

module Colors = {
  let black = "#000"
  let white = "#fff"
  let darkest = "hsl(219.1, 100%, 2%)"
  let dark = "hsl(219.1, 100%, 8.5%)"
  let light = "hsl(219.1, 100%, 99%)"
  let lightest = "hsl(219.1, 100%, 99.5%)"
  let darkGrey = "#666"
  let grey = "#aaa"
  let lightGrey = "#eaeaea"
  let ultralightGrey = "#f0f0f0"
  let midGrey = "#d4d2ce"
  let default = "#030303"
  let mainLight = "#200094"
  let mainDark = Predefined.Colors.Ios.dark.indigo
}
