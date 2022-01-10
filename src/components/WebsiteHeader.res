open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  StyleSheet.create({
    "barWrapper": style(~zIndex=1, ~overflow=#visible, ()),
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
    )->unsafeAddStyle({
      "filter": "drop-shadow(-2px 0 0 cyan) drop-shadow(2px 0 0 red) saturate(0.75)",
    }),
    "logoText": style(
      ~fontFamily="Arial, sans-serif",
      ~fontSize=28.,
      ~lineHeight=28.,
      ~fontWeight=#_700,
      ~color=Predefined.Colors.white,
      ~marginBottom=4.->pct,
      (),
    ),
    "icons": style(~flexDirection=#row, ()),
    "icon": style(~padding=8.->dp, ()),
    "linkContainer": style(~flexDirection=#row, ()),
    "link": style(
      ~padding=10.->dp,
      ~fontSize=16.,
      ~lineHeight=16. *. 1.7,
      ~fontWeight=#_500,
      ~color=Predefined.Colors.white,
      (),
    ),
    "linkActive": textStyle(
      ~borderBottomWidth=1.5,
      ~borderBottomColor=Predefined.Colors.white
      ->RescriptTinycolor.TinyColor.makeFromString
      ->Option.map(c =>
        c->RescriptTinycolor.TinyColor.setAlpha(0.25, _)->RescriptTinycolor.TinyColor.toString
      )
      ->Option.getWithDefault(Predefined.Colors.white),
      ~borderStyle=#solid,
      (),
    )->unsafeAddStyle({
      "filter": "drop-shadow(0 0 6px cyan)",
    }),
  })
}

@react.component
let make = () => {
  let (isProfileOpen, isProfileOpen_set) = React.useState(() => false)
  <View style={array([viewStyle(~zIndex=10, ())])}>
    <Container wrapperStyle={styles["barWrapper"]}>
      <SpacedView vertical=S style={styles["bar"]}>
        <ViewLink style={styles["logo"]} href="/">
          <SVGLogo width={36.->Style.dp} height={36.->Style.dp} fill=Predefined.Colors.white />
          <Spacer size=M />
          <Text style={styles["logoText"]}> {Consts.title->React.string} </Text>
          <Spacer size=XS />
        </ViewLink>
        <WindowSizeFilter.MMin>
          <View style={styles["linkContainer"]}>
            {Consts.menuLinks
            ->Belt.Array.map(item =>
              <TextLink
                key=item.link
                href=item.link
                style={styles["link"]}
                activeStyle={Style.array([styles["linkActive"]])}>
                {item.text->React.string}
              </TextLink>
            )
            ->React.array}
          </View>
        </WindowSizeFilter.MMin>
        <Pressable onPress={_ => isProfileOpen_set(_ => !isProfileOpen)}>
          {_ =>
            <View style={unsafeStyle({"cursor": "pointer"})}>
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
                    <linearGradient
                      x1="0%" y1="0%" x2="100%" y2="100%" id="apple-m1-linearGradient-1">
                      <stop stopColor="#FFA456" offset="0%" />
                      <stop stopColor="#FFA456" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="100%" y1="0%" x2="50%" y2="50%" id="apple-m1-linearGradient-2">
                      <stop stopColor="#00B1EE" offset="0%" />
                      <stop stopColor="#00B1EE" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="0%" y1="100%" x2="50%" y2="50%" id="apple-m1-linearGradient-3">
                      <stop stopColor="#EE0000" offset="0%" />
                      <stop stopColor="#EE00E1" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="100%" y1="100%" x2="50%" y2="50%" id="apple-m1-linearGradient-4">
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
                        <use fill="url(#apple-m1-linearGradient-1)" xlinkHref="#path-5" />
                        <use fill="url(#apple-m1-linearGradient-2)" xlinkHref="#path-5" />
                        <use fill="url(#apple-m1-linearGradient-3)" xlinkHref="#path-5" />
                        <use fill="url(#apple-m1-linearGradient-4)" xlinkHref="#path-5" />
                      </g>
                    </g>
                  </g>
                </svg>
              </View>
              <Avatar size=40. borderWidth=2. borderColor="#000" />
            </View>}
        </Pressable>
        {isProfileOpen
          ? <View style={viewStyle(~position=#absolute, ~top=70.->dp, ~right=24.->dp, ())}>
              <ViewLink href="/contact/" accessibilityLabel="Contact" style={styles["icon"]}>
                <SVGEmail
                  fill=Consts.Colors.lightest width={20.->Style.dp} height={20.->Style.dp}
                />
              </ViewLink>
              <SocialIcons
                wrapperStyle={Predefined.styles["col"]} iconStyle={styles["icon"]} iconSize=20.
              />
            </View>
          : React.null}
      </SpacedView>
    </Container>
  </View>
}

let default = make
