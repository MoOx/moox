open ReactNative
open ReactMultiversal
open Webapi.Dom

let scrollYAnimatedValue = Animated.Value.create(0.)
let requested = ref(false)

if Predefined.isClient {
  let tick = _ =>
    scrollYAnimatedValue
    ->Animated.spring(
      Animated.Value.Spring.config(
        ~toValue=window->Window.scrollY->Animated.Value.Spring.fromRawValue,
        ~useNativeDriver=true,
        (),
      ),
    )
    ->Animated.start()
  window |> Window.addEventListener("scroll", _ =>
    if !requested.contents {
      requested := true
      ReactNative.AnimationFrame.request(() => {
        tick()
        requested := false
      })->ignore
    }
  )
}

// required for SSR
// https://github.com/th3rdwave/react-native-safe-area-context#web-ssr
let initialMetrics = {
  open ReactNativeSafeAreaContext
  {
    frame: {
      x: 0.,
      y: 0.,
      width: 0.,
      height: 0.,
    },
    insets: {
      top: 0.,
      left: 0.,
      right: 0.,
      bottom: 0.,
    },
  }
}

@react.component
let make = (~children) =>
  <ReactNativeSafeAreaContext.SafeAreaProvider initialMetrics>
    <AppMeta />
    <WindowSizeFilter.MMin> <HeaderLarge /> </WindowSizeFilter.MMin>
    children
    <WindowSizeFilter.MMin> <Footer /> </WindowSizeFilter.MMin>
    <WindowSizeFilter.SMax>
      <div className="BlurView FixedBottom"> <TabBar /> </div> <TabBarWrapper.Placeholder />
    </WindowSizeFilter.SMax>
  </ReactNativeSafeAreaContext.SafeAreaProvider>
