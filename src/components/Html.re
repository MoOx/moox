open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "h1": style([marginTop(Pt(42.)), marginBottom(Pt(24.))]),
      "h1Text": style([fontSize(Float(42.)), fontWeight(`Bold)]),
      "h2": style([marginTop(Pt(34.)), marginBottom(Pt(18.))]),
      "h2Text": style([fontSize(Float(34.)), fontWeight(`Bold)]),
      "h3": style([marginTop(Pt(26.)), marginBottom(Pt(13.))]),
      "h3Text": style([fontSize(Float(26.)), fontWeight(`Bold)]),
      "h4": style([marginTop(Pt(24.)), marginBottom(Pt(12.))]),
      "h4Text": style([fontSize(Float(24.)), fontWeight(`Bold)]),
      "h5": style([marginTop(Pt(22.)), marginBottom(Pt(11.))]),
      "h5Text": style([fontSize(Float(22.)), fontWeight(`Bold)]),
      "h6": style([marginTop(Pt(22.)), marginBottom(Pt(11.))]),
      "h6Text": style([fontSize(Float(22.)), fontWeight(`Bold)]),
      "p": style([marginTop(Pt(29.)), marginBottom(Pt(29.))]),
      "pText":
        style([fontSize(Float(21.)), lineHeight(32.), fontWeight(`_300)]),
      "ul": style([marginBottom(Pt(29.))]),
      "li":
        style([fontSize(Float(21.)), lineHeight(32.), fontWeight(`_300)]),
      "liWrapper": style([flexDirection(Row)]),
      "liBullet":
        style([
          lineHeight(32.),
          paddingHorizontal(Pt(10.)),
          alignSelf(FlexStart),
        ]),
      "blockQuote":
        style([
          paddingTop(Pt(29.)),
          paddingHorizontal(Pt(20.)),
          marginBottom(Pt(29.)),
          borderLeftColor(String("#9ca0a3")),
          borderLeftWidth(3.),
        ]),
      "blockQuoteText":
        style([
          fontSize(Float(24.)),
          lineHeight(32.),
          fontWeight(`_300),
          color(String("#515355")),
        ]),
      "hr":
        style([
          marginBottom(Pt(29.)),
          marginHorizontal(Pt(29.)),
          height(Pt(3.)),
          backgroundColor(String("#ddd")),
        ]),
    })
  );

module H1 = {
  let component = ReasonReact.statelessComponent("Html.H1");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h1
            | Some(style) => Style.concat([styles##h1, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h1Text
              | Some(textStyle) => Style.concat([styles##h1Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module H2 = {
  let component = ReasonReact.statelessComponent("Html.H2");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h2
            | Some(style) => Style.concat([styles##h2, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h2Text
              | Some(textStyle) => Style.concat([styles##h2Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module H3 = {
  let component = ReasonReact.statelessComponent("Html.H3");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h3
            | Some(style) => Style.concat([styles##h3, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h3Text
              | Some(textStyle) => Style.concat([styles##h3Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module H4 = {
  let component = ReasonReact.statelessComponent("Html.H4");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h4
            | Some(style) => Style.concat([styles##h4, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h4Text
              | Some(textStyle) => Style.concat([styles##h4Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module H5 = {
  let component = ReasonReact.statelessComponent("Html.H5");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h5
            | Some(style) => Style.concat([styles##h5, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h5Text
              | Some(textStyle) => Style.concat([styles##h5Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module H6 = {
  let component = ReasonReact.statelessComponent("Html.H6");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##h6
            | Some(style) => Style.concat([styles##h6, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##h6Text
              | Some(textStyle) => Style.concat([styles##h6Text, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module P = {
  let component = ReasonReact.statelessComponent("Html.P");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##p
            | Some(style) => Style.concat([styles##p, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##pText
              | Some(textStyle) => Style.concat([styles##pText, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module Ul = {
  let component = ReasonReact.statelessComponent("Html.Ul");
  [@react.component]
  let make = (~style=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##ul
            | Some(style) => Style.concat([styles##ul, style])
            }
          }>
          children
        </View>,
    });
  };
};

module Li = {
  let component = ReasonReact.statelessComponent("Html.Li");
  [@react.component]
  let make = (~style=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View style=styles##liWrapper>
          <Text style=styles##liBullet> {j|•|j}->ReasonReact.string </Text>
          <Text
            style={
              switch (style) {
              | None => styles##li
              | Some(style) => Style.concat([styles##li, style])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};

module Br = {
  let component = ReasonReact.statelessComponent("Html.Br");
  /* Platform.OS */
  /* let make = _children => {...component, render: _self => <View />}; */
  [@react.component]
  let make = () =>
    ReactCompat.useRecordApi({
      ...component,
      render: _self => <Text> "\n"->ReasonReact.string </Text>,
    });
};

module Hr = {
  let component = ReasonReact.statelessComponent("Html.Hr");
  [@react.component]
  let make = () =>
    ReactCompat.useRecordApi({
      ...component,
      render: _self => <View style=styles##hr />,
    });
};

module BlockQuote = {
  let component = ReasonReact.statelessComponent("Html.BlockQuote");
  [@react.component]
  let make = (~style=?, ~textStyle=?, ~children, ()) => {
    ReactCompat.useRecordApi({
      ...component,
      render: _self =>
        <View
          style={
            switch (style) {
            | None => styles##blockQuote
            | Some(style) => Style.concat([styles##blockQuote, style])
            }
          }>
          <Text
            style={
              switch (textStyle) {
              | None => styles##blockQuoteText
              | Some(textStyle) =>
                Style.concat([styles##blockQuoteText, textStyle])
              }
            }>
            children
          </Text>
        </View>,
    });
  };
};
