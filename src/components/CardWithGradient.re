open ReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "itemWrapper": style(~flex=1., ~flexBasis=250.->dp, ()),
      "item":
        style(
          ~padding=20.->dp,
          ~flexBasis=200.->dp,
          ~shadowColor="#000",
          ~shadowOffset=offset(~width=0., ~height=5.),
          ~shadowOpacity=0.2,
          ~shadowRadius=10.,
          (),
        ),
      "textNodeStrong":
        style(
          ~fontSize=32.,
          ~color=Consts.Colors.light,
          ~fontWeight=`_800,
          (),
        ),
      "textSpace": style(~flex=1., ()),
      "textNode":
        style(
          ~textAlign=`right,
          ~fontSize=16.,
          ~color=Consts.Colors.light,
          ~fontWeight=`_300,
          (),
        ),
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
            array([|styles##textNodeStrong, style(~color=item.color, ())|])
          )>
          item.title->React.string
        </Text>
        <Spacer style=styles##textSpace />
        <Text style=styles##textNode> item.text->React.string </Text>
      </View>
    </ViewWithGradient>
  </SpacedView>;
};
