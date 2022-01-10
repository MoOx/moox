open ReactNative
open Style
open ReactMultiversal

let styles = {
  "barWrapper": style(
    ~shadowColor="#000",
    ~shadowOffset=offset(~width=0., ~height=5.),
    ~shadowOpacity=0.15,
    ~shadowRadius=20.,
    ~zIndex=1,
    // ~backgroundColor=Predefined.Colors.white,
    (),
  ),
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
  "logoText": style(~fontSize=26., ~fontWeight=#_700, ~color=Predefined.Colors.black, ()),
  "icons": style(~flexDirection=#row, ()),
  "icon": style(
    ~flexGrow=1.,
    ~flexShrink=0.,
    ~display=#flex,
    ~justifyContent=#center,
    ~alignItems=#center,
    ~paddingHorizontal=12.->dp,
    ~paddingVertical=6.->dp,
    ~fontSize=12.,
    (),
  ),
  "linkContainer": style(~flexDirection=#row, ()),
  "link": style(
    ~padding=10.->dp,
    ~fontSize=16.,
    ~lineHeight=18. *. 1.7,
    ~color=Predefined.Colors.black,
    (),
  ),
  "linkActive": style(~textDecorationLine=#underline, ~textDecorationStyle=#solid, ()),
}->StyleSheet.create

@react.component
let make = () => {
  let {asPath} = Next.Router.useRouter()
  <GradientLinearBackground
    stops=[
      {
        offset: 0.->pct,
        stopColor: "#01093C",
        stopOpacity: "1",
      },
      {
        offset: 100.->pct,
        stopColor: "#060C4E",
        stopOpacity: "1",
      },
    ]
    style={Predefined.styles["flex1"]}>
    <Container style={styles["bar"]} wrapperStyle={styles["barWrapper"]}>
      <ViewLink style={styles["logo"]} href="/">
        <SVGLogo width={24.->Style.dp} height={24.->Style.dp} fill=Predefined.Colors.black />
        <Spacer size=XS />
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
      {asPath |> Js.String.startsWith("/contact")
        ? <a href="/MaximeThirouin.vcf" style={ReactDOM.Style.make(~textDecoration="none", ())}>
            <ButtonOutlined
              round=true verticalSpace=XXS horizontalSpace=S color=Predefined.Colors.Ios.light.pink>
              <ButtonOutlined.Text color=Predefined.Colors.white>
                {"Save"->React.string}
              </ButtonOutlined.Text>
              <Spacer size=XS />
              <SVGContact width={20.->Style.dp} height={20.->Style.dp} fill=Consts.Colors.light />
            </ButtonOutlined>
          </a>
        : <ViewLink href="/contact/">
            <ButtonOutlined
              round=true verticalSpace=XXS horizontalSpace=S color=Predefined.Colors.Ios.light.blue>
              <ButtonOutlined.Text color=Predefined.Colors.white>
                {"Get in touch"->React.string}
              </ButtonOutlined.Text>
              <Spacer size=XS />
              <SVGArrowRoundedWithTailTop
                width={20.->Style.dp} height={20.->Style.dp} fill=Predefined.Colors.white
              />
            </ButtonOutlined>
          </ViewLink>}
    </Container>
  </GradientLinearBackground>
}

let default = make
