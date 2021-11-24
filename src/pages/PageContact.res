open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "subtitle": style(~fontSize=28., ~fontWeight=#_100, ~color=Consts.Colors.dark, ()),
    "title": style(~fontSize=42., ~fontWeight=#bold, ~color=Consts.Colors.dark, ()),
    "actions": style(~alignItems=#center, ()),
    "button": style(~width=250.->dp, ~alignItems=#flexStart, ()),
  })
}

@react.component
let make = () => {
  let (isClient, isClient_set) = React.useState(() => false)
  React.useEffect1(() => {
    isClient_set(_ => true)
    None
  }, [isClient_set])

  <AppWrapper>
    <Next.Head> <title> {("Contact - " ++ Consts.defaultTitle)->React.string} </title> </Next.Head>
    <HeaderSmall title="Contact MoOx" getInTouch=false />
    <Container>
      <WindowSizeFilter.MMin> <Spacer /> </WindowSizeFilter.MMin>
      <SpacedView vertical=L>
        <Text style={styles["subtitle"]}> {"Awaiting your message"->React.string} </Text>
        <Text style={styles["title"]}> {"Contact Maxime"->React.string} </Text>
        <Spacer size=L />
        <Text
          style={
            open Style
            style(~fontSize=16., ())
          }>
          {"Want to get in touch with me?"->React.string}
        </Text>
        <Spacer size=L />
        <View style={styles["actions"]}>
          <Text
            style={
              open Style
              style(~textAlign=#center, ~fontSize=24., ~lineHeight=36., ())
            }>
            {"You got lucky.\nI am currently "->React.string}
            <Text
              style={
                open Style
                style(~fontWeight=#bold, ())
              }>
              {"accepting new projects."->React.string}
            </Text>
          </Text>
          <Spacer size=L />
          <SpacedView vertical=S>
            <ViewLink href="sms:+33678135439">
              <ButtonContained color="#1FCE26" style={styles["button"]}>
                <SVGSpeechBubbles
                  width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {"Text Me"->React.string}
                  <Text
                    style={
                      open Style
                      style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())
                    }>
                    {"\n+33 6 78 13 54 39"->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink href={"mailto:" ++ (isClient ? "hello@moox.io" : "")}>
              <ButtonContained color=Predefined.Colors.Ios.light.blue style={styles["button"]}>
                <SVGEmail width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {"Email Me"->React.string}
                  <Text
                    style={
                      open Style
                      style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())
                    }>
                    {"\nhello @ moox.io"->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink href="tel:+33678135439">
              <ButtonContained color="#1FCE26" style={styles["button"]}>
                <SVGPhone width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {"Call Me"->React.string}
                  <Text
                    style={
                      open Style
                      style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())
                    }>
                    {"\n+33 6 78 13 54 39"->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink href="https://twitter.com/MoOx">
              <ButtonContained color="rgb(0, 112, 201)" style={styles["button"]}>
                <SVGSocialTwitter
                  width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {"Message Me"->React.string}
                  <Text
                    style={
                      open Style
                      style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())
                    }>
                    {"\n@MoOx on Twitter"->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <a href="/MaximeThirouin.vcf" style={ReactDOM.Style.make(~textDecoration="none", ())}>
              <ButtonContained color=Predefined.Colors.Ios.light.pink style={styles["button"]}>
                <SVGContact width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  {"Save Me"->React.string}
                  <Text
                    style={
                      open Style
                      style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())
                    }>
                    {"\nGet my contact infos"->React.string}
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </a>
          </SpacedView>
        </View>
      </SpacedView>
      <Spacer size=XL />
      <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
    </Container>
  </AppWrapper>
}

let default = make
