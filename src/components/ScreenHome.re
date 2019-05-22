open ReactNative;

[@react.component]
let make = () => {
  <SpacedView>
    <Row.SpaceBetween>
      <View>
        <TitlePre> {"Hi, I am"->String.uppercase->React.string} </TitlePre>
        <Title> "MoOx"->React.string </Title>
      </View>
      <Avatar size=48. />
    </Row.SpaceBetween>
    <Spacer size=L />
    <ViewLink href="/resume/"> <CardIMakeReactApps /> </ViewLink>
    <Spacer size=XL />
    <ViewLink href="/resume/">
      <TitlePre>
        {"Need help for your app?"->String.uppercase->React.string}
      </TitlePre>
      <Row.SpaceBetween>
        <Title> "I can help you"->React.string </Title>
        {RouteResume.rightArrow(~color=Consts.Colors.darkest, 20.)}
      </Row.SpaceBetween>
    </ViewLink>
  </SpacedView>;
};
