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
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h1), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h1Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H2 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h2), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h2Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H3 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h3), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h3Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H4 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h4), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h4Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H5 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h5), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h5Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H6 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h6), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h6Text), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module P = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##p), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##pText), textStyle|]))>
        children
      </Text>
    </View>;
  };
};

module Ul = {
  [@react.component]
  let make = (~style as styl=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##ul), styl|]))>
      children
    </View>;
  };
};

module Li = {
  [@react.component]
  let make = (~style as styl=?, ~children, ()) => {
    <View style=styles##liWrapper>
      <Text style=styles##liBullet> {j|•|j}->React.string </Text>
      <Text style=Style.(arrayOption([|Some(styles##li), styl|]))>
        children
      </Text>
    </View>;
  };
};

module Br = {
  /* Platform.OS */
  /* let make = _children => {...component, render: _self => <View />}; */
  [@react.component]
  let make = () => <Text> "\n"->React.string </Text>;
};

module Hr = {
  [@react.component]
  let make = () => <View style=styles##hr />;
};

module BlockQuote = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##blockQuote), styl|]))>
      <Text
        style=Style.(
          arrayOption([|Some(styles##blockQuoteText), textStyle|])
        )>
        children
      </Text>
    </View>;
  };
};
