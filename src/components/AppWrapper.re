open ReactNative;

let scrollYAnimatedValue = Animated.Value.create(0.);
let requested = ref(false);

if (Consts.isClient) {
  let rec tick = () => {
    Webapi.Dom.(
      scrollYAnimatedValue->Animated.Value.setValue(window->Window.scrollY)
    );
    ReactNative.AnimationFrame.request(tick)->ignore;
  };
  ReactNative.AnimationFrame.request(tick)->ignore;
};

[@react.component]
let make = (~children) => {
  <>
    <AppMeta />
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
