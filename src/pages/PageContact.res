open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  "actions": style(~alignItems=#center, ()),
  "buttonsContainer": style(~maxWidth=300.->dp, ()),
  "button": style(~width=100.->pct, ~alignItems=#flexStart, ()),
}->StyleSheet.create

@react.component
let make = () => {
  let theme = T.useTheme()
  let (isClient, isClient_set) = React.useState(() => false)
  React.useEffect1(() => {
    isClient_set(_ => true)
    None
  }, [isClient_set])

  <AppWrapper>
    <Next.Head> <title> {("Contact - " ++ Consts.defaultTitle)->React.string} </title> </Next.Head>
    // <HeaderSmall title="Contact MoOx" getInTouch=false />
    <WindowSizeFilter.MMin> <Spacer /> </WindowSizeFilter.MMin>
    <Container style={array([theme.styles["back"], viewStyle(~borderRadius=10., ())])}>
      <SpacedView vertical=L>
        <Text style={array([Font.iosEm["subhead"], theme.styles["text"]])}>
          {"Awaiting your message"->React.string}
        </Text>
        <Text style={array([Font.iosEm["largeTitle"], theme.styles["text"]])}>
          {"Contact Maxime"->React.string}
        </Text>
        <Spacer size=L />
        <Text style={array([Font.ios["body"], theme.styles["text"]])}>
          {"Want to get in touch with me?"->React.string}
        </Text>
        <Spacer size=L />
        <View style={styles["actions"]}>
          <Text style={array([Font.ios["body"], theme.styles["text"]])}>
            {"You got lucky.\nI am currently "->React.string}
            <Text style={style(~fontWeight=#bold, ())}>
              {"accepting new projects."->React.string}
            </Text>
          </Text>
          <Spacer size=L />
          <View style={styles["buttonsContainer"]}>
            <SpacedView vertical=S horizontal=None>
              <ViewLink href="https://www.linkedin.com/in/maxthirouin">
                <ButtonContained color="rgb(10, 102, 194)" style={styles["button"]}>
                  <SVGSocialLinkedin
                    width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                  />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Reach Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\n@maxthirouin on LinkedIn"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </ViewLink>
            </SpacedView>
            <SpacedView vertical=S horizontal=None>
              <ViewLink href="sms:+33678135439">
                <ButtonContained color="#1FCE26" style={styles["button"]}>
                  <SVGSpeechBubbles
                    width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                  />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Text Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\n+33 6 78 13 54 39"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </ViewLink>
            </SpacedView>
            <SpacedView vertical=S horizontal=None>
              <ViewLink href={"mailto:" ++ (isClient ? "hello@moox.io" : "")}>
                <ButtonContained color=Predefined.Colors.Ios.light.blue style={styles["button"]}>
                  <SVGEmail width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Email Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\nhello @ moox.io"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </ViewLink>
            </SpacedView>
            <SpacedView vertical=S horizontal=None>
              <ViewLink href="tel:+33678135439">
                <ButtonContained color="#1FCE26" style={styles["button"]}>
                  <SVGPhone width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Call Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\n+33 6 78 13 54 39"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </ViewLink>
            </SpacedView>
            <SpacedView vertical=S horizontal=None>
              <ViewLink href="https://x.com/MoOx">
                <ButtonContained color="rgb(0, 0, 0)" style={styles["button"]}>
                  <SVGSocialX
                    width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                  />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Message Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\n@MoOx on X"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </ViewLink>
            </SpacedView>
            <SpacedView vertical=S horizontal=None>
              <a href="/MaximeThirouin.vcf" style={ReactDOM.Style.make(~textDecoration="none", ())}>
                <ButtonContained color=Predefined.Colors.Ios.light.pink style={styles["button"]}>
                  <SVGContact
                    width={36.->Style.dp} height={36.->Style.dp} fill=Consts.Colors.light
                  />
                  <Spacer />
                  <ButtonContained.Text textSize=24.>
                    {"Save Me"->React.string}
                    <Text style={style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_300, ())}>
                      {"\nGet my contact infos"->React.string}
                    </Text>
                  </ButtonContained.Text>
                </ButtonContained>
              </a>
            </SpacedView>
          </View>
        </View>
      </SpacedView>
      <Spacer size=XL />
    </Container>
    <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
  </AppWrapper>
}

let default = make
