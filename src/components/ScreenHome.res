open ReactNative
open ReactMultiversal

@react.component
let make = () => <>
  <ScreenHeader titlePre={"Hi, I am"->Js.String.toUpperCase} title="MoOx">
    <SpacedView
      vertical=XS
      style={
        open Style
        style(~flex=1., ~justifyContent=#flexEnd, ~alignItems=#flexEnd, ())
      }
      pointerEvents=#boxNone>
      <Avatar size=56. />
    </SpacedView>
  </ScreenHeader>
  <SpacedView>
    <ViewLink href="/resume/"> <CardIMakeReactApps /> </ViewLink>
    <Spacer size=L />
    <ViewLink href="/resume/">
      <TitlePre> {"Need help for your app?"->Js.String.toUpperCase->React.string} </TitlePre>
      <Row.SpaceBetween>
        <Title> {"I can help you"->React.string} </Title>
        <View
          style={
            open Style
            style(~transform=[rotate(~rotate=90.->deg)], ())
          }>
          <SVGArrowRoundedWithTailTop
            width={20.->Style.dp} height={20.->Style.dp} fill=Consts.Colors.darkest
          />
        </View>
      </Row.SpaceBetween>
    </ViewLink>
  </SpacedView>
</>
