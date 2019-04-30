open BsReactNative;

let component = ReasonReact.statelessComponent("services");

let styles =
  StyleSheet.create(
    Style.{
      "container": style([alignItems(Center)]),
      "text":
        style([
          backgroundColor(String(Consts.Colors.light)),
          padding(Pt(20.)),
          alignItems(Center),
          width(Pct(100.)),
        ]),
      "textLight":
        style([
          fontSize(Float(28.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
      "textStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "row": style([flexDirection(Row), flexWrap(Wrap)]),
      "cell": style([flex(1.), flexBasis(Pt(240.))]),
      "cellTitle":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_600),
        ]),
      "cellText":
        style([
          fontSize(Float(16.)),
          lineHeight(24.),
          color(String(Consts.Colors.dark)),
        ]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <SpacedView vertical=M style=styles##container>
      <SpacedView horizontal=M>
        <Text style=styles##textLight>
          {j|I make front-ends using React, JavaScript & ReasonML. |j}
          ->ReasonReact.string
        </Text>
      </SpacedView>
      <SpacedView vertical=XL style=styles##row>
        <SpacedView style=styles##cell horizontal=M>
          <Text style=styles##cellTitle>
            {j|Development|j}->ReasonReact.string
          </Text>
          <Spacer />
          <Text style=styles##cellText>
            {j|I am using web technologies since 1995 and made my first mobile app in 2006 and never stopped to learn things since.|j}
            ->ReasonReact.string
          </Text>
        </SpacedView>
        <SpacedView style=styles##cell horizontal=M>
          <Text style=styles##cellTitle>
            {j|Consultancy|j}->ReasonReact.string
          </Text>
          <Spacer />
          <Text style=styles##cellText> {j||j}->ReasonReact.string </Text>
        </SpacedView>
        <SpacedView style=styles##cell horizontal=M>
          <Text style=styles##cellTitle>
            {j|And more...|j}->ReasonReact.string
          </Text>
          <Spacer />
          <Text style=styles##cellText>
            {j|!I am sure my knowledge and experiences might be useful to you in many ways.|j}
            ->ReasonReact.string
          </Text>
        </SpacedView>
      </SpacedView>
    </SpacedView>,
};
