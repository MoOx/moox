open ReactNative;

let scrollYAnimatedValue = Animated.Value.create(0.);
let requested = ref(false);
Webapi.Dom.(
  window
  |> Window.addEventListener("scroll", _ =>
       if (! requested^) {
         requested := true;
         ReactNative.AnimationFrame.request(() => {
           scrollYAnimatedValue->Animated.Value.setValue(
             window->Window.scrollY,
           );
           requested := false;
         })
         ->ignore;
       }
     )
);

[@react.component]
let make = (~children) => {
  <>
    <AppMeta />
    <WindowSizeFilter.SMax> <HeaderSmall /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin> <HeaderLargeWithRouter /> </WindowSizeFilter.MMin>
    <View> children </View>
    <WindowSizeFilter.MMin> <Footer /> </WindowSizeFilter.MMin>
    <WindowSizeFilter.SMax>
      <div className="BlurView FixedBottom">
        <TabBarWithRouter links=Consts.menuLinks />
      </div>
      <TabBar.Placeholder />
    </WindowSizeFilter.SMax>
  </>;
};
