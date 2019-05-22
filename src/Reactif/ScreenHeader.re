open Belt;
open ReactNative;
open ReactNative.Transform;
external animatedFloat: Animated.value('a) => float = "%identity";

// @todo
let topSpace =
  ReactNative.Dimensions.get(`window)##height > 640 ? 130. : 110.;

type size =
  | Medium
  | Large;

let containerHeight =
  fun
  | Medium => SafeArea.statusBarHeight +. topSpace
  | Large => SafeArea.statusBarHeight +. topSpace +. 35.;

let styles =
  Style.(
    StyleSheet.create({
      "container": style(~zIndex=1, ~justifyContent=`flexEnd, ()),
      "title": style(),
      "children": style(~zIndex=1, ()),
    })
  );

let prerenderedGradient =
  <View style=StyleSheet.absoluteFill>
    <GradientLinear height="100%" width="100%" opacity2="0.5" />
  </View>;

[@react.component]
let make =
    (
      ~title,
      ~stickyTitle=?,
      ~scrollYAnimatedValue=?,
      ~backgroundSource=?,
      ~backgroundFallbackSource=?,
      ~backgroundGradient=false,
      ~backgroundElastic=false,
      ~animateStickyBackgroundOpacity,
      ~color as colour=?,
      ~backgroundColor as bgColor="#000",
      ~left=?,
      ~right=?,
      ~size: size=Medium,
      ~children,
    ) => {
  let deviceWidth = Dimensions.get(`window)##width->float;
  let deviceHeight = Dimensions.get(`window)##height->float;
  let child =
    <View style=Style.(array([|StyleSheet.absoluteFill, styles##children|]))>
      ...children
    </View>;
  let h = containerHeight(size);
  <SpacedView
    vertical=None
    style=Style.(array([|styles##container, style(~height=h->pt, ())|]))>
    {backgroundSource
     ->Option.map(source =>
         <ImageBackgroundWithBlurFallback
           fallbackSource=?backgroundFallbackSource
           source
           width={deviceWidth->Style.pt}
           height={h->Style.pt}
           style=Style.(
             arrayOption([|
               Some(StyleSheet.absoluteFill),
               Some(style(~backgroundColor=bgColor, ())),
               !backgroundElastic
                 ? None
                 : scrollYAnimatedValue->Option.map(scrollYAnimatedValue =>
                     style(
                       ~transform=[|
                         translateY(
                           ~translateY=
                             scrollYAnimatedValue
                             ->Animated.Interpolation.(
                                 interpolate(
                                   config(
                                     ~inputRange=[|-. deviceHeight +. h, 0.|],
                                     ~outputRange=
                                       [|(-. deviceHeight +. h) /. 2., 0.|]
                                       ->fromFloatArray,
                                     ~extrapolateRight=`clamp,
                                     (),
                                   ),
                                 )
                               )
                             ->animatedFloat,
                         ),
                         scale(
                           ~scale=
                             scrollYAnimatedValue
                             ->Animated.Interpolation.(
                                 interpolate(
                                   config(
                                     ~inputRange=[|-. deviceHeight +. h, 0.|],
                                     ~outputRange=
                                       [|deviceHeight /. h, 1.|]
                                       ->fromFloatArray,
                                     ~extrapolateRight=`clamp,
                                     (),
                                   ),
                                 )
                               )
                             ->animatedFloat,
                         ),
                       |],
                       (),
                     )
                   ),
             |])
           )>
           {backgroundGradient ? prerenderedGradient : ReasonReact.null}
           child
         </ImageBackgroundWithBlurFallback>
       )
     ->Option.getWithDefault(child)}
    <StickyHeader
      title={stickyTitle->Option.getWithDefault(title)}
      scrollOffsetY={containerHeight(size)}
      ?scrollYAnimatedValue
      color=?colour
      ?left
      ?right
      animateBackgroundOpacity=animateStickyBackgroundOpacity
    />
    <Text
      style=Style.(
        arrayOption([|
          Some(
            style(
              ~fontSize=
                switch (size) {
                | Medium => 24.
                | Large => 32.
                },
              ~fontWeight=`bold,
              (),
            ),
          ),
          colour->Belt.Option.map(colour => style(~color=colour, ())),
        |])
      )>
      title->ReasonReact.string
    </Text>
    <Spacer />
  </SpacedView>;
};
