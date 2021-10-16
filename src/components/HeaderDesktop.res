open Belt
open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "barWrapper": style(~zIndex=1, ()),
    "bar": style(
      ~flexDirection=#row,
      ~flexWrap=#wrap,
      ~justifyContent=#spaceBetween,
      ~alignItems=#center,
      (),
    ),
    "logo": style(
      ~flexDirection=#row,
      ~position=#relative,
      ~zIndex=1,
      ~paddingHorizontal=10.->dp,
      ~alignItems=#center,
      (),
    ),
    "logoText": style(~fontSize=18., ~fontWeight=#_700, ~color=Predefined.Colors.white, ()),
    "icons": style(~flexDirection=#row, ()),
    "icon": style(~padding=8.->dp, ()),
    "linkContainer": style(~flexDirection=#row, ()),
    "link": style(
      ~padding=10.->dp,
      ~fontSize=16.,
      ~lineHeight=18. *. 1.7,
      ~fontWeight=#_500,
      ~color=Predefined.Colors.white,
      (),
    ),
    "linkActive": textStyle(
      ~textShadowOffset=offset(~width=0., ~height=0.),
      ~textShadowRadius=16.,
      ~textShadowColor="rgba(0, 246, 255, 0.75)",
      // ~textDecorationLine=#underline,
      // ~textDecorationStyle=#solid,
      ~borderBottomWidth=Predefined.hairlineWidth,
      ~borderBottomColor=Predefined.Colors.white
      ->RescriptTinycolor.TinyColor.makeFromString
      ->Option.map(c =>
        c->RescriptTinycolor.TinyColor.setAlpha(0.25, _)->RescriptTinycolor.TinyColor.toString
      )
      ->Option.getWithDefault(Predefined.Colors.white),
      ~borderStyle=#solid,
      (),
    ),
  })
}

@react.component
let make = () => {
  <Container wrapperStyle={styles["barWrapper"]}>
    <SpacedView vertical=S style={styles["bar"]}>
      <ViewLink style={styles["logo"]} href="/">
        <div
          style={ReactDOM.Style.make(
            ~filter="drop-shadow(1px 1px 10px rgba(255,255,255,0.15))" ++
            "drop-shadow(-1px 1px 10px rgba(255,255,255,0.15))" ++
            "drop-shadow(-1px -1px 10px rgba(255,255,255,0.15))" ++
            "drop-shadow(1px -1px 10px rgba(255,255,255,0.15))" ++ "drop-shadow(0 0 10px rgba(255,255,255,0.15)) ",
            (),
          )}>
          <SVGLogo width={36.->Style.dp} height={36.->Style.dp} fill=Predefined.Colors.white />
        </div>
        <Spacer size=M />
        <Text style={styles["logoText"]}> {Consts.title->React.string} </Text>
        <Spacer size=XS />
      </ViewLink>
      <View style={styles["linkContainer"]}>
        {Consts.menuLinks
        ->Belt.Array.map(item =>
          <TextLink
            key=item.link href=item.link style={styles["link"]} activeStyle={styles["linkActive"]}>
            {item.text->React.string}
          </TextLink>
        )
        ->React.array}
      </View>
      <View style={Predefined.styles["rowCenter"]}>
        <SocialIcons
          wrapperStyle={Predefined.styles["row"]} iconStyle={styles["icon"]} iconSize=20.
        />
        <Spacer />
        <View>
          <View
            style={Style.viewStyle(
              ~position=#absolute,
              ~top=-12.->Style.dp,
              ~left=-12.->Style.dp,
              ~bottom=-12.->Style.dp,
              ~right=-12.->Style.dp,
              (),
            )}>
            <svg
              viewBox="0 0 82 82"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="linearGradient-1">
                  <stop stopColor="#FFA456" offset="0%" />
                  <stop stopColor="#FFA456" stopOpacity="0" offset="100%" />
                </linearGradient>
                <linearGradient x1="100%" y1="0%" x2="50%" y2="50%" id="linearGradient-2">
                  <stop stopColor="#00B1EE" offset="0%" />
                  <stop stopColor="#00B1EE" stopOpacity="0" offset="100%" />
                </linearGradient>
                <linearGradient x1="0%" y1="100%" x2="50%" y2="50%" id="linearGradient-3">
                  <stop stopColor="#EE0000" offset="0%" />
                  <stop stopColor="#EE00E1" stopOpacity="0" offset="100%" />
                </linearGradient>
                <linearGradient x1="100%" y1="100%" x2="50%" y2="50%" id="linearGradient-4">
                  <stop stopColor="#8700FF" offset="0%" />
                  <stop stopColor="#EE00E1" stopOpacity="0" offset="100%" />
                </linearGradient>
                <rect id="path-5" x="0" y="0" width="58" height="58" rx="29" />
                <filter
                  x="-25.9%"
                  y="-25.9%"
                  width="151.7%"
                  height="151.7%"
                  filterUnits="objectBoundingBox"
                  id="filter-6">
                  <feGaussianBlur stdDeviation="5" in_="SourceGraphic" />
                </filter>
              </defs>
              <g transform="translate(-1480.000000, -21.000000)">
                <g transform="translate(402.000000, 33.000000)">
                  <g transform="translate(1090.000000, -0.000000)" filter="url(#filter-6)">
                    <use fill="url(#linearGradient-1)" xlinkHref="#path-5" />
                    <use fill="url(#linearGradient-2)" xlinkHref="#path-5" />
                    <use fill="url(#linearGradient-3)" xlinkHref="#path-5" />
                    <use fill="url(#linearGradient-4)" xlinkHref="#path-5" />
                  </g>
                </g>
              </g>
            </svg>
          </View>
          <Avatar size=40. borderWidth=2. borderColor="#000" />
        </View>
      </View>
    </SpacedView>
  </Container>
}

let default = make
