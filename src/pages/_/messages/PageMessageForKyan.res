open Belt
open ReactNative
open ReactMultiversal
open Style

@module("@socialgouv/matomo-next")
external push: array<string> => unit = "push"

let styles = {
  StyleSheet.create({
    "subtitle": style(~fontSize=28., ~fontWeight=#_100, ~color=Consts.Colors.dark, ()),
    "title": style(~fontSize=42., ~fontWeight=#bold, ~color=Consts.Colors.dark, ()),
    "actions": style(~alignItems=#center, ()),
    "button": style(~maxWidth=400.->dp, ~alignItems=#flexStart, ()),
  })
}

@module("react-native")
external unstable_createElement: (string, 'a, option<React.element>) => React.element =
  "unstable_createElement"

@react.component
let make = () => {
  let (isClient, isClient_set) = React.useState(() => false)
  React.useEffect1(() => {
    isClient_set(_ => true)
    None
  }, [isClient_set])

  let theme = T.useTheme(#auto)
  let scrollYAnimatedValue = AppWrapper.scrollYAnimatedValue
  let windowsDims = Dimensions.useWindowDimensions()
  let moonLightSize = min(windowsDims.width /. 2., 300.)

  let (helloWaveLayout, helloWaveLayout_set) = React.useState(() => None)
  let onhelloWaveLayout = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    helloWaveLayout_set(_ => Some(layout))
  }, [helloWaveLayout_set])

  let (quote1Layout, quote1Layout_set) = React.useState(() => None)
  let onQuote1Layout = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    quote1Layout_set(_ => Some(layout))
  }, [quote1Layout_set])

  let (punchsLayout, punchsLayout_set) = React.useState(() => None)
  let onPunchsLayout = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    punchsLayout_set(_ => Some(layout))
  }, [punchsLayout_set])

  let (thanksCardLayout, thanksCardLayout_set) = React.useState(() => None)
  let onThanksCardLayout = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    thanksCardLayout_set(_ => Some(layout))
  }, [thanksCardLayout_set])

  let (likeYouLayout, likeYouLayout_set) = React.useState(() => None)
  let onLikeYouLayout = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    likeYouLayout_set(_ => Some(layout))
  }, [likeYouLayout_set])

  React.useEffect1(() => {
    let _ = %raw(`window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process && window.instgrm.Embeds.process()`)
    None
  }, [])
  let punchsReboundAnimatedValue = React.useRef(Animated.Value.create(0.))
  let punchsReboundStarsAnimatedValue = React.useRef(Animated.Value.create(0.))
  let punchsRebound = React.useRef(false)
  let punchsReboundAction = React.useCallback3(() => {
    Animated.parallel(
      [
        Animated.sequence([
          punchsReboundAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=-.(windowsDims.width /. 2.)->Animated.Value.Timing.fromRawValue,
              ~duration=100.,
              ~useNativeDriver=true,
              (),
            ),
          ),
          punchsReboundAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=0.->Animated.Value.Timing.fromRawValue,
              ~duration=250.,
              ~useNativeDriver=true,
              (),
            ),
          ),
          punchsReboundAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=-20.->Animated.Value.Timing.fromRawValue,
              ~duration=50.,
              ~useNativeDriver=true,
              (),
            ),
          ),
          punchsReboundAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=0.->Animated.Value.Timing.fromRawValue,
              ~duration=50.,
              ~useNativeDriver=true,
              (),
            ),
          ),
        ]),
        Animated.sequence([
          punchsReboundStarsAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=0.->Animated.Value.Timing.fromRawValue,
              ~delay=100.,
              ~duration=225.,
              ~useNativeDriver=true,
              (),
            ),
          ),
          punchsReboundStarsAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=1.->Animated.Value.Timing.fromRawValue,
              ~duration=100.,
              ~useNativeDriver=true,
              (),
            ),
          ),
          punchsReboundStarsAnimatedValue.current->Animated.timing(
            Animated.Value.Timing.config(
              ~toValue=0.->Animated.Value.Timing.fromRawValue,
              ~duration=50.,
              ~useNativeDriver=true,
              (),
            ),
          ),
        ]),
      ],
      {stopTogether: false},
    )->Animated.start()
  }, (punchsReboundAnimatedValue, punchsReboundStarsAnimatedValue, windowsDims.width))
  React.useEffect3(() => {
    punchsLayout
    ->Option.map(layout => {
      let gap = layout.y -. windowsDims.height /. 2.
      let cb = value => {
        if !punchsRebound.current {
          if value["value"] > gap {
            punchsRebound.current = true
            punchsReboundAction()
            push(["trackEvent", "message-pour-kyan", "scroll", "punch"])
          }
        } else if value["value"] < gap {
          punchsRebound.current = false
          push(["trackEvent", "message-pour-kyan", "scroll", "punch-rollback"])
        }
      }
      let id = scrollYAnimatedValue->Animated.Value.addListener(cb)
      Some(
        () => {
          scrollYAnimatedValue->Animated.Value.removeListener(id)
        },
      )
    })
    ->Option.getWithDefault(None)
  }, (punchsLayout, punchsReboundAction, windowsDims.height))

  let tmp = ref(Animated.Value.create(-1.)).contents
  let punchsReboundAnimatedValueReverse =
    punchsReboundAnimatedValue.current->Animated.Value.multiply(tmp)

  <ReactNativeSafeAreaContext.SafeAreaProvider initialMetrics=AppWrapper.initialMetrics>
    <AppMeta />
    <Next.Head>
      <title> {("Message pour Kyan, de " ++ Consts.title)->React.string} </title>
    </Next.Head>
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
      <GradientRadialBackground
      // angle=135.
        stops=[
          {
            offset: 0.->pct,
            stopColor: "#00F6FF",
            stopOpacity: "0.2",
          },
          {
            offset: 50.->pct,
            stopColor: "#00F6FF",
            stopOpacity: "0",
          },
        ]
        style={viewStyle(
          ~position=#absolute,
          ~top=0.->dp,
          ~left=0.->dp,
          ~width=moonLightSize->dp,
          ~height=moonLightSize->dp,
          (),
        )}
      />
      <div
        style={ReactDOM.Style.make(
          ~display="flex",
          ~flexDirection="column",
          ~flexGrow="1",
          ~background="url(/_/stars.png) repeat 0% 0% / 400px 300px",
          (),
        )}>
        <WebsiteHeader />
        <Spacer size=XXL />
        <Text style={textStyle(~textAlign=#center, ~maxWidth=100.->pct, ())}>
          <Text
            style={textStyle(
              ~fontFamily="StoneHarbour",
              ~fontSize=100.,
              ~lineHeight=100.,
              ~color="#fff",
              (),
            )->unsafeAddStyle({
              "filter": "drop-shadow(1px 1px 1px rgba(0,0,0,0.5)) drop-shadow(2px 8px 11px rgba(254,167,183,0.22))",
              // "WebkitTextStroke": "0.5px #EC6FCB",
              "backgroundClip": "text",
              "WebkitTextFillColor": "transparent",
              "backgroundImage": "linear-gradient(0deg, #DBC469 0%, #EC6FCB 80%)",
            })}>
            {"Salut "->React.string}
          </Text>
          <Text
            style={textStyle(
              ~fontFamily="Phosphate",
              ~fontSize=100.,
              ~lineHeight=100.,
              ~color="#fff",
              ~textAlign=#right,
              (),
            )->unsafeAddStyle({
              "WebkitTextStroke": "1px #3EF8D9",
              "filter": "drop-shadow(0 0 14px #1DB6B2)",
            })}>
            {" KYAN"->React.string}
          </Text>
        </Text>
        <View onLayout={onhelloWaveLayout}>
          <Animated.View
            style={viewStyle(
              ~transform=helloWaveLayout->Option.mapWithDefault([], layout => [
                translateX(
                  ~translateX=scrollYAnimatedValue
                  ->Animated.Interpolation.interpolate(
                    Animated.Interpolation.config(
                      ~inputRange=[0., windowsDims.height],
                      ~outputRange=[30., -30.]->Animated.Interpolation.fromFloatArray,
                      ~extrapolateLeft=#clamp,
                      ~extrapolate=#identity,
                      ~extrapolateRight=#clamp,
                      (),
                    ),
                  )
                  ->Animated.StyleProp.float,
                ),
                rotateZ(
                  ~rotateZ=scrollYAnimatedValue
                  ->Animated.Interpolation.interpolate(
                    Animated.Interpolation.config(
                      ~inputRange=[
                        0.,
                        (layout.y +. layout.height) /. 8.,
                        (layout.y +. layout.height) /. 8. *. 2.,
                        (layout.y +. layout.height) /. 8. *. 3.,
                        (layout.y +. layout.height) /. 8. *. 4.,
                        (layout.y +. layout.height) /. 8. *. 5.,
                      ],
                      ~outputRange=[
                        "10deg",
                        "-10deg",
                        "10deg",
                        "-10deg",
                        "10deg",
                        "-10deg",
                      ]->Animated.Interpolation.fromStringArray,
                      ~extrapolateLeft=#clamp,
                      ~extrapolate=#identity,
                      ~extrapolateRight=#clamp,
                      (),
                    ),
                  )
                  ->Animated.StyleProp.angle,
                ),
              ]),
              (),
            )}>
            <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
              {`👋`->React.string}
            </Text>
          </Animated.View>
        </View>
        <Spacer size=XXL />
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView horizontal=L vertical=L>
              <Text style={array([Font.ios["title2"], theme.styles["text"]])}>
                {`J'ai pas écrit ton nom pour pas me tromper sur l'emplacement du H. 
Blague à part, je me permets de t'écrire pour quelque chose de très simple mais qui me tient énormément à coeur. `->React.string}
              </Text>
              <Spacer />
              <Text style={array([Font.ios["caption"], theme.styles["text"]])}>
                {`On a récemment échangé brièvement sur Insta suite à une story où je partageais des produits que j'avais acheté sur une bonne boutique, et je t'ai dit que je te re-contacterais autrement que par Insta. Et voilà !`->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.iosEm["title1"], theme.styles["textOnMain"]])}>
              {`Je fais des `->React.string}
              <Text
                style={textStyle(
                  ~fontFamily="Phosphate",
                  ~fontSize=60.,
                  ~lineHeight=100.,
                  ~color="#fff",
                  ~textAlign=#right,
                  (),
                )->unsafeAddStyle({
                  "WebkitTextStroke": "1px #1DB6B2",
                  "filter": "drop-shadow(0 0 14px #3EF8D9)",
                })}>
                {"LOGICIELS"->React.string}
              </Text>
              {`.`->React.string}
            </Text>
          </SpacedView>
        </Container>
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView horizontal=L vertical=L>
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`Je suis développeur. Je suis capable de coder des applications (principalement web et mobile). Comme tu aimes dire des logiciels. 

D'ailleurs pour que tu puisses enfin expliquer aux gens qui sourient quand tu dis logiciel: une "application" c'est un raccourci pour "logiciel applicatif", qui a une application directe pour un humain (avec une interface et des boutons), à l'inverse d'un logiciel "système" qui lui fait du travail sans que tu t'en rendes compte (ex: des tâches de fond qui vont vérifier si y'a des mises à jour etc).  
Tu m'apportes beaucoup de moment de rire, j'espère que je t'aurais au moins apporté cette petite explication. `->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Animated.View
          onLayout=onQuote1Layout
          style={viewStyle(
            ~margin=auto,
            // ~borderStyle=#solid,
            // ~borderWidth=1.,
            // ~borderColor="red",
            // ~maxWidth=480.->dp,
            ~transform=quote1Layout
            ->Option.map(layout => [
              // perspective(~perspective=1000.),
              unsafeTransform({"translateZ": "0px"}),
              scale(
                ~scale={
                  open Animated.Interpolation
                  scrollYAnimatedValue->interpolate(
                    config(
                      ~inputRange=[
                        layout.y -. windowsDims.height,
                        layout.y -. windowsDims.height /. 2.,
                        layout.y -. windowsDims.height /. 2. +. layout.height /. 2.,
                        layout.y +. layout.height /. 2.,
                        layout.y +. layout.height,
                      ],
                      ~outputRange=[0.8, 0.9, 1., 0.9, 0.8]->fromFloatArray,
                      ~extrapolateLeft=#clamp,
                      ~extrapolate=#identity,
                      ~extrapolateRight=#clamp,
                      (),
                    ),
                  )
                }->Animated.StyleProp.float,
              ),
              translateX(
                ~translateX={
                  open Animated.Interpolation
                  scrollYAnimatedValue->interpolate(
                    config(
                      ~inputRange=[
                        layout.y -. windowsDims.height,
                        layout.y -. windowsDims.height /. 2.,
                        layout.y -. windowsDims.height /. 2. +. layout.height /. 2.,
                        layout.y +. layout.height /. 2.,
                        layout.y +. layout.height,
                      ],
                      ~outputRange=[
                        windowsDims.width,
                        min(layout.x, layout.width),
                        0.,
                        -.min(layout.x, layout.width),
                        -.windowsDims.width,
                      ]->fromFloatArray,
                      ~extrapolateLeft=#clamp,
                      ~extrapolate=#identity,
                      ~extrapolateRight=#clamp,
                      (),
                    ),
                  )
                }->Animated.StyleProp.float,
              ),
            ])
            ->Option.getWithDefault([]),
            (),
          )}>
          <Spacer size=XL />
          <Text style={textStyle(~fontFamily="Arial", ~fontSize=20., ~color="#fff", ())}>
            {`Des fois tu parles à des`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Phosphate", ~fontSize=85., ~color="#fff", ())}>
            {`GENS,`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Arial", ~fontSize=21.5, ~color="#fff", ())}>
            {`Tu leur dis t'utilises un`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Phosphate", ~fontSize=50., ~color="#fff", ())}>
            {`LOGICIEL,`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Arial", ~fontSize=15., ~color="#fff", ())}>
            {`ils te disent c'est une application`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Arial", ~fontSize=19., ~color="#fff", ())}>
            {`mais en fait c'est pas une`->React.string}
          </Text>
          <Text style={textStyle(~fontFamily="Phosphate", ~fontSize=36., ~color="#fff", ())}>
            {`APPLICATION.`->React.string}
          </Text>
          <Spacer size=XL />
        </Animated.View>
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView horizontal=L vertical=L>
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {`On s'est déjà parlé, vite fait.`->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`C'était trop bref (🙃) et j'ai pas eu le courage de te trop te parler. 

Bon en même temps c'était après un spectacle (à Montauban) où tu avais envoyé masse d'énergie positive, puis quasi 1h de dédicaces et selfies, donc j'ai pas voulu te souler. 

Je me suis dit que je trouverais plus original. J'espère que cette page web l'est! `->React.string}
            </Text>
          </SpacedView>
        </Container>
        <Container style={Predefined.styles["center"]}>
          <div
            dangerouslySetInnerHTML={{
              "__html": `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/CUkd6XZoKRH/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CUkd6XZoKRH/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/CUkd6XZoKRH/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Max (@mooxitoh)</a></p></div></blockquote>`,
            }}
          />
          <Next.Head> <script src="https:////www.instagram.com/embed.js" /> </Next.Head>
        </Container>
        <Spacer size=XXL />
        <Container style={Predefined.styles["center"]}>
          <SpacedView style={array([Predefined.styles["flex"], Predefined.styles["center"]])}>
            <Text
              style={textStyle(
                ~textAlign=#center,
                ~fontFamily="StoneHarbour",
                ~fontSize=100.,
                ~lineHeight=100.,
                ~color="#fff",
                (),
              )->unsafeAddStyle({
                "filter": "drop-shadow(1px 1px 1px rgba(0,0,0,0.5)) drop-shadow(2px 8px 11px rgba(254,167,183,0.22))",
                // "WebkitTextStroke": "0.5px #EC6FCB",
                "backgroundClip": "text",
                "WebkitTextFillColor": "transparent",
                "backgroundImage": "linear-gradient(0deg, #DBC469 0%, #EC6FCB 80%)",
              })}>
              {`Merci pour tout `->React.string}
            </Text>
          </SpacedView>
        </Container>
        <Spacer size=XXL />
        <View onLayout=onThanksCardLayout>
          <Container style={Predefined.styles["center"]} maxWidth={600.->dp}>
            <View
              style={viewStyle(
                ~maxWidth=450.->dp,
                ~width=100.->pct,
                ~margin=auto,
                ~marginRight=0.->dp,
                (),
              )}>
              <Spacer size=L />
              <Animated.View
                style={array([
                  StyleSheet.absoluteFill,
                  viewStyle(
                    ~backgroundColor="#190349",
                    ~transform=thanksCardLayout->Option.mapWithDefault([], layout => [
                      unsafeTransform({"translateZ": "-1000px"}),
                      translateY(~translateY=-60.),
                      perspective(
                        ~perspective=scrollYAnimatedValue
                        ->Animated.Interpolation.interpolate(
                          Animated.Interpolation.config(
                            ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                            ~outputRange=[650., 750.]->Animated.Interpolation.fromFloatArray,
                            ~extrapolateLeft=#clamp,
                            ~extrapolate=#identity,
                            ~extrapolateRight=#clamp,
                            (),
                          ),
                        )
                        ->Animated.StyleProp.float,
                      ),
                      rotateX(~rotateX=-10.->deg),
                      rotateY(~rotateY=10.->deg),
                      rotateZ(
                        ~rotateZ=scrollYAnimatedValue
                        ->Animated.Interpolation.interpolate(
                          Animated.Interpolation.config(
                            ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                            ~outputRange=["-5deg", "5deg"]->Animated.Interpolation.fromStringArray,
                            ~extrapolateLeft=#clamp,
                            ~extrapolate=#identity,
                            ~extrapolateRight=#clamp,
                            (),
                          ),
                        )
                        ->Animated.StyleProp.angle,
                      ),
                    ]),
                    (),
                  )->unsafeAddStyle({
                    "filter": "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))",
                    "backgroundImage": "linear-gradient(0deg, #190349 0%, #49007B 100%)",
                  }),
                ])}
              />
              <View
                style={viewStyle(
                  ~maxWidth=280.->dp,
                  ~margin=auto,
                  ~transform=[unsafeTransform({"translateZ": "0px"})],
                  (),
                )}>
                <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
                  {`Je sais que tu aimes remercier les gens (en plus de les faire kiffer) et tu as bien raison.
Je te remercie à mon tour, car j'ai été très touché par tes spectacles. Ton travail m'épates et m'inspires énormément.
Le fait que tu travailles avec Navo (que je suis depuis la "Bande Pas Dessinée") me fait kiffer encore plus. Vous faites des choses fantastiques.

D'ailleurs, la Bande Pas Dessinée est toujours dans mes toilettes - en version papier - mais pas pour s'essuyer, et elle est maintenant accompagnée de ton spectacle "Pulsions" illustré par Boulet, pour que je passe toujours de petits bons moments, plusieurs fois par jour (moi aussi je mange beaucoup de fruits et légumes).

Bref, merci pour ton travail.`->React.string}
                </Text>
                <Spacer size=XL />
                <Spacer size=XL />
              </View>
            </View>
          </Container>
        </View>
        <Container>
          <SpacedView vertical=None>
            <Text style={array([Font.iosEm["title1"], theme.styles["textOnMain"]])}>
              {`Je suis `->React.string}
              {`\n`->React.string}
              <Text
                style={textStyle(
                  ~fontFamily="StoneHarbour",
                  ~fontSize=60.,
                  ~lineHeight=100.,
                  ~color="#fff",
                  ~textAlign=#right,
                  (),
                )->unsafeAddStyle({
                  "WebkitTextStroke": "1px #1DB6B2",
                  "filter": "drop-shadow(0 0 14px #3EF8D9)",
                })}>
                {`développeur créatif`->React.string}
              </Text>
              {`\n`->React.string}
              {`qui aime les humains.`->React.string}
            </Text>
            <Text
              style={textStyle(
                ~fontFamily="StoneHarbourWash",
                ~fontSize=150.,
                ~lineHeight=150.,
                ~textAlign=#center,
                (),
              )->unsafeAddStyle({
                "filter": "drop-shadow(1px 1px 1px rgba(0,0,0,0.5)) drop-shadow(2px 8px 11px rgba(254,167,183,0.22))",
                "backgroundImage": "linear-gradient(50deg, #EC6FCB 0%, #DBC469 60%)",
                "WebkitTextStroke": "0.5px #A56C99",
                "backgroundClip": "text",
                "WebkitTextFillColor": "transparent",
              })}>
              {"a"->React.string}
            </Text>
          </SpacedView>
        </Container>
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView vertical=L>
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`Indépendant à mon propre compte, je fais des apps mobile et des sites web avec des technologies innovantes (“React” notamment). Par altruisme, j'ai écrit beaucoup de code open source, utilisé par des millions de personnes, jusqu'à des grosses entreprises américaines.

Le développement, c’est un kiff que j’ai commencé ado (quand je n’étais pas au théâtre) à travers un site de soluces pour la série de jeux Zelda (et ta voix off dans une certaine vidéo de Paul me fait croire que tu affectionnes aussi cette série).
Et depuis j'ai aquis de l'XP tout plein. J'espère que cheveux blancs sont signe de ma sagesse... 😁
`->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`Au fur et à mesure de ma carrière, j'ai toujours refusé de bosser pour des grosses entreprises telles que Facebook, Google & co par soucis éthique.
Je préfère privilégier les projets à taille humaine, mais plus ça va plus j'ai de mal à trouver, paradoxalement peut être à cause de ma spécialisation dans certaines technologies.
`->React.string}
            </Text>
          </SpacedView>
        </Container>
        <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
          {`🤗`->React.string}
        </Text>
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`
Mais avant d'être développeur, je suis un artiste passionné. Entre autres, j'ai toujours dessiné pendant la plupart de mes cours pendant mes études.
C'est pour cela qu'avec le temps, je suis me suis concentré sur la partie selon moi la plus créative des applications: les interfaces graphiques.
J'aime quand c'est vivant, quand ça bouge et que c'est bien réfléchi.
`->React.string}
            </Text>
          </SpacedView>
          <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
            {`🧑‍🎨`->React.string}
          </Text>
        </Container>
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView vertical=L>
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`À côté de ça, l'humour c'est quelque chose que j'ai toujours eu dans le sang (quand j'étais boy-scout, j'ai eu mon badge de saltimbanque, si ça c'est pas une preuve 😂) mais c'est quelque chose que j'ai perdu malgré moi, suite à un mauvais enchainement d'épreuves difficiles de la vie.
                
Après un travail sur moi salvateur, j'ai enfin eu un regain d'énergie. Je me suis même lancé dans le stand-up tout récemment!
J'ai épluché toutes les heures de podcasts que j'ai pu dénicher (Des Gens qui doutent, jusqu'au Café au Lot7) où tu parles autour du stand-up, de l'écriture & co pour me lancer.
Tout cela m'a énormément servi. Merci pour ces heures de partage. Mais ce n'est pas pour ça que je te contacte.
`->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Container maxWidth={480.->dp}>
          <SpacedView vertical=XL>
            <Text style={array([Font.iosEm["largeTitle"], theme.styles["textOnMain"]])}>
              {`J'aimerais travailler avec des bons gens comme toi.`->React.string}
            </Text>
          </SpacedView>
        </Container>
        <Spacer size=XL />
        {
          let skewYValue = 5.->deg
          <View
            style={viewStyle(~maxWidth=750.->dp, ~width=100.->pct, ~margin=auto, ())}
            onLayout=onLikeYouLayout>
            <View
              style={array([
                StyleSheet.absoluteFill,
                viewStyle(
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                ),
                theme.styles["back"],
              ])}
            />
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~top=30.->dp,
                ~left=40.->pct,
                ~width=80.->dp,
                ~height=10.->dp,
                ~opacity=0.85,
                ~transform=likeYouLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  skewY(~skewY=skewYValue),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                        ~outputRange=[-40., 20.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                ]),
                (),
              )->unsafeAddStyle({
                "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
              })}
            />
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~top=28.->dp,
                ~left=45.->pct,
                ~width=120.->dp,
                ~height=15.->dp,
                ~opacity=0.5,
                ~transform=likeYouLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  skewY(~skewY=skewYValue),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                        ~outputRange=[20., -20.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                ]),
                (),
              )->unsafeAddStyle({
                "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
              })}
            />
            <Spacer />
            <SpacedView
              vertical=XXL
              horizontal=L
              style={viewStyle(
                ~maxWidth=400.->dp,
                ~margin=auto,
                ~transform=[unsafeTransform({"translateZ": "0px"})],
                (),
              )}>
              // <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
              //   {"Cross-platform apps"->React.string}
              // </Text>
              // <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`Aujourd'hui j'aimerais aller plus loin et en me rapprochant du milieu de “l’entertainement” et en particulier du monde humoristique via ma profession.
J’aimerais vraiment utiliser mes compétences professionnelles afin d'apporter plus de fun dans notre monde. Moi aussi j'ai envie de faire kiffer les gens, peu importe que ce soit dans l'ombre ou pas.`->React.string}
              </Text>
              <Spacer size=M />
            </SpacedView>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~bottom=-10.->dp,
                ~left=-5.->pct,
                ~width=140.->dp,
                ~height=20.->dp,
                ~opacity=0.95,
                ~transform=likeYouLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  skewY(~skewY=skewYValue),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                        ~outputRange=[-50., 50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                ]),
                (),
              )->unsafeAddStyle({
                "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
              })}
            />
            <Animated.View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~bottom=20.->dp,
                  ~left=10.->pct,
                  ~width=80.->dp,
                  ~height=10.->dp,
                  ~opacity=0.85,
                  ~transform=likeYouLayout->Option.mapWithDefault([], layout => [
                    unsafeTransform({"translateZ": "0px"}),
                    skewY(~skewY=skewYValue),
                    translateX(
                      ~translateX=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[layout.y -. windowsDims.height, layout.y +. layout.height],
                          ~outputRange=[50., -50.]->Animated.Interpolation.fromFloatArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.float,
                    ),
                  ]),
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
                }),
              ])}
            />
          </View>
        }
        <Spacer size=XL />
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`Alors si tu as un besoin quelconque (pour toi ou plus largement FKLG et ses amis) et que tu cherches un développeur créatif, à l'écoute et disponible, je serais plus que ravi de pouvoir bosser avec toi ou tes équipes.
Ça peut être pour un site (ton site perso, ta boutique ou un autre projet), une appli, ou même du fictif pour vos productions, car je sais que c’est un besoin récurrent (j'ai inventé ce dernier point pour donner de l'importance à mon propos).

J’aimerais vraiment une réponse de ta part, même si c'est pour me dire que tu n'es pas intéressé. J'en tirerais certainement du positif.
`->React.string}
            </Text>
          </SpacedView>
          <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
            {`🙏`->React.string}
          </Text>
          <Spacer size=L />
        </Container>
        <View style={Style.array([Predefined.styles["flex"], theme.styles["back"]])}>
          <Container style={Predefined.styles["center"]}>
            <SpacedView vertical=L>
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`S'il te plaît, n'hésite surtout pas à passer mon contact autour de toi si tu parles à des gens qui sont des bons gens avec de bons besoins, ça serait fou.
Je vais surement contacter d'autres artistes suite à ce message, mais tu es vraiment la personne qui m'a motivé, j'ai donc naturellement souhaité t'en parler en premier.

Comme à souvent dit Navo, si tu veux être auteur, dit que tu es auteur, personne le dira à ta place.

Je suis développeur créatif pour des gens créatifs comme toi.

Merci en tout cas pour tout ce que tu amènes partout où tu bosses !
`->React.string}
              </Text>
              <Spacer />
              <Text style={array([Font.ios["caption"], theme.styles["text"]])}>
                {`PS: Vanille pécan c'est la vie.`->React.string}
              </Text>
              <Text style={array([Font.ios["caption2"], theme.styles["text"]])}>
                {`PS 2: Une console moins bien que la Game Cube. Je dénonce.`->React.string}
              </Text>
              <Text style={array([Font.ios["caption2"], theme.styles["text"]])}>
                {`PS 3: Tu devrais pouvoir retirer le lien Google+ dans le footer de ton site perso, vu que Google+ n'existe plus :)`->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {`Merci de m'avoir lu.`->React.string}
              </Text>
            </SpacedView>
          </Container>
        </View>
        <Container style={Predefined.styles["center"]} maxWidth={480.->dp}>
          <SpacedView horizontal=L vertical=L>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`Si tu as lu jusque ici, je t'en suis reconnaissant. J'ai codé cette page entièrement avec mes petits doigts. Merci.`->React.string}
            </Text>
            <Spacer />
            <TextLink
              href="https://github.com/MoOx/moox/blob/main/src/pages/_/messages/PageMessageForKyan.res"
              style={array([
                Font.ios["caption"],
                theme.styles["textOnMain"],
                textStyle(~textDecorationLine=#underline, ()),
              ])}>
              {`Même que le code source il accessible en cliquant ici si tu oses.`->React.string}
            </TextLink>
          </SpacedView>
        </Container>
        <Container>
          <SpacedView>
            <Text style={array([Font.iosEm["title1"], theme.styles["textOnMain"]])}>
              {`Bonne tournée!`->React.string}
            </Text>
            <Text style={array([Font.ios["caption"], theme.styles["textOnMain"]])}>
              {`Si elle est pas fini quand tu lis ce message.`->React.string}
            </Text>
          </SpacedView>
        </Container>
        <View onLayout={onPunchsLayout}>
          <Pressable
            onPress={_ => {
              punchsReboundAction()
              push(["trackEvent", "message-pour-kyan", "tap", "punch"])
            }}>
            {_ => <>
              <Spacer size=XL />
              <Animated.View
                style={array([
                  Predefined.styles["rowCenter"],
                  viewStyle(
                    ~transform=[
                      scale(
                        ~scale=punchsReboundStarsAnimatedValue.current->Animated.StyleProp.float,
                      ),
                    ],
                    (),
                  ),
                ])}>
                <Text style={textStyle(~textAlign=#center, ~fontSize=20., ())}>
                  {`🌟`->React.string}
                </Text>
                <Text style={textStyle(~textAlign=#center, ~fontSize=35., ~marginTop=-20.->dp, ())}>
                  {` 🌟 `->React.string}
                </Text>
                <Text style={textStyle(~textAlign=#center, ~fontSize=25., ())}>
                  {`🌟`->React.string}
                </Text>
              </Animated.View>
              <View style={Predefined.styles["rowCenter"]}>
                <Animated.View
                  style={viewStyle(
                    ~transform=[
                      unsafeTransform({"translateZ": "0px"}),
                      translateX(
                        ~translateX=punchsReboundAnimatedValue.current->Animated.StyleProp.float,
                      ),
                    ],
                    (),
                  )}>
                  <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
                    {`🤜`->React.string}
                  </Text>
                </Animated.View>
                <Animated.View
                  style={viewStyle(
                    ~transform=[
                      unsafeTransform({"translateZ": "0px"}),
                      translateX(
                        ~translateX=punchsReboundAnimatedValueReverse->Animated.StyleProp.float,
                      ),
                    ],
                    (),
                  )}>
                  <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
                    {`🤛`->React.string}
                  </Text>
                </Animated.View>
              </View>
              <Spacer size=XL />
            </>}
          </Pressable>
        </View>
        <Container>
          <SpacedView>
            <Text style={array([Font.iosEm["title1"], theme.styles["textOnMain"]])}>
              {`N'hésite pas à me répondre.`->React.string}
            </Text>
            <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
              {`Si tu as la moindre questions, n'hésites surtout pas.`->React.string}
            </Text>
            <Spacer size=L />
            <ViewLink href="https://moox.io" style={Predefined.styles["rowCenter"]}>
              <Avatar size=40. borderWidth=2. borderColor="#000" />
              <Text style={array([Font.ios["title2"], theme.styles["textOnMain"]])}>
                {` `->React.string}
                <Text
                  style={array([
                    Font.weight["800"],
                    textStyle(~textDecorationLine=#underline, ()),
                  ])}>
                  {`@MoOx`->React.string}
                </Text>
                {` le développeur`->React.string}
              </Text>
            </ViewLink>
            <Spacer />
            <ViewLink
              href="https://instagram.com/max__carre" style={Predefined.styles["rowCenter"]}>
              <Avatar
                size=35.
                borderWidth=2.
                borderColor="#000"
                uri="https://d1fdloi71mui9q.cloudfront.net/KtJ2oMEQeiCQsKBACeoj_u2DQHHRkGOmGiXpH"
              />
              <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
                {`  `->React.string}
                <Text
                  style={array([
                    Font.weight["500"],
                    textStyle(~textDecorationLine=#underline, ()),
                  ])}>
                  {`Max Carré`->React.string}
                </Text>
                {` le stand-upper`->React.string}
              </Text>
            </ViewLink>
            <Spacer />
            <ViewLink
              href="https://www.instagram.com/mooxitoh" style={Predefined.styles["rowCenter"]}>
              <Avatar
                size=30.
                borderWidth=2.
                borderColor="#000"
                uri="https://d1fdloi71mui9q.cloudfront.net/Ozz0FABtToK7wu1R74Mi_1N3jc2z6me31Btmf"
              />
              <Text
                style={array([
                  Font.ios["callout"],
                  Font.weight["200"],
                  theme.styles["textOnMain"],
                ])}>
                {`  `->React.string}
                <Text style={array([textStyle(~textDecorationLine=#underline, ())])}>
                  {`@mooxitoh`->React.string}
                </Text>
                {` l'humain créatif`->React.string}
              </Text>
            </ViewLink>
          </SpacedView>
          <Spacer />
          <SpacedView vertical=S>
            <ViewLink
              onPress={_ => push(["trackEvent", "message-pour-kyan", "contact", "sms"])}
              href="sms:+33678135439">
              <ButtonContained color="#1FCE26" style={styles["button"]}>
                <SVGSpeechBubbles
                  width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {`Par SMS`->React.string}
                  <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                    {`\n06 78 13 54 39`->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink
              onPress={_ => push(["trackEvent", "message-pour-kyan", "contact", "mail"])}
              href={"mailto:" ++ (isClient ? "max.email-vip-pour-kyan@moox.fr" : "")}>
              <ButtonContained color=Predefined.Colors.Ios.light.blue style={styles["button"]}>
                <SVGEmail width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {`Par Email`->React.string}
                  <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                    {`\nmax.email-vip-pour-kyan @ moox.fr`->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink
              onPress={_ => push(["trackEvent", "message-pour-kyan", "contact", "tel"])}
              href="tel:+33678135439">
              <ButtonContained color="#1FCE26" style={styles["button"]}>
                <SVGPhone width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {`Par téléphone `->React.string}
                  <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                    {`\n(Je rêve peut-être, mais bon, j'ai jeté mon réveil, alors...)`->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink
              onPress={_ => push(["trackEvent", "message-pour-kyan", "contact", "twitter"])}
              href="https://twitter.com/MoOx">
              <ButtonContained color="rgb(0, 112, 201)" style={styles["button"]}>
                <SVGSocialTwitter
                  width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {`Via un gazouilli`->React.string}
                  <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                    {`\n@MoOx on Twitter`->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink
              onPress={_ => push(["trackEvent", "message-pour-kyan", "contact", "vcard"])}
              href="https://moox.io/MaximeThirouin.vcf">
              <ButtonContained color=Predefined.Colors.Ios.light.pink style={styles["button"]}>
                <SVGContact width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {`Télécharge moi!`->React.string}
                  <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                    {`\nTu peux aussi sauvegarder mon contact, au cas où.`->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <Spacer size=XL />
          <Text style={textStyle(~textAlign=#center, ~fontSize=80., ())}>
            {`😁`->React.string}
          </Text>
          <Spacer size=XXL />
        </Container>
        <WebsiteFooter />
      </div>
    </GradientLinearBackground>
    <WindowSizeFilter.SMax> <TabBar /> </WindowSizeFilter.SMax>
  </ReactNativeSafeAreaContext.SafeAreaProvider>
}

let default = make
