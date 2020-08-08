open ReactNative;
open ReactMultiversal;

[@react.component]
let make = () => {
  <>
    <ScreenHeader titlePre={"Hi, I am"->Js.String.toUpperCase} title="MoOx">
      <SpacedView
        vertical=XS
        style=Style.(
          style(~flex=1., ~justifyContent=`flexEnd, ~alignItems=`flexEnd, ())
        )
        pointerEvents=`boxNone>
        <Avatar size=56. />
      </SpacedView>
    </ScreenHeader>
    <SpacedView>
      <ViewLink href="/resume/"> <CardIMakeReactApps /> </ViewLink>
      <Spacer size=L />
      <ViewLink href="/resume/">
        <TitlePre>
          {"Need help for your app?"->Js.String.toUpperCase->React.string}
        </TitlePre>
        <Row.SpaceBetween>
          <Title> "I can help you"->React.string </Title>
          {RouteResume.rightArrow(~color=Consts.Colors.darkest, 20.->Style.dp)}
        </Row.SpaceBetween>
      </ViewLink>
    </SpacedView>
  </>;
};
