open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  "blahblah": style(~flex=1., ~alignItems=#center, ~flexBasis=240.->dp, ()),
}->StyleSheet.create

@react.component
let make = () => {
  let theme = T.useTheme()
  <Container maxWidth={1200.->Style.dp}>
    <Row.Wrap>
      <SpacedView style={styles["blahblah"]}>
        <SpacedView horizontal=XS>
          <Row.Wrap.Center>
            <SVGDevices fill="#bbb" width={32.->Style.dp} height={32.->Style.dp} />
            <Spacer size=S />
            <Text
              style={array([Font.ios["title1"], Font.weight["ultralight"], theme.styles["text"]])}>
              {j`Software Architect.`->React.string}
            </Text>
          </Row.Wrap.Center>
        </SpacedView>
        <Spacer size=M />
        <Text style={array([Font.ios["body"], theme.styles["text"]])}>
          {j`I made my first website in 1998, & fell in love with web development. Since then, I never stopped to learn things.
Over the years, I refined my way to approach development, which allows me to confidently takes high-level design choices when building web & mobile apps, and selecting tools adapted to the user interface you need.`->React.string}
        </Text>
      </SpacedView>
      <SpacedView style={styles["blahblah"]}>
        <SpacedView horizontal=XS>
          <Row.Wrap.Center>
            <SVGReact fill="#bbb" width={32.->Style.dp} height={32.->Style.dp} />
            <Spacer size=S />
            <Text
              style={array([Font.ios["title1"], Font.weight["ultralight"], theme.styles["text"]])}>
              {j`React Developer.`->React.string}
            </Text>
          </Row.Wrap.Center>
        </SpacedView>
        <Spacer size=M />
        <Text style={array([Font.ios["body"], theme.styles["text"]])}>
          {j`I really believe that React & React Native are currently the best tools available to produce fast & maintainable user-interfaces since the first day I tried it, in 2014.
Their features & ecosystem allow me to be focus on creating beautiful & polished user experiences with scalability and performance in mind.`->React.string}
        </Text>
      </SpacedView>
      <SpacedView style={styles["blahblah"]}>
        <SpacedView horizontal=XS>
          <Row.Wrap.Center>
            <SVGMenuTalk fill="#bbb" width={32.->Style.dp} height={32.->Style.dp} />
            <Spacer size=S />
            <Text
              style={array([Font.ios["title1"], Font.weight["ultralight"], theme.styles["text"]])}>
              {j`Expert, Leader, Trainer.`->React.string}
            </Text>
          </Row.Wrap.Center>
        </SpacedView>
        <Spacer size=M />
        <Text style={array([Font.ios["body"], theme.styles["text"]])}>
          {j`My various experiences made me confident about the technologies & tools I use so I can probably help you & your team, whether you need some advices, training or help to boostrap your project so you can focus on the feature your user needs.`->React.string}
        </Text>
      </SpacedView>
    </Row.Wrap>
    <Spacer size=L />
  </Container>
}
