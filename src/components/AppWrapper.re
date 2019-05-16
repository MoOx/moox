open BsReactNative;

[@react.component]
let make = (~children) => {
  <>
    <AppMeta />
    <WindowSizeFilter.SMax> <HeaderSmall /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin> <HeaderLargeWithRouter /> </WindowSizeFilter.MMin>
    <View> children </View>
    <WindowSizeFilter.MMin> <Footer /> </WindowSizeFilter.MMin>
    <WindowSizeFilter.SMax>
      <div style={ReactDOMRe.Style.make(~height="60px", ())} />
      <div className="menu-backdrop FixedBottom"> <TabBarWithRouter /> </div>
    </WindowSizeFilter.SMax>
  </>;
};
