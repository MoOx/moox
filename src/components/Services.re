open ReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "container": style(~alignItems=`center, ()),
      "text":
        style(
          ~backgroundColor=Consts.Colors.light,
          ~padding=20.->dp,
          ~alignItems=`center,
          ~width=100.->pct,
          (),
        ),
      "textLight":
        style(
          ~fontSize=28.,
          ~color=Consts.Colors.dark,
          ~fontWeight=`_200,
          (),
        ),
      "textStrong":
        style(
          ~fontSize=32.,
          ~color=Consts.Colors.dark,
          ~fontWeight=`_800,
          (),
        ),
      "row": style(~flexDirection=`row, ~flexWrap=`wrap, ()),
      "cell": style(~flex=1., ~flexBasis=240.->dp, ()),
      "cellTitle":
        style(
          ~fontSize=32.,
          ~color=Consts.Colors.dark,
          ~fontWeight=`_600,
          (),
        ),
      "cellText":
        style(~fontSize=16., ~lineHeight=24., ~color=Consts.Colors.dark, ()),
    })
  );

[@react.component]
let make = () => {
  <SpacedView horizontal=None style=styles##container>
    <SpacedView vertical=None>
      <Text style=styles##textLight>
        {j|I make front-ends using React, JavaScript & ReasonML. |j}
        ->React.string
      </Text>
    </SpacedView>
    <SpacedView vertical=XL style=styles##row>
      <SpacedView style=styles##cell vertical=None>
        <Text style=styles##cellTitle> {j|Development|j}->React.string </Text>
        <Spacer />
        <Text style=styles##cellText>
          {j|I am using web technologies since 1995 and made my first mobile app in 2006 and never stopped to learn things since.|j}
          ->React.string
        </Text>
      </SpacedView>
      <SpacedView style=styles##cell vertical=None>
        <Text style=styles##cellTitle> {j|Consultancy|j}->React.string </Text>
        <Spacer />
        <Text style=styles##cellText> {j||j}->React.string </Text>
      </SpacedView>
      <SpacedView style=styles##cell vertical=None>
        <Text style=styles##cellTitle> {j|And more...|j}->React.string </Text>
        <Spacer />
        <Text style=styles##cellText>
          {j|!I am sure my knowledge and experiences might be useful to you in many ways.|j}
          ->React.string
        </Text>
      </SpacedView>
    </SpacedView>
  </SpacedView>;
};
