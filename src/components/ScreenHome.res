open ReactNative
open ReactNative.Style
open ReactMultiversal

@react.component
let make = (~theme as themeMode=#auto) => {
  let theme = T.useTheme(~mode=themeMode, ())
  <>
    <SpacedView vertical=None>
      <ViewLink href="/resume/">
        <GradientLinearBackground
          style={viewStyle(~borderRadius=6., ~overflow=#hidden, ())}
          stops=[
            {
              offset: 0.->pct,
              stopColor: "#00d2ff",
              stopOpacity: "1",
            },
            {
              offset: 100.->pct,
              stopColor: "#792F93",
              stopOpacity: "1",
            },
          ]>
          <SpacedView>
            <View
              style={style(
                ~position=#absolute,
                ~opacity=0.1,
                ~transform=[perspective(~perspective=800.), rotate(~rotate=6.->deg)],
                ~right=-40.->dp,
                ~bottom=-50.->dp,
                (),
              )}>
              <SVGReact width={200.->dp} height={200.->dp} fill=Consts.Colors.light />
            </View>
            <Text style={array([Font.ios["title3"], T.stylesDark["text"]])}>
              {"I MAKE"->React.string}
            </Text>
            <Text style={array([Font.iosEm["largeTitle"], T.stylesDark["text"]])}>
              {"Apps & Websites"->React.string}
            </Text>
            <Spacer />
            <Text style={array([Font.ios["title3"], T.stylesDark["text"]])}>
              {"Web or Native ? It can also be both !"->React.string}
            </Text>
            <Spacer />
            <Text style={array([Font.ios["body"], T.stylesDark["text"]])}>
              {"Do you have such a need ? If so contact me !"->React.string}
            </Text>
            <Spacer />
          </SpacedView>
          <SpacedView
            style={style(
              ~backgroundColor="#00d2ff",
              ~flexDirection=#row,
              ~borderBottomLeftRadius=4.,
              ~borderBottomRightRadius=4.,
              (),
            )}>
            <SVGDevices fill=Consts.Colors.lightGrey width={42.->dp} height={42.->dp} />
            <Spacer />
            <Text style={array([Font.ios["largeTitle"], T.stylesDark["text"]])}>
              {"Mobile & Desktop"->React.string}
            </Text>
          </SpacedView>
        </GradientLinearBackground>
      </ViewLink>
      <Spacer size=L />
      <ViewLink href="/resume/">
        <Text style={array([Font.ios["subhead"], theme.styles["textLight1"]])}>
          {"Need help for your project?"->Js.String.toUpperCase->React.string}
        </Text>
        <Row.SpaceBetween>
          <Text style={array([Font.iosEm["title1"], theme.styles["text"]])}>
            {"I can help you"->React.string}
          </Text>
          <View style={style(~transform=[rotate(~rotate=90.->deg)], ())}>
            <SVGArrowRoundedWithTailTop width={20.->dp} height={20.->dp} fill=theme.colors.text />
          </View>
        </Row.SpaceBetween>
      </ViewLink>
      <Spacer size=S />
      <View style={Predefined.styles["rowWrapCenter"]}>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevHtml width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevCss width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevJavascript width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevTypescript width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS style={Predefined.styles["center"]}>
          <SVGDevPhp width={(256. /. 4.)->dp} height={(136. /. 4.)->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevWordpress width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevPhotoshop width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGSketch width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGAppStoreApple width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGAppStoreGoogle width={64.->dp} height={64.->dp} />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGReact width={64.->dp} height={64.->dp} fill="#61dafb" />
        </SpacedView>
        <SpacedView horizontal=XS vertical=XS>
          <SVGDevRescript width={64.->dp} height={64.->dp} />
        </SpacedView>
      </View>
    </SpacedView>
  </>
}
