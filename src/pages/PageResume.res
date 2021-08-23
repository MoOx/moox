open Belt
open ReactNative
open ReactMultiversal

module Malformed = {
  type t = {
    id: string,
    message: string,
  }
}
type props = {
  items: array<ResumeFrontend.t>,
  malformed: array<Malformed.t>,
}

let styles = {
  open Style
  StyleSheet.create({
    "title": style(
      ~fontSize=36.,
      ~fontWeight=#bold,
      ~textAlign=#center,
      ~marginVertical=20.->dp,
      ~color=Consts.Colors.dark,
      (),
    ),
    "textStrong": style(~fontSize=32., ~color=Consts.Colors.dark, ~fontWeight=#_800, ()),
    "textLight": style(~fontSize=28., ~color=Consts.Colors.dark, ~fontWeight=#_200, ()),
    "nanoTitle": style(~fontSize=14., ~fontWeight=#_600, ~textAlign=#center, ~color="#bbc", ()),
    "iconText": style(
      ~position=#absolute,
      ~top=64.->dp,
      ~left=0.->dp,
      ~right=0.->dp,
      ~textAlign=#center,
      ~fontSize=12.,
      ~lineHeight=14.,
      ~fontWeight=#_300,
      ~color="#bbc",
      (),
    ),
    "activities": style(
      ~flexDirection=#row,
      ~flexWrap=#wrap,
      ~justifyContent=#center,
      ~alignItems=#flexStart,
      (),
    ),
  })
}
let grayIconDomStyle = ReactDOM.Style.make(
  ~display="flex",
  ~flexDirection="column",
  ~flex="1 1 auto",
  ~filter=["grayscale(1)", "brightness(0.9)", "contrast(0.6)", "opacity(0.6)"] |> Js.Array.joinWith(
    " ",
  ),
  (),
)
let rightArrow = (~color=Consts.Colors.light, size) =>
  <View
    style={
      open Style
      style(~transform=[rotate(~rotate=90.->deg)], ())
    }>
    <SVGArrowRoundedWithTailTop width=size height=size fill=color />
  </View>

@react.component
let make = (~items: array<ResumeFrontend.t>, ~malformed: array<Malformed.t>) => {
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head>
      <title> {("Resume" ++ (" - " ++ Consts.defaultTitle))->React.string} </title>
    </Next.Head>
    <HeaderSmall title="Resume" animateBackgroundOpacity=Delayed />
    <JumbotronMoOx />
    <Spacer />
    <Container>
      <View
        style={
          open Style
          style(
            ~flexDirection=#row,
            ~flexWrap=#wrap,
            ~justifyContent=#center,
            ~alignItems=#flexStart,
            (),
          )
        }>
        <SpacedView
          horizontal=S
          style={
            open Style
            style(
              ~justifyContent=#center,
              ~alignItems=#center,
              ~flex=1.,
              ~minWidth=240.->dp,
              ~maxWidth=310.->dp,
              (),
            )
          }>
          <Text style={styles["nanoTitle"]}> {"THINGS I WORK WITH"->React.string} </Text>
          <View style={styles["activities"]}>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGJavaScript fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"JavaScript"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGReact fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"React"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGReason fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"ReScript"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGJest fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Jest"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGTypeScript fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"TypeScript"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGFlow fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Flow"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGGraphql fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Graphql"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGApollo fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Apollo"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGWebpack fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Webpack"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGPhotoshop fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Photoshop"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGSketch fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Sketch"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGCommandLine fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"CLI"->React.string} </Text>
            </SpacedView>
          </View>
        </SpacedView>
        <SpacedView
          horizontal=S
          style={
            open Style
            style(
              ~justifyContent=#flexStart,
              ~alignItems=#flexStart,
              ~flex=1.,
              ~flexBasis=240.->dp,
              (),
            )
          }>
          <Text
            style={
              open Style
              style(~fontSize=16., ~lineHeight=24., ~color=Consts.Colors.dark, ())
            }>
            {j`Hi, I am Maxime Thirouin, also known as MoOx. I live near Toulouse, France.
I am a software developer specialized in front-end development of mobile & web applications.
I love to design and develop UIs. I care about UX, responsiveness, performance, maintainability and scalability.
When I am not coding or meditating, I enjoy simple things like gardening, watching a movie or enjoying one of the various activities that life has to offer.`->React.string}
          </Text>
        </SpacedView>
        <SpacedView
          horizontal=S
          style={
            open Style
            style(
              ~justifyContent=#center,
              ~alignItems=#center,
              ~flex=1.,
              ~minWidth=240.->dp,
              ~maxWidth=310.->dp,
              (),
            )
          }>
          <Text style={styles["nanoTitle"]}> {"WEEKLY ACTIVITIES"->React.string} </Text>
          <View style={styles["activities"]}>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityCrossfit fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Crossfit"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityBike fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Bike"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityRunning fill="#bbb" width={44.->Style.dp} height={44.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Footing"->React.string} </Text>
            </SpacedView>
          </View>
          <Spacer size=XS />
          <Text style={styles["nanoTitle"]}> {"REGULAR ACTIVITIES"->React.string} </Text>
          <View style={styles["activities"]}>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityDiy fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Bricolage"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGMicrophone fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Podcast"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGTraining fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Teaching"->React.string} </Text>
            </SpacedView>
          </View>
          <Spacer size=XS />
          <Text style={styles["nanoTitle"]}> {"CASUAL ACTIVITIES"->React.string} </Text>
          <View style={styles["activities"]}>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityObstacleCourseRace
                  fill="#bbb" width={48.->Style.dp} height={48.->Style.dp}
                />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Obstacle\nRace"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityTrekking fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Trekking"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGActivityWakeboard fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Wakeboard"->React.string} </Text>
            </SpacedView>
          </View>
        </SpacedView>
      </View>
    </Container>
    <Spacer />
    <WindowSizeFilter.SMax> <JumbotronResumeSmall /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin> <JumbotronResumeLarge /> </WindowSizeFilter.MMin>
    <Spacer />
    <Container>
      <Text style={styles["title"]}> {j`Experiences`->React.string} </Text>
      <ResumeTimeline items />
      <Spacer size=XL />
    </Container>
    <FixedBottom>
      <SpacedView>
        <ViewLink href="/contact/">
          <WindowSizeFilter.MMin>
            <ButtonContained
              round=true
              color=Predefined.Colors.Ios.light.blue
              style={
                open Style
                style(~width=275.->dp, ())
              }>
              <ButtonContained.Text textSize=22.>
                {"HIRE ME NOW"->React.string}
                <Text
                  style={
                    open Style
                    style(~fontSize=12., ~lineHeight=12., ~fontWeight=#_400, ())
                  }>
                  {"\nCheck out my availabilities"->React.string}
                </Text>
              </ButtonContained.Text>
              <Spacer />
              {rightArrow(36.->Style.dp)}
            </ButtonContained>
          </WindowSizeFilter.MMin>
          <WindowSizeFilter.SMax>
            <ButtonContained round=true color=Predefined.Colors.Ios.light.blue>
              <ButtonContained.Text> {"HIRE ME NOW"->React.string} </ButtonContained.Text>
              <Spacer size=XS />
              {rightArrow(20.->Style.dp)}
            </ButtonContained>
          </WindowSizeFilter.SMax>
        </ViewLink>
      </SpacedView>
      <WindowSizeFilter.SMax> <TabBarWrapper.Placeholder /> </WindowSizeFilter.SMax>
    </FixedBottom>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~items=props.items, ~malformed=props.malformed, ()))

let getStaticProps: Next.GetStaticProps.t<props, unit> = _ctx => {
  open ResumeFrontend
  let (items, malformed) = BackendApi.getAll(#resume)->Array.reduce(([], []), (acc, itemData) => {
    let (items, malformed) = acc
    let decoded = itemData.json->decode(itemData.slug, _)
    switch decoded {
    | Error(message) => (
        items,
        malformed->Array.concat([{Malformed.id: itemData.slug, message: message}]),
      )
    | Ok(post) =>
      items->Js.Array2.push(post)->ignore
      (items, malformed)
    }
  })

  Js.Promise.resolve({
    "props": {
      items: items->orderByDate,
      malformed: malformed,
    },
  })
}
