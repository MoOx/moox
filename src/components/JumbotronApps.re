open ReactNative;
open ReactNative.Transform;
external animatedFloat: Animated.value('a) => float = "%identity";
external animatedAngle: Animated.value('a) => angle = "%identity";

let styles = Style.(StyleSheet.create({"center": style()}));

[@react.component]
let make = (~scrollYAnimatedValue) => {
  <View
    style=Style.(style(~backgroundColor=Consts.Colors.white, ~zIndex=1, ()))>
    <WindowSizeFilter.SMax> <Spacer /> <ScreenHome /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin>
      <div
        style={ReactDOMRe.Style.make(
          // ~background="#fff",
          // ~background=
          //   "linear-gradient(to right, #2AF598 0%, #00d2ff 50%, #3a7bd5 100%)",
          // ~background="linear-gradient(to right, #00d2ff, #3a7bd5)",
          // ~background=
          //   "#08AEEA linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
          // ~background=
          //   "radial-gradient( circle farthest-corner at 10% 20%,  rgba(99,55,255,1) 0%, rgba(39,170,255,1) 90% )",
          // ~background=
          //   "radial-gradient( circle farthest-corner at 24.1% 68.8%,  rgba(50,50,50,1) 0%, rgba(0,0,0,1) 99.4% )",
          // ~background="linear-gradient(0deg, #522DB8 0%, #1C7CE0 100%)",
          // ~background="linear-gradient(160deg, #5433ff, #20bdff, #a5fecb)",
          // ~background="linear-gradient(to top, rgb(0, 0, 0), rgb(17, 17, 17))",
          // ~background=
          //   "linear-gradient(132deg, rgb(44, 126, 248), rgb(44, 126, 248), rgb(7, 173, 214))",
          // ~background="linear-gradient(120deg, #08AEEA, #2AF598)",
          ~background="linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
          ~boxShadow="inset 0 0 20px rgba(0,0,0,0.25)",
          ~borderBottom="0.5px solid rgba(255,255,255,0.8)",
          (),
        )}>
        <View
          style=Style.(
            style(
              ~position=`absolute,
              ~top=(-100.)->pt,
              ~right=(-20.)->pt,
              ~transform=[|rotate(~rotate=4.->deg)|],
              (),
            )
          )>
          <SVGLogo
            width=500.
            height=500.
            fill=Consts.Colors.lightest
            style=Style.(style(~opacity=0.05, ()))
          />
        </View>
        <Animated.View
          style=Style.(
            style(
              ~position=`absolute,
              ~left=(-250.)->pt,
              ~bottom=(-250.)->pt,
              ~transform=[|
                rotateZ(
                  ~rotateZ=
                    Animated.Interpolation.(
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[|0., 200.|],
                          ~outputRange=[|"0deg", "5deg"|]->fromStringArray,
                          ~extrapolateLeft=`extend,
                          ~extrapolate=`identity,
                          ~extrapolateRight=`extend,
                          (),
                        ),
                      )
                    )
                    ->animatedAngle,
                ),
              |],
              (),
            )
          )>
          <SVGReact
            width=750.
            height=750.
            fill=Consts.Colors.lightest
            style=Style.(style(~opacity=0.2, ()))
          />
        </Animated.View>
        <Container
          maxWidth=1200.
          style=Style.(
            style(
              ~maxHeight=600.->pt,
              ~justifyContent=`flexStart,
              ~alignItems=`center,
              (),
            )
          )>
          <Spacer size=XL />
          <View style=Style.(style(~flexDirection=`row, ()))>
            <DeviceIPhoneX
              style=Style.(
                style(
                  ~transform=[|
                    perspective(~perspective=1000.),
                    rotateX(~rotateX=20.->deg),
                    rotateY(
                      ~rotateY=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=
                                [|"-10deg", "-14deg"|]->fromStringArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedAngle,
                    ),
                    scale(
                      ~scale=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|0.8, 0.75|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                    translateY(
                      ~translateY=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|40., 100.|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                    translateX(
                      ~translateX=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|0., (-10.)|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                  |],
                  (),
                )
              )>
              <Spacer size=L />
              <ScreenAppInSearch />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              domStyle=ReactDOMRe.Style.(
                make(~transform="translateZ(400px)", ())
              )
              style=Style.(
                style(
                  ~transform=[|
                    perspective(~perspective=1000.),
                    rotateX(
                      ~rotateX=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=
                                [|"15deg", "20deg"|]->fromStringArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedAngle,
                    ),
                    scale(
                      ~scale=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|1.1, 1.15|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                    translateY(
                      ~translateY=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|20., (-20.)|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                  |],
                  (),
                )
              )>
              <SpacedView>
                <SVGIPhoneStatusBar width=340. height={340. /. 328. *. 12.} />
              </SpacedView>
              <ScreenHome />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              style=Style.(
                style(
                  ~transform=[|
                    perspective(~perspective=1000.),
                    rotateX(~rotateX=20.->deg),
                    rotateY(
                      ~rotateY=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=
                                [|"10deg", "12deg"|]->fromStringArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedAngle,
                    ),
                    scale(
                      ~scale=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|0.8, 0.725|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                    translateY(
                      ~translateY=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|150., (-0.)|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                    translateX(
                      ~translateX=
                        Animated.Interpolation.(
                          scrollYAnimatedValue->interpolate(
                            config(
                              ~inputRange=[|0., 200.|],
                              ~outputRange=[|0., 20.|]->fromFloatArray,
                              ~extrapolateLeft=`clamp,
                              ~extrapolate=`identity,
                              ~extrapolateRight=`extend,
                              (),
                            ),
                          )
                        )
                        ->animatedFloat,
                    ),
                  |],
                  (),
                )
              )>
              <Spacer size=L />
              <ScreenAppInStore />
            </DeviceIPhoneX>
          </View>
        </Container>
      </div>
    </WindowSizeFilter.MMin>
  </View>;
};
