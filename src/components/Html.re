open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "h1": style(~marginTop=42.->dp, ~marginBottom=24.->dp, ()),
      "h1Text": style(~fontSize=42., ~fontWeight=`bold, ()),
      "h2": style(~marginTop=34.->dp, ~marginBottom=18.->dp, ()),
      "h2Text": style(~fontSize=34., ~fontWeight=`bold, ()),
      "h3": style(~marginTop=26.->dp, ~marginBottom=13.->dp, ()),
      "h3Text": style(~fontSize=26., ~fontWeight=`bold, ()),
      "h4": style(~marginTop=24.->dp, ~marginBottom=12.->dp, ()),
      "h4Text": style(~fontSize=24., ~fontWeight=`bold, ()),
      "h5": style(~marginTop=22.->dp, ~marginBottom=11.->dp, ()),
      "h5Text": style(~fontSize=22., ~fontWeight=`bold, ()),
      "h6": style(~marginTop=22.->dp, ~marginBottom=11.->dp, ()),
      "h6Text": style(~fontSize=22., ~fontWeight=`bold, ()),
      "p": style(~marginTop=29.->dp, ~marginBottom=29.->dp, ()),
      "pText": style(~fontSize=21., ~lineHeight=32., ~fontWeight=`_300, ()),
      "ul": style(~marginBottom=29.->dp, ()),
      "li": style(~fontSize=21., ~lineHeight=32., ~fontWeight=`_300, ()),
      "liWrapper": style(~flexDirection=`row, ()),
      "liBullet":
        style(
          ~lineHeight=32.,
          ~paddingHorizontal=10.->dp,
          ~alignSelf=`flexStart,
          (),
        ),
      "blockQuote":
        style(
          ~paddingTop=29.->dp,
          ~paddingHorizontal=20.->dp,
          ~marginBottom=29.->dp,
          ~borderLeftColor="#9ca0a3",
          ~borderLeftWidth=3.,
          (),
        ),
      "blockQuoteText":
        style(
          ~fontSize=24.,
          ~lineHeight=32.,
          ~fontWeight=`_300,
          ~color="#515355",
          (),
        ),
      "hr":
        style(
          ~marginBottom=29.->dp,
          ~marginHorizontal=29.->dp,
          ~height=3.->dp,
          ~backgroundColor="#ddd",
          (),
        ),
    })
  );

module H1 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyl=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h1), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h1Text), tStyl|]))>
        children
      </Text>
    </View>;
  };
};

module H2 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h2), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h2Text), tStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H3 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h3), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h3Text), tStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H4 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h4), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h4Text), tStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H5 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h5), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h5Text), tStyle|]))>
        children
      </Text>
    </View>;
  };
};

module H6 = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##h6), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##h6Text), tStyle|]))>
        children
      </Text>
    </View>;
  };
};

module P = {
  [@react.component]
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##p), styl|]))>
      <Text style=Style.(arrayOption([|Some(styles##pText), tStyle|]))>
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
  let make = (~style as styl=?, ~textStyle as tStyle=?, ~children, ()) => {
    <View style=Style.(arrayOption([|Some(styles##blockQuote), styl|]))>
      <Text
        style=Style.(arrayOption([|Some(styles##blockQuoteText), tStyle|]))>
        children
      </Text>
    </View>;
  };
};
