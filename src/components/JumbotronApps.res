open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({"center": style()})
}

@react.component
let make = (~scrollYAnimatedValue) =>
  <View
    style={
      open Style
      style(~backgroundColor=Consts.Colors.white, ())
    }>
    <WindowSizeFilter.SMax> <ScreenHome /> </WindowSizeFilter.SMax>
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
          style={
            open Style
            style(
              ~position=#absolute,
              ~top=-100.->dp,
              ~right=-20.->dp,
              ~opacity=0.05,
              ~transform=[rotate(~rotate=4.->deg)],
              (),
            )
          }>
          <SVGLogo width={500.->Style.dp} height={500.->Style.dp} fill=Consts.Colors.lightest />
        </View>
        <Animated.View
          style={
            open Style
            style(
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
            )
          }>
          <SVGReact width={750.->Style.dp} height={750.->Style.dp} fill=Consts.Colors.lightest />
        </Animated.View>
        <Container
          maxWidth={1200.->Style.dp}
          style={
            open Style
            style(~maxHeight=600.->dp, ~justifyContent=#flexStart, ~alignItems=#center, ())
          }>
          <Spacer size=XL />
          <View
            style={
              open Style
              style(~flexDirection=#row, ())
            }>
            <DeviceIPhoneX
              style={
                open Style
                style(
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
                )
              }>
              <Spacer size=L /> <ScreenAppInSearch />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              domStyle={
                open ReactDOMRe.Style
                make(~transform="translateZ(400px)", ())
              }
              style={
                open Style
                style(
                  ~transform=[
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
                )
              }>
              <SpacedView
                style={
                  open Style
                  style(~position=#absolute, ~top=0.->dp, ~left=0.->dp, ~right=0.->dp, ())
                }>
                <SVGIPhoneStatusBar
                  width={340.->Style.dp} height={(340. /. 328. *. 12.)->Style.dp}
                />
              </SpacedView>
              <Spacer size=L />
              <ScreenHome />
            </DeviceIPhoneX>
            <DeviceIPhoneX
              style={
                open Style
                style(
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
                )
              }>
              <Spacer size=L /> <ScreenAppInStore />
            </DeviceIPhoneX>
          </View>
        </Container>
      </div>
    </WindowSizeFilter.MMin>
  </View>
