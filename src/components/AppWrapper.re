open BsReactNative;

let component = ReasonReact.statelessComponent("AppWrapper");

let make = children => {
  ...component,
  render: _ =>
    <>
      <AppMeta />
      <WindowSizeFilter.SMax> <HeaderSmall /> </WindowSizeFilter.SMax>
      <WindowSizeFilter.MMin>
        <HeaderLargeWithRouter />
      </WindowSizeFilter.MMin>
      <View> ...children </View>
      <WindowSizeFilter.MMin> <Footer /> </WindowSizeFilter.MMin>
      <WindowSizeFilter.SMax>
        <div style={ReactDOMRe.Style.make(~height="60px", ())} />
        <div
          className="menu-backdrop"
          style={ReactDOMRe.Style.make(
            ~position="fixed",
            ~bottom="0",
            ~left="0",
            ~right="0",
            (),
          )}>
          <TabBarWithRouter />
        </div>
      </WindowSizeFilter.SMax>
    </>,
};
