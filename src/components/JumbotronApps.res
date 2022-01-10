open ReactNative
open ReactNative.Style
open ReactMultiversal

@react.component
let make = (~scrollYAnimatedValue) => {
  let theme = T.useTheme()
  <View style={viewStyle(~overflow=#hidden, ~maxWidth=100.->pct, ())}>
    <WindowSizeFilter.SMax> <Spacer /> <ScreenHome /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin>
      <div
        style={ReactDOM.Style.make(
          ~background="linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
          ~boxShadow="inset 0 0 40px rgba(0,0,0,0.25)",
          // ~borderBottom="0.5px solid rgba(255,255,255,0.1)",
          (),
        )}>
        <View
          style={style(
            ~position=#absolute,
            ~top=-100.->dp,
            ~right=-20.->dp,
            ~opacity=0.05,
            ~transform=[rotate(~rotate=4.->deg)],
            (),
          )}>
          <SVGLogo width={500.->Style.dp} height={500.->Style.dp} fill=Consts.Colors.lightest />
        </View>
        <Animated.View
          style={style(
            ~position=#absolute,
            ~left=-250.->dp,
            ~bottom=-250.->dp,
            ~opacity=0.2,
            ~transform=[
              rotateZ(
                ~rotateZ={
                  open Animated.Interpolation
                  scrollYAnimatedValue->interpolate(
                    config(
                      ~inputRange=[0., 200.],
                      ~outputRange=["0deg", "5deg"]->fromStringArray,
                      ~extrapolateLeft=#extend,
                      ~extrapolate=#identity,
                      ~extrapolateRight=#extend,
                      (),
                    ),
                  )
                }->Animated.StyleProp.angle,
              ),
              // the web is fast... lol
              unsafeTransform({"translateZ": "0"}),
            ],
            (),
          )}>
          <SVGReact width={750.->Style.dp} height={750.->Style.dp} fill=Consts.Colors.lightest />
        </Animated.View>
        <Container
          maxWidth={1200.->Style.dp}
          style={style(~maxHeight=600.->dp, ~justifyContent=#flexStart, ~alignItems=#center, ())}>
          <Spacer size=XL />
          <View
            style={style(~flexDirection=#row, ~justifyContent=#center, ())->unsafeAddStyle({
              "maxWidth": "100vw",
            })}>
            <DeviceIPhoneX
              width=450.
              style={style(
                ~transform=[
                  perspective(~perspective=1000.),
                  rotateX(~rotateX=20.->deg),
                  rotateY(
                    ~rotateY={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=["-10deg", "-14deg"]->fromStringArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.angle,
                  ),
                  scale(
                    ~scale={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=[0.8, 0.75]->fromFloatArray,
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
                          ~inputRange=[0., 200.],
                          ~outputRange=[40., 100.]->fromFloatArray,
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
                          ~inputRange=[0., 200.],
                          ~outputRange=[0., -10.]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.float,
                  ),
                ],
                (),
              )}>
              <Spacer size=L /> <ScreenAppInSearch />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              backgroundColor=theme.colors.back
              width=450.
              style={style(
                ~transform=[
                  unsafeTransform({"translateZ": "400px"}),
                  perspective(~perspective=1000.),
                  rotateX(
                    ~rotateX={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=["15deg", "20deg"]->fromStringArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.angle,
                  ),
                  scale(
                    ~scale={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=[1.1, 1.15]->fromFloatArray,
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
                          ~inputRange=[0., 200.],
                          ~outputRange=[20., -20.]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.float,
                  ),
                ],
                (),
              )}>
              <SpacedView
                horizontal=XS
                vertical=XXS
                style={style(~position=#absolute, ~top=0.->dp, ~left=0.->dp, ~right=0.->dp, ())}>
                <SVGIPhoneStatusBar width={100.->Style.pct} fill=theme.colors.text />
              </SpacedView>
              <Spacer size=L />
              <SpacedView style={Predefined.styles["rowSpaceBetween"]}>
                <View>
                  <Text style={array([Font.ios["subtitle1"], theme.styles["textLight1"]])}>
                    {"HI, I AM"->React.string}
                  </Text>
                  <Text style={array([Font.iosEm["largeTitle"], theme.styles["text"]])}>
                    {"MoOx"->React.string}
                  </Text>
                </View>
                <Avatar size=56. />
              </SpacedView>
              <ScreenHome />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              width=450.
              style={style(
                ~transform=[
                  perspective(~perspective=1000.),
                  rotateX(~rotateX=20.->deg),
                  rotateY(
                    ~rotateY={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=["10deg", "12deg"]->fromStringArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.angle,
                  ),
                  scale(
                    ~scale={
                      open Animated.Interpolation
                      scrollYAnimatedValue->interpolate(
                        config(
                          ~inputRange=[0., 200.],
                          ~outputRange=[0.8, 0.725]->fromFloatArray,
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
                          ~inputRange=[0., 200.],
                          ~outputRange=[150., -0.]->fromFloatArray,
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
                          ~inputRange=[0., 200.],
                          ~outputRange=[0., 20.]->fromFloatArray,
                          ~extrapolateLeft=#extend,
                          ~extrapolate=#identity,
                          ~extrapolateRight=#extend,
                          (),
                        ),
                      )
                    }->Animated.StyleProp.float,
                  ),
                ],
                (),
              )}>
              <Spacer size=L /> <ScreenAppInStore />
            </DeviceIPhoneX>
          </View>
        </Container>
      </div>
    </WindowSizeFilter.MMin>
  </View>
}
