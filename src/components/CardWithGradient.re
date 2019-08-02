open BsReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "itemWrapper": style([flex(1.), flexBasis(Pt(250.))]),
      "item":
        style([
          padding(Pt(20.)),
          flexBasis(Pt(200.)),
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.2),
          shadowRadius(10.),
        ]),
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.light)),
          fontWeight(`_800),
        ]),
      "textSpace": style([flex(1.)]),
      "textNode":
        style([
          textAlign(Right),
          fontSize(Float(16.)),
          color(String(Consts.Colors.light)),
          fontWeight(`_300),
        ]),
    })
  );

type item = {
  title: string,
  text: string,
  color: string,
  bg: string,
  bg2: string,
  icon: React.element,
};

[@react.component]
let make = (~item, ()) => {
  <SpacedView style=styles##itemWrapper>
    <ViewWithGradient color={item.bg} color2={item.bg2}>
      <View style=styles##item>
        {item.icon}
        <Text
          style=Style.(
            array([|
              styles##textNodeStrong,
              style([color(String(item.color))]),
            |])
          )>
          item.title->React.string
        </Text>
        <Spacer style=styles##textSpace />
        <Text style=styles##textNode> item.text->React.string </Text>
      </View>
    </ViewWithGradient>
  </SpacedView>;
};
