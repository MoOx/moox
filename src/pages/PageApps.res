open ReactNative
open ReactMultiversal

@react.component
let make = () => {
  <AppWrapper>
    <Next.Head>
      <title>
        {(Consts.title ++ (", React & React Native " ++ Consts.defaultTitle))->React.string}
      </title>
    </Next.Head>
    // <HeaderSmall title="Apps" />
    <View style={Predefined.styles["flex"]}>
      <Container
        wrapperStyle={
          open Style
          style(~backgroundColor=Consts.Colors.light, ())
        }>
        <ScreenHeader title="Apps" />
        <Spacer size=L />
        <View style={Predefined.styles["rowWrap"]}>
          <SpacedView horizontal=S vertical=S>
            <ImageFromUri
              uri="/apps/lifetime/icon.png"
              style={Style.imageStyle(
                ~width=96.->Style.dp,
                ~height=96.->Style.dp,
                ~borderRadius=96. *. 0.175,
                (),
              )}
            />
          </SpacedView>
          <SpacedView
            horizontal=S
            vertical=S
            style={Style.viewStyle(~flexGrow=1., ~flexShrink=1., ~flexBasis=180.->Style.dp, ())}>
            <TextLink
              href="/apps/lifetime"
              style={Style.textStyle(~fontSize=36., ~lineHeight=36., ~fontWeight=#bold, ())}>
              {"LifeTime"->React.string}
            </TextLink>
            <Spacer size=S />
            <View style={Predefined.styles["flexShrink"]}>
              <Text style={Style.textStyle(~fontSize=16., ~flexShrink=1., ())}>
                {"A personal coach that shows you clearly your daily activities, and help you to reach your goals."->React.string}
              </Text>
            </View>
            <Spacer size=S />
            <View
              style={Style.array([
                Predefined.styles["rowWrap"],
                Predefined.styles["flexShrink"],
                Style.viewStyle(~justifyContent=#flexEnd, ()),
              ])}>
              <a href="https://testflight.apple.com/join/HZJj4kel">
                <SpacedView horizontal=S vertical=S>
                  <img
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png"
                    height="48"
                  />
                </SpacedView>
              </a>
              <Spacer />
              <a href="https://play.google.com/store/apps/details?id=io.moox.lifetime">
                <Spacer size=XXS />
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  height="70"
                />
              </a>
            </View>
          </SpacedView>
        </View>
        <Spacer size=L />
        <View style={Predefined.styles["rowWrap"]}>
          <SpacedView horizontal=S vertical=S>
            <ImageFromUri
              uri="/apps/hide-the-notch/icon.png"
              style={Style.imageStyle(
                ~width=96.->Style.dp,
                ~height=96.->Style.dp,
                ~borderRadius=96. *. 0.175,
                (),
              )}
            />
          </SpacedView>
          <SpacedView
            horizontal=S
            vertical=S
            style={Style.viewStyle(~flexGrow=1., ~flexShrink=1., ~flexBasis=180.->Style.dp, ())}>
            <TextLink
              href="/apps/hide-the-notch"
              style={Style.textStyle(~fontSize=36., ~lineHeight=36., ~fontWeight=#bold, ())}>
              {"Hide The Notch"->React.string}
            </TextLink>
            <Spacer size=S />
            <Text style={Style.textStyle(~fontSize=16., ())}>
              {"Simple app to hide your notch."->React.string}
            </Text>
            <Spacer size=S />
            <View
              style={Style.array([
                Predefined.styles["rowWrap"],
                Style.viewStyle(~justifyContent=#flexEnd, ()),
              ])}>
              <a href="https://apps.apple.com/us/app/hide-the-notch/id1312839983?ls=1">
                <SpacedView horizontal=S vertical=S>
                  <img
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png"
                    height="48"
                  />
                </SpacedView>
              </a>
              // <Spacer />
              // <a href="">
              //   <Spacer size=XXS />
              //   <img
              //     src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              //     height="70"
              //   />
              // </a>
            </View>
          </SpacedView>
        </View>
      </Container>
    </View>
  </AppWrapper>
}

let default = make
