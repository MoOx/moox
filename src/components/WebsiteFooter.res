open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

@react.component
let make = () => {
  let theme = T.useTheme()
  let skySize = 400.
  <View style={viewStyle(~transform=[unsafeTransform({"translateZ": "0px"})], ())}>
    <View
      style={viewStyle(~height=skySize->dp, ())->unsafeAddStyle({
        "backgroundImage": "linear-gradient(rgba(118, 28, 174, 0) 0%, rgba(118, 28, 174, 1) 100%)",
      })}
    />
    <View
      style={viewStyle(
        ~position=#absolute,
        ~top=0.->dp,
        ~left=0.->dp,
        ~right=0.->dp,
        ~alignItems=#center,
        ~justifyContent=#flexEnd,
        ~height=(skySize +. 120.)->dp,
        (),
      )}>
      <img src="/_/landscape-sun.svg" alt="" width="500" />
    </View>
    <View
      style={viewStyle(~height=140.->dp, ())->unsafeAddStyle({
        "background": "#01093C url(/_/landscape-floor.png) no-repeat 50% 0% / cover",
      })}
    />
    <View
      style={viewStyle(
        ~position=#absolute,
        ~top=0.->dp,
        ~left=0.->dp,
        ~right=0.->dp,
        ~justifyContent=#flexEnd,
        ~alignItems=#center,
        ~height=(skySize +. 40.)->dp,
        (),
      )}>
      <img src="/_/landscape-montains.svg" alt="" height="180" />
    </View>
    <View
      style={viewStyle(
        ~position=#absolute,
        ~top=0.->dp,
        ~left=75.->pct,
        ~right=0.->dp,
        ~justifyContent=#flexEnd,
        ~alignItems=#center,
        ~height=(skySize +. 80.)->dp,
        (),
      )}>
      <img src="/_/landscape-tree.svg" alt="" height="160" />
    </View>
    <View style={viewStyle(~position=#absolute, ~top=0.->dp, ~left=10.->pct, ~right=50.->pct, ())}>
      <View style={viewStyle(~position=#absolute, ~top=20.->dp, ~left=-30.->dp, ())}>
        <Text
          accessible=false
          style={textStyle(
            ~fontFamily="StoneHarbourWash",
            ~fontSize=150.,
            ~lineHeight=150.,
            (),
          )->unsafeAddStyle({
            "filter": "drop-shadow(0 2px 4px rgba(122,22,102,0.50))",
            "WebkitTextStroke": "1px #A56C99",
            "backgroundClip": "text",
            "WebkitTextFillColor": "transparent",
            "backgroundColor": "#008CDE",
            "backgroundImage": "linear-gradient(-60deg, #008CDE 0%, #23C3AF 100%)",
          })}>
          {"a"->React.string}
        </Text>
      </View>
      <View style={viewStyle(~position=#absolute, ~top=0.->dp, ~left=0.->dp, ())}>
        <SVGFlashyTriangle3 width={150.->dp} height={150.->dp} />
      </View>
      <View
        style={viewStyle(
          ~position=#absolute,
          ~top=-20.->dp,
          ~left=28.->dp,
          ~borderRadius=100.,
          (),
        )}>
        <Avatar size=88. />
      </View>
    </View>
    <View style={array([Predefined.styles["center"], style(~backgroundColor="#01093C", ())])}>
      <SpacedView
        horizontal=None style={array([Predefined.styles["rowWrap"], Predefined.styles["flex"]])}>
        <SpacedView horizontal=L vertical=L>
          <SpacedView horizontal=None vertical=None>
            <Text
              style={array([Font.ios["headline"], Font.weight["100"], theme.styles["textOnMain"]])}>
              <Spacer size=M /> <Spacer size=XS /> {"Navigation"->React.string}
            </Text>
          </SpacedView>
          <Spacer />
          <View>
            {Consts.menuLinks
            ->Array.map(item =>
              <ViewLink
                key=item.link
                href=item.link
                style={array([Predefined.styles["row"], Predefined.styles["alignCenter"]])}>
                <Text style={textStyle(~opacity=0.15, ())}>
                  {item.icon(
                    ~width=Spacer.size(M),
                    ~height=Spacer.size(M),
                    ~fill=theme.colors.textOnMain,
                    (),
                  )}
                </Text>
                <SpacedView horizontal=XS vertical=XS>
                  <Text style={array([Font.iosEm["body"], theme.styles["textOnMain"]])}>
                    {item.text->React.string}
                  </Text>
                </SpacedView>
              </ViewLink>
            )
            ->React.array}
          </View>
        </SpacedView>
        <SpacedView horizontal=L vertical=L>
          <SpacedView horizontal=None vertical=None>
            <Text
              style={array([Font.ios["headline"], Font.weight["100"], theme.styles["textOnMain"]])}>
              <Spacer size=M /> <Spacer size=XS /> {"Follow Me"->React.string}
            </Text>
          </SpacedView>
          <Spacer />
          <View>
            {Consts.socialLinks
            ->Array.map(item =>
              <ViewLink
                key=item.link
                href=item.link
                accessibilityLabel=item.alt
                style={array([Predefined.styles["row"], Predefined.styles["alignCenter"]])}>
                {item.componentFunc(~iconColor=theme.colors.textOnMain, ~iconSize=Spacer.size(M))}
                <SpacedView horizontal=XS vertical=XS>
                  <Text style={array([Font.iosEm["body"], theme.styles["textOnMain"]])}>
                    {item.text->React.string}
                  </Text>
                </SpacedView>
              </ViewLink>
            )
            ->React.array}
            {Consts.socialLinks2
            ->Array.map(item =>
              <ViewLink
                key=item.link
                href=item.link
                accessibilityLabel=item.alt
                style={array([Predefined.styles["row"], Predefined.styles["alignCenter"]])}>
                <Spacer size=XXS />
                {item.componentFunc(~iconColor=theme.colors.textOnMain, ~iconSize=Spacer.size(S))}
                <Spacer size=XXS />
                <SpacedView horizontal=XXS vertical=XS>
                  <Text
                    style={array([
                      Font.ios["body"],
                      theme.styles["textOnMain"],
                      Font.weight["100"],
                    ])}>
                    {item.text->React.string}
                  </Text>
                </SpacedView>
              </ViewLink>
            )
            ->React.array}
          </View>
        </SpacedView>
        <SpacedView horizontal=L vertical=L>
          <SpacedView horizontal=None vertical=None>
            <Text
              style={array([Font.ios["headline"], Font.weight["100"], theme.styles["textOnMain"]])}>
              <Spacer size=M /> <Spacer size=XS /> {"More"->React.string}
            </Text>
          </SpacedView>
          <Spacer />
          <View>
            {Consts.moreLinks
            ->Array.map(item =>
              <ViewLink
                key=item.link
                href=item.link
                accessibilityLabel=item.alt
                style={array([Predefined.styles["row"], Predefined.styles["alignCenter"]])}>
                {item.componentFunc(~iconColor=theme.colors.textOnMain, ~iconSize=Spacer.size(M))}
                <SpacedView horizontal=XS vertical=XS>
                  <Text style={array([Font.iosEm["body"], theme.styles["textOnMain"]])}>
                    {item.text->React.string}
                  </Text>
                </SpacedView>
              </ViewLink>
            )
            ->React.array}
            {Consts.moreLinks2
            ->Array.map(item =>
              <ViewLink
                key=item.link
                href=item.link
                style={array([Predefined.styles["row"], Predefined.styles["alignCenter"]])}>
                <Spacer size=M />
                <Spacer size=XS />
                <SpacedView horizontal=None vertical=XS>
                  <Text
                    style={array([
                      Font.ios["body"],
                      theme.styles["textOnMain"],
                      Font.weight["100"],
                    ])}>
                    {item.text->React.string}
                  </Text>
                </SpacedView>
              </ViewLink>
            )
            ->React.array}
          </View>
        </SpacedView>
      </SpacedView>
      <View
        style={array([
          Predefined.styles["center"],
          viewStyle(~overflow=#hidden, ~maxWidth=100.->pct, ()),
        ])}>
        <Text
          accessible=false
          style={textStyle(
            ~fontFamily="StoneHarbourWash",
            ~fontSize=200.,
            ~lineHeight=200.,
            (),
          )->unsafeAddStyle({
            "fontSize": "min(200px, 50vw)",
            "filter": "drop-shadow(0 2px 4px rgba(122,22,102,0.50))",
            "WebkitTextStroke": "1px #A56C99",
            "backgroundClip": "text",
            "WebkitTextFillColor": "transparent",
            "backgroundColor": "#008CDE",
            "backgroundImage": "linear-gradient(to right, #FFEA53 0%, #CA3F87 50%, #1C2D98 100%)",
          })}>
          {"h"->React.string}
        </Text>
      </View>
      <SpacedView
        horizontal=L
        vertical=L
        style={array([
          Predefined.styles["rowWrap"],
          Predefined.styles["center"],
          unsafeStyle({
            "filter": "drop-shadow(-1px 0 0 cyan) drop-shadow(2px 0 0 red) saturate(0.75)",
          }),
        ])}>
        <View style={array([Predefined.styles["rowWrap"], Predefined.styles["flexShrink"]])}>
          <Text style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}>
            {"Made with "->React.string}
          </Text>
          <TextLink
            style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
            href="https://rescript-lang.org/">
            {"ReScript, "->React.string}
          </TextLink>
          <TextLink
            style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
            href="https://reactnative.dev">
            {"React Native"->React.string}
          </TextLink>
          <TextLink
            style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
            href="https://necolas.github.io/react-native-web/">
            {" Web, "->React.string}
          </TextLink>
          <TextLink
            style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
            href="https://nextjs.org">
            {"Next.js"->React.string}
          </TextLink>
          <Text style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}>
            {" and "->React.string}
          </Text>
          <TextLink
            style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
            href="https://rescript-react-native.github.io">
            {"ReScript React Native"->React.string}
          </TextLink>
          <Text style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}>
            {". "->React.string}
          </Text>
        </View>
        <TextLink
          style={array([Font.ios["footnote"], theme.styles["textOnMain"]])}
          href="https://github.com/MoOx/moox">
          {"100% Over-engineered source available on GitHub"->React.string}
        </TextLink>
      </SpacedView>
    </View>
  </View>
}
