open BsReactNative;

let component = ReasonReact.statelessComponent("AppWrapper");

let make = children => {
  ...component,
  render: _ =>
    <>
      <AppMeta />
      <div className="device-small"> <HeaderSmall /> </div>
      <div className="device-large"> <HeaderLargeWithRouter /> </div>
      <View> ...children </View>
      <div className="device-large"> <Footer /> </div>
      <div className="device-small">
        <div style={ReactDOMRe.Style.make(~height="60px", ())} />
      </div>
      <div
        className="device-small menu-backdrop"
        style={ReactDOMRe.Style.make(
          ~position="fixed",
          ~bottom="0",
          ~left="0",
          ~right="0",
          (),
        )}>
        <AppMenuWithRouter />
      </div>
    </>,
};
