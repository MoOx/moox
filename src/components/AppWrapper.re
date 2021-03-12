open ReactNative;
open ReactMultiversal;
open Webapi.Dom;

let scrollYAnimatedValue = Animated.Value.create(0.);
let requested = ref(false);

if (Predefined.isClient) {
  let tick = _ => {
    scrollYAnimatedValue
    ->Animated.spring(
        Animated.Value.Spring.config(
          ~toValue=window->Window.scrollY->Animated.Value.Spring.fromRawValue,
          ~useNativeDriver=true,
          (),
        ),
      )
    ->Animated.start();
  };
  window
  |> Window.addEventListener("scroll", _ =>
       if (! requested^) {
         requested := true;
         ReactNative.AnimationFrame.request(() => {
           tick();
           requested := false;
         })
         ->ignore;
       }
     );
};

[@react.component]
let make = (~children) => {
  <ReactNativeSafeAreaContext.SafeAreaProvider>
    <AppMeta />
    <WindowSizeFilter.MMin> <HeaderLarge /> </WindowSizeFilter.MMin>
    children
    <WindowSizeFilter.MMin> <Footer /> </WindowSizeFilter.MMin>
    <WindowSizeFilter.SMax>
      <div className="BlurView FixedBottom"> <TabBar /> </div>
      <TabBarWrapper.Placeholder />
    </WindowSizeFilter.SMax>
  </ReactNativeSafeAreaContext.SafeAreaProvider>;
};
