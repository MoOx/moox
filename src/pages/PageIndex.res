open Belt
open ReactNative
open ReactMultiversal
open Style

@react.component
let make = () => {
  let theme = T.useTheme(#auto)
  let scrollYAnimatedValue = AppWrapper.scrollYAnimatedValue
  let windowsDims = Dimensions.useWindowDimensions()
  let moonLightSize = min(windowsDims.width /. 2., 300.)

  let (gridLayout, gridLayout_set) = React.useState(() => None)
  let gridLayoutCallback = React.useCallback1((e: Event.layoutEvent) => {
    let layout = e.nativeEvent.layout
    gridLayout_set(_ => Some(layout))
  }, [gridLayout_set])

  let (deviceY, deviceY_set) = React.useState(() => 1.)
  let onDeviceLayout = React.useCallback1((e: Event.layoutEvent) => {
    let y = e.nativeEvent.layout.y
    deviceY_set(_ => y)
  }, [deviceY_set])
  <ReactNativeSafeAreaContext.SafeAreaProvider initialMetrics=AppWrapper.initialMetrics>
    <AppMeta />
    <Next.Head>
      <title> {(Consts.title ++ ", " ++ Consts.defaultTitle)->React.string} </title>
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
        <View onLayout={gridLayoutCallback} style={Predefined.styles["center"]}>
          <Spacer size=M />
          <Spacer size=XL />
          <Animated.View
            style={array([
              StyleSheet.absoluteFill,
              Predefined.styles["center"],
              viewStyle(
                ~transform=gridLayout->Option.mapWithDefault(
                  [
                    unsafeTransform({"translateZ": "-1000px"}),
                    translateY(~translateY=-25.),
                    perspective(~perspective=1000.),
                    rotateY(~rotateY=15.->deg),
                    rotateX(~rotateX=40.->deg),
                  ],
                  layout => [
                    unsafeTransform({"translateZ": "-1000px"}),
                    translateY(~translateY=-25.),
                    perspective(~perspective=1000.),
                    scale(
                      ~scale=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height *. 1.5],
                          ~outputRange=[1., 0.85]->Animated.Interpolation.fromFloatArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.float,
                    ),
                    rotateY(
                      ~rotateY=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height *. 1.5],
                          ~outputRange=["15deg", "-15deg"]->Animated.Interpolation.fromStringArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.angle,
                    ),
                    rotateX(
                      ~rotateX=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height],
                          ~outputRange=["40deg", "50deg"]->Animated.Interpolation.fromStringArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.angle,
                    ),
                  ],
                ),
                (),
              ),
            ])}>
            <ImageFromUri
              uri="/_/8x8grid.png"
              resizeMode=#contain
              style={imageStyle(~width=750.->dp, ~height=750.->dp, ())}
            />
          </Animated.View>
          <View
            style={Style.array([
              Predefined.styles["center"],
              viewStyle(~transform=[unsafeTransform({"translateZ": "0px"})], ()),
            ])}>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~top=-15.->pct,
                ~left=-25.->pct,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 0.2]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., 100.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #fff) " ++
                "drop-shadow(0 0 10px #fff) " ++ "drop-shadow(0 0 5px #fff)",
              })}>
              <SVGOsIos fill="#fff" width={36.->dp} height={36.->dp} />
            </Animated.View>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~top=-25.->dp,
                ~right=0.->dp,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 0.2]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -100.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #13FF00) " ++
                "drop-shadow(0 0 10px #13FF00) " ++ "drop-shadow(0 0 5px #13FF00)",
              })}>
              <SVGOsAndroid fill="#fff" width={32.->dp} height={32.->dp} />
            </Animated.View>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~bottom=-50.->dp,
                ~right=-10.->dp,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -60.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -80.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 2.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #0067FF) " ++
                "drop-shadow(0 0 10px #0067FF) " ++ "drop-shadow(0 0 5px #0067FF)",
              })}>
              <SVGOsWindows fill="#fff" width={24.->dp} height={24.->dp} />
            </Animated.View>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~bottom=25.->dp,
                ~left=-50.->dp,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 1.4]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -100.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #00AAFF) " ++
                "drop-shadow(0 0 10px #00AAFF) " ++ "drop-shadow(0 0 5px #00AAFF)",
              })}>
              <SVGBrowserSafari fill="#fff" width={28.->dp} height={28.->dp} />
            </Animated.View>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~bottom=-85.->dp,
                ~left=50.->dp,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 1.6]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -60.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #FF6F6F) " ++
                "drop-shadow(0 0 10px #FF6F6F) " ++ "drop-shadow(0 0 5px #FF6F6F)",
              })}>
              <SVGBrowserChrome fill="#fff" width={24.->dp} height={24.->dp} />
            </Animated.View>
            <Animated.View
              style={viewStyle(
                ~position=#absolute,
                ~bottom=-150.->dp,
                ~left=200.->dp,
                ~transform=gridLayout->Option.mapWithDefault([], layout => [
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[1., 2.5]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
                        ~extrapolateLeft=#clamp,
                        ~extrapolate=#identity,
                        ~extrapolateRight=#clamp,
                        (),
                      ),
                    )
                    ->Animated.StyleProp.float,
                  ),
                  translateX(
                    ~translateX=scrollYAnimatedValue
                    ->Animated.Interpolation.interpolate(
                      Animated.Interpolation.config(
                        ~inputRange=[0., layout.height *. 1.5],
                        ~outputRange=[0., -50.]->Animated.Interpolation.fromFloatArray,
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
                "filter": "drop-shadow(0 0 20px #3081FF) " ++
                "drop-shadow(0 0 10px #3081FF) " ++ "drop-shadow(0 0 5px #3081FF)",
              })}>
              <SVGBrowserEdge fill="#fff" width={20.->dp} height={20.->dp} />
            </Animated.View>
            <Animated.View
              style={array([
                StyleSheet.absoluteFill,
                viewStyle(
                  ~left=-30.->dp,
                  ~transform=gridLayout->Option.mapWithDefault([], layout => [
                    unsafeTransform({"translateZ": "0px"}),
                    scale(
                      ~scale=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height *. 1.5],
                          ~outputRange=[1., 0.8]->Animated.Interpolation.fromFloatArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.float,
                    ),
                    translateY(
                      ~translateY=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height *. 1.5],
                          ~outputRange=[0., 10.]->Animated.Interpolation.fromFloatArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.float,
                    ),
                    translateX(
                      ~translateX=scrollYAnimatedValue
                      ->Animated.Interpolation.interpolate(
                        Animated.Interpolation.config(
                          ~inputRange=[0., layout.height *. 1.5],
                          ~outputRange=[0., 10.]->Animated.Interpolation.fromFloatArray,
                          ~extrapolateLeft=#clamp,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#clamp,
                          (),
                        ),
                      )
                      ->Animated.StyleProp.float,
                    ),
                    rotateZ(
                      ~rotateZ={
                        open Animated.Interpolation
                        scrollYAnimatedValue->interpolate(
                          config(
                            ~inputRange=[0., layout.height *. 1.5],
                            ~outputRange=["0deg", "5deg"]->fromStringArray,
                            ~extrapolateLeft=#extend,
                            ~extrapolate=#identity,
                            ~extrapolateRight=#extend,
                            (),
                          ),
                        )
                      }->Animated.StyleProp.angle,
                    ),
                  ]),
                  (),
                ),
              ])}>
              <SVGFlashyTriangle1 width={100.->pct} height={100.->pct} />
              <View
                accessible=false
                style={viewStyle(~position=#absolute, ~bottom=0.->dp, ~left=75.->pct, ())}>
                <Text
                  accessible=false
                  style={textStyle(
                    ~position=#absolute,
                    ~bottom=-30.->dp,
                    ~fontFamily="StoneHarbourWash",
                    ~fontSize=150.,
                    ~lineHeight=150.,
                    (),
                  )->unsafeAddStyle({
                    "filter": "drop-shadow(0 2px 4px rgba(122,22,102,0.50))",
                    "WebkitTextStroke": "1px #A56C99",
                    "backgroundClip": "text",
                    "WebkitTextFillColor": "transparent",
                    "backgroundColor": "#F451C8",
                    "backgroundImage": "linear-gradient(90deg, #F451C8 0%, #EACE5E 50%)",
                  })}>
                  {"a"->React.string}
                </Text>
              </View>
            </Animated.View>
            <View style={Predefined.styles["rowCenter"]}>
              <Spacer size=XL />
              <View>
                <Text
                  style={textStyle(
                    ~fontFamily="StoneHarbour",
                    ~fontSize=48.,
                    ~lineHeight=48.,
                    ~color="#fff",
                    (),
                  )}>
                  {"I MakE"->React.string}
                </Text>
                <Spacer size=S />
                <Text
                  style={textStyle(
                    ~fontFamily="Phosphate",
                    ~fontSize=80.,
                    ~lineHeight=80.,
                    ~color="#fff",
                    ~textShadowColor="#1DB6B2",
                    ~textShadowRadius=10.,
                    (),
                  )->unsafeAddStyle({"WebkitTextStroke": "1.5px #3EF8D9"})}>
                  {"APPS"->React.string}
                  <Text style={textStyle(~fontSize=40., ~lineHeight=40., ())}>
                    {"&"->React.string}
                  </Text>
                </Text>
                <Spacer size=XXS />
                <Text
                  style={textStyle(
                    ~fontFamily="Phosphate",
                    ~fontSize=51.,
                    ~lineHeight=51.,
                    ~color="#fff",
                    ~textShadowColor="#1DB6B2",
                    ~textShadowRadius=10.,
                    ~marginTop=-15.->dp,
                    // ~textAlign=#right,
                    (),
                  )->unsafeAddStyle({"WebkitTextStroke": "1px #3EF8D9"})}>
                  {"WEBSITES"->React.string}
                </Text>
                <Spacer size=XL />
              </View>
            </View>
          </View>
          <Spacer size=XL />
          <Spacer size=XL />
        </View>
        <Spacer size=XXL />
        <Spacer size=XL />
        {
          let realWidth = 450.
          let visualWidth = 200.
          let visualHeight = visualWidth *. DeviceIPhoneX.originalRatio
          let deviceInitialScale = visualWidth /. realWidth
          let maxWidthToPlayWith = min(windowsDims.width, 800.) -. visualWidth /. 2.
          let gap = max(0., deviceY -. visualHeight /. 2.)
          <View
            onLayout=onDeviceLayout
            style={array([
              Predefined.styles["center"],
              viewStyle(
                ~zIndex=1,
                ~transform=[unsafeTransform({"translateZ": "1px"})],
                ~width=100.->pct,
                // ~borderWidth=1.,
                // ~borderColor="red",
                (),
              ),
            ])}>
            <Spacer size=XXL />
            <Spacer size=XXL />
            <WindowSizeFilter.SMax> <Spacer size=XXL /> <Spacer size=XXL /> </WindowSizeFilter.SMax>
            <DeviceIPhoneX
              width=realWidth
              style={viewStyle(
                ~position=#absolute,
                ~transform=[
                  perspective(~perspective=1000.),
                  unsafeTransform({"translateZ": "0px"}),
                  scale(
                    ~scale={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., gap, gap +. visualHeight],
                          ~outputRange=[
                            deviceInitialScale,
                            deviceInitialScale *. 1.05,
                            deviceInitialScale *. 0.95,
                          ]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
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
                          ~inputRange=[0., gap, gap +. visualHeight],
                          ~outputRange=[
                            maxWidthToPlayWith,
                            0.,
                            -.maxWidthToPlayWith,
                          ]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.float,
                  ),
                  translateY(
                    ~translateY={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., gap, gap +. visualHeight],
                          ~outputRange=[0., -25., -50.]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.float,
                  ),
                  rotateX(~rotateX=2.->deg),
                  rotateZ(
                    ~rotateZ={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., gap, gap +. visualHeight],
                          ~outputRange=["5deg", "0deg", "-5deg"]->fromStringArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.angle,
                  ),
                ],
                (),
              )}>
              <Spacer size=L /> <ScreenAppInStore />
            </DeviceIPhoneX>
          </View>
        }
        <Spacer size=XXL />
        {
          let skewYValue = -15.->deg
          <View style={viewStyle(~maxWidth=750.->dp, ~width=100.->pct, ~margin=auto, ())}>
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
            <View
              pointerEvents=#none
              style={array([viewStyle(~position=#absolute, ~top=-20.->dp, ~left=-20.->dp, ())])}>
              <ImageFromUri
                uri="/_/purple-splat-1.png"
                style={Style.imageStyle(
                  ~width=(456. /. 2.)->Style.dp,
                  ~height=(508. /. 2.)->Style.dp,
                  (),
                )}
              />
            </View>
            <View
              pointerEvents=#none
              style={array([viewStyle(~position=#absolute, ~bottom=0.->dp, ~right=0.->dp, ())])}>
              <ImageFromUri
                uri="/_/purple-splat-2.png"
                style={Style.imageStyle(
                  ~width=(610. /. 2.)->Style.dp,
                  ~height=(762. /. 2.)->Style.dp,
                  (),
                )}
              />
            </View>
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~top=30.->dp,
                  ~left=40.->pct,
                  ~width=80.->dp,
                  ~height=10.->dp,
                  ~opacity=0.85,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
                }),
              ])}
            />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~top=28.->dp,
                  ~left=45.->pct,
                  ~width=120.->dp,
                  ~height=15.->dp,
                  ~opacity=0.5,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
                }),
              ])}
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
              <Spacer size=L />
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {`Creative Development`->React.string}
              </Text>
              <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`Because I am an artist before being a developer, I will focus on offering the best experience to the user. That's what mather after all.`->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {`Driven by User Experience`->React.string}
              </Text>
              <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {`Focusing on UX doesn't mean that compromises on what is under the hood are made. The right technologies have their responsibilities on the end result and they must not be neglected.`->React.string}
              </Text>
              <Spacer size=L />
            </SpacedView>
            <Spacer />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~bottom=-10.->dp,
                  ~left=-5.->pct,
                  ~width=140.->dp,
                  ~height=20.->dp,
                  ~opacity=0.95,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
                }),
              ])}
            />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~bottom=20.->dp,
                  ~left=10.->pct,
                  ~width=80.->dp,
                  ~height=10.->dp,
                  ~opacity=0.85,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
                }),
              ])}
            />
          </View>
        }
        <Container>
          <Spacer size=XXL />
          <View accessible=false style={viewStyle(~width=100.->pct, ~height=100.->dp, ())}>
            <View style={viewStyle(~position=#absolute, ~bottom=0.->dp, ~right=0.->dp, ())}>
              <Text
                accessible=false
                style={textStyle(
                  ~fontFamily="StoneHarbourWash",
                  ~fontSize=150.,
                  ~lineHeight=150.,
                  ~transform=[rotate(~rotate=25.->deg)],
                  (),
                )->unsafeAddStyle({
                  "filter": "drop-shadow(0 2px 4px rgba(122,22,102,0.50))",
                  "WebkitTextStroke": "1px #A56C99",
                  "backgroundClip": "text",
                  "WebkitTextFillColor": "transparent",
                  "backgroundColor": "#008CDE",
                  "backgroundImage": "linear-gradient(-60deg, #008CDE 0%, #23C3AF 100%)",
                })}>
                {"h"->React.string}
              </Text>
            </View>
            <View style={viewStyle(~position=#absolute, ~bottom=0.->dp, ~right=50.->dp, ())}>
              <SVGFlashyTriangle2 width={150.->dp} height={150.->dp} />
            </View>
          </View>
          <Spacer size=XXL />
        </Container>
        <Container style={Predefined.styles["center"]} maxWidth={600.->dp}>
          <View
            style={viewStyle(
              ~maxWidth=500.->dp,
              ~width=100.->pct,
              ~margin=auto,
              ~marginLeft=0.->dp,
              (),
            )}>
            <Spacer size=L />
            <View
              style={array([
                StyleSheet.absoluteFill,
                viewStyle(
                  ~backgroundColor="#190349",
                  ~transform=[
                    unsafeTransform({"translateZ": "-1000px"}),
                    translateY(~translateY=-25.),
                    perspective(~perspective=1000.),
                    rotateY(~rotateY=10.->deg),
                    rotateX(~rotateX=-10.->deg),
                  ],
                  (),
                )->unsafeAddStyle({
                  "filter": "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))",
                  "backgroundImage": "linear-gradient(0deg, #190349 0%, #49007B 100%)",
                }),
              ])}
            />
            <View
              style={viewStyle(
                ~maxWidth=350.->dp,
                ~margin=auto,
                ~transform=[unsafeTransform({"translateZ": "0px"})],
                (),
              )}>
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
                {"Design"->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
                {`Depending on your need, I will always be sure to offer you what is best to achieve your goal.
Wether you need an original design or something that will blend in the platform you want to support, I will be able to help you. `->React.string}
                {`When it comes to optimise user experience, I try to make websites & apps that don’t reinvente the weel so users can always find their way into your world. `->React.string}
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
                {"b"->React.string}
              </Text>
              <Spacer size=L />
            </View>
          </View>
          <Spacer size=XXL />
          <View
            style={viewStyle(
              ~maxWidth=450.->dp,
              ~width=100.->pct,
              ~margin=auto,
              ~marginRight=0.->dp,
              // ~borderColor="red",
              // ~borderWidth=1.,
              (),
            )}>
            <Spacer size=L />
            <View
              style={array([
                StyleSheet.absoluteFill,
                viewStyle(
                  ~backgroundColor="#792F93",
                  ~transform=[
                    unsafeTransform({"translateZ": "-1000px"}),
                    translateY(~translateY=-60.),
                    perspective(~perspective=750.),
                    rotateX(~rotateX=10.->deg),
                    rotateY(~rotateY=-10.->deg),
                    rotateZ(~rotateZ=5.->deg),
                  ],
                  (),
                )->unsafeAddStyle({
                  "filter": "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))",
                  "backgroundImage": "linear-gradient(0deg, #792F93 0%, #000064 80%)",
                }),
              ])}
            />
            <View
              style={viewStyle(
                ~maxWidth=300.->dp,
                ~margin=auto,
                ~transform=[unsafeTransform({"translateZ": "0px"})],
                (),
              )}>
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
                {"CODE"->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.ios["body"], theme.styles["textOnMain"]])}>
                {`I made my first website when I was a kid. I didn’t stop hacking things since then.
I always try things to discover news stuff and learn everyday.
Now I build websites & apps like a pro. My various experiences help me to make the right choice with technologies each time I have decision to take without doing all the mistakes I did in the past. Because I have done a lot of them (and we all know that learning from our own mistakes is the best way to go).`->React.string}
              </Text>
              <Text
                style={textStyle(
                  ~fontFamily="Phosphate",
                  ~fontSize=150.,
                  ~lineHeight=150.,
                  ~color="#fff",
                  ~textAlign=#right,
                  (),
                )->unsafeAddStyle({
                  "WebkitTextStroke": "1px #3EF8D9",
                  "filter": "drop-shadow(0 0 14px #1DB6B2)",
                })}>
                {"-"->React.string}
              </Text>
              <Spacer size=L />
            </View>
          </View>
          <Spacer size=XXL />
        </Container>
        <Spacer size=XXL />
        {
          let skewYValue = 15.->deg
          <View style={viewStyle(~maxWidth=750.->dp, ~width=100.->pct, ~margin=auto, ())}>
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
            <View
              pointerEvents=#none
              style={array([viewStyle(~position=#absolute, ~top=-20.->dp, ~left=-20.->dp, ())])}>
              <ImageFromUri
                uri="/_/purple-splat-1.png"
                style={Style.imageStyle(
                  ~width=(456. /. 2.)->Style.dp,
                  ~height=(508. /. 2.)->Style.dp,
                  (),
                )}
              />
            </View>
            <View
              pointerEvents=#none
              style={array([viewStyle(~position=#absolute, ~bottom=0.->dp, ~right=0.->dp, ())])}>
              <ImageFromUri
                uri="/_/purple-splat-2.png"
                style={Style.imageStyle(
                  ~width=(610. /. 2.)->Style.dp,
                  ~height=(762. /. 2.)->Style.dp,
                  (),
                )}
              />
            </View>
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~top=30.->dp,
                  ~left=40.->pct,
                  ~width=80.->dp,
                  ~height=10.->dp,
                  ~opacity=0.85,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
                }),
              ])}
            />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~top=28.->dp,
                  ~left=45.->pct,
                  ~width=120.->dp,
                  ~height=15.->dp,
                  ~opacity=0.5,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
                }),
              ])}
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
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {"Mobile, Desktop & Web"->React.string}
              </Text>
              <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {"By choosing the right technology, code can be shared across platforms. This means same code can be used to power an app on mobile devices, laptop and in any web browsers, mobile or desktop."->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {"Cross-platform code"->React.string}
              </Text>
              <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {"I build websites & apps that works on multiple OS & browsers because I care about everyone.
Most of the time I use React Native, the same techology used by tech giants like Facebook, Microsoft, Instagram, Twitter, Tesla & "->React.string}
                <TextLink href="https://reactnative.dev/showcase" style={theme.styles["textMain"]}>
                  {"many more every day"->React.string}
                </TextLink>
                {"."->React.string}
              </Text>
              <Spacer size=L />
              <Text style={array([Font.iosEm["title1"], theme.styles["textMain"]])}>
                {"Fast Websites & Native apps"->React.string}
              </Text>
              <Spacer size=M />
              <Text style={array([Font.ios["body"], theme.styles["text"]])}>
                {"Building cross-platform websites & apps can be risky if not implemented with the right technology.\nReact Native helps to use native apis & components under the hoods to ensure native experiences that can smoothly work on the web."->React.string}
              </Text>
            </SpacedView>
            <Spacer />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~bottom=-10.->dp,
                  ~left=-5.->pct,
                  ~width=140.->dp,
                  ~height=20.->dp,
                  ~opacity=0.95,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #268EC4 0%, #2C1A6E 100%)",
                }),
              ])}
            />
            <View
              style={array([
                viewStyle(
                  ~position=#absolute,
                  ~bottom=20.->dp,
                  ~left=10.->pct,
                  ~width=80.->dp,
                  ~height=10.->dp,
                  ~opacity=0.85,
                  ~transform=[skewY(~skewY=skewYValue), unsafeTransform({"translateZ": "0px"})],
                  (),
                )->unsafeAddStyle({
                  "backgroundImage": "linear-gradient(180deg, #0B5F90 0%, #23C3AF 100%)",
                }),
              ])}
            />
          </View>
        }
        <Spacer size=XXL />
        <Spacer size=XXL />
        <WebsiteFooter />
      </div>
    </GradientLinearBackground>
    <WindowSizeFilter.SMax> <TabBar /> </WindowSizeFilter.SMax>
  </ReactNativeSafeAreaContext.SafeAreaProvider>
}

let default = make
