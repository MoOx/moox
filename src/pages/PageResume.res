open Belt
open ReactNative
open ReactNative.Style
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

let currentYear = Js.Date.getFullYear(Js.Date.make())->int_of_float

let styles = {
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
}->StyleSheet.create

let grayIconDomStyle = ReactDOM.Style.make(
  ~display="flex",
  ~flexDirection="column",
  ~flex="1 1 auto",
  ~filter=["grayscale(1)", "brightness(0.9)", "contrast(0.6)", "opacity(0.6)"] |> Js.Array.joinWith(
    " ",
  ),
  (),
)

@react.component
let make = (~items: array<ResumeFrontend.t>, ~malformed: array<Malformed.t>) => {
  let theme = T.useTheme()
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head>
      <title> {("Resume" ++ (" - " ++ Consts.defaultTitle))->React.string} </title>
    </Next.Head>
    <View style={array([viewStyle(~zIndex=1, ())])}> <JumbotronCreativeDeveloper /> </View>
    <Container style={array([theme.styles["back"], viewStyle(~zIndex=0, ())])}>
      <Spacer size=XXL />
      <SpacedView style={Predefined.styles["rowWrapCenter"]}>
        <SpacedView
          horizontal=S
          style={style(
            ~justifyContent=#center,
            ~alignItems=#center,
            ~flex=1.,
            ~minWidth=240.->dp,
            ~maxWidth=310.->dp,
            (),
          )}>
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
                <SVGDevRescript width={48.->Style.dp} height={48.->Style.dp} />
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
                <SVGDevTypescript fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
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
          style={style(
            ~justifyContent=#flexStart,
            ~alignItems=#flexStart,
            ~flex=1.,
            ~flexBasis=240.->dp,
            (),
          )}>
          <Text style={array([Font.ios["body"], theme.styles["text"]])}>
            {j`Hi, I am Maxime Thirouin, also known as MoOx. I live near Toulouse, France.
I am a software developer specialized in front-end development of mobile & web applications.
I love to design and develop UIs. I care about UX, responsiveness, performance, maintainability and scalability.
When I am not coding or meditating, I enjoy simple things like gardening, watching a movie or enjoying one of the various activities that life has to offer.`->React.string}
          </Text>
        </SpacedView>
        <SpacedView
          horizontal=S
          style={style(
            ~justifyContent=#center,
            ~alignItems=#center,
            ~flex=1.,
            ~minWidth=240.->dp,
            ~maxWidth=310.->dp,
            (),
          )}>
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
                <SVGActivityStandup fill="#bbb" width={44.->Style.dp} height={44.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Stand-up"->React.string} </Text>
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
                <SVGActivityRunning fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Running"->React.string} </Text>
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
                <SVGActivityWakeboard fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Wakeboard"->React.string} </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=S>
              <div style=grayIconDomStyle>
                <SVGTraining fill="#bbb" width={48.->Style.dp} height={48.->Style.dp} />
              </div>
              <Spacer size=XXS />
              <Text style={styles["iconText"]}> {"Teaching"->React.string} </Text>
            </SpacedView>
          </View>
        </SpacedView>
      </SpacedView>
      <Spacer size=XXL />
    </Container>
    <View>
      <GradientLinearBackground
        style={array([
          StyleSheet.absoluteFill,
          viewStyle(~transform=[rotate(~rotate=3.->deg), scale(~scale=1.2)], ()),
        ])}
        angle=90.
        stops=[
          {
            offset: 0.->pct,
            stopColor: "#00E2C2",
            stopOpacity: "1",
          },
          {
            offset: 100.->pct,
            stopColor: "#027596",
            stopOpacity: "1",
          },
        ]
      />
      <View
        style={viewStyle(
          ~flexDirection=#row,
          ~flexWrap=#wrap,
          ~justifyContent=#center,
          ~alignItems=#flexStart,
          (),
        )}>
        <SpacedView vertical=S>
          <Text
            style={style(
              ~fontSize=64.,
              ~lineHeight=66.,
              ~fontWeight=#_700,
              ~color=Consts.Colors.light,
              (),
            )}>
            {"MoOx"->React.string}
          </Text>
          <Text
            style={style(
              ~fontSize=26.,
              ~lineHeight=26.,
              ~fontWeight=#_200,
              ~color=Consts.Colors.light,
              (),
            )}>
            {"Maxime Thirouin"->React.string}
          </Text>
        </SpacedView>
        <SpacedView vertical=L>
          <Text
            style={style(
              ~color=Consts.Colors.light,
              ~fontSize=18.,
              ~lineHeight=18.,
              ~fontWeight=#_100,
              (),
            )}>
            {"French"->React.string}
          </Text>
          <Text style={style(~textAlign=#center, ())}>
            <Text
              style={style(
                ~color=Consts.Colors.light,
                ~fontSize=56.,
                ~lineHeight=56.,
                ~fontWeight=#_100,
                (),
              )}>
              {string_of_int(currentYear - 1985)->React.string}
            </Text>
            <Text
              style={style(
                ~color=Consts.Colors.light,
                ~fontSize=18.,
                ~lineHeight=18.,
                ~fontWeight=#_900,
                (),
              )}>
              {" yo "->React.string}
            </Text>
          </Text>
        </SpacedView>
        <SpacedView vertical=L>
          <Text style={style(~color=Consts.Colors.light, ())}>
            {"First website"->React.string}
          </Text>
          <Text
            style={style(
              ~color=Consts.Colors.light,
              ~fontSize=76.,
              ~lineHeight=76.,
              ~fontWeight=#_400,
              (),
            )}>
            {string_of_int(currentYear - 1999)->React.string}
          </Text>
          <Text
            style={style(
              ~color=Consts.Colors.light,
              ~fontSize=18.,
              ~lineHeight=18.,
              ~fontWeight=#_100,
              (),
            )}>
            {"years ago"->React.string}
          </Text>
        </SpacedView>
        <SpacedView vertical=L>
          <SpacedView
            vertical=S style={style(~alignItems=#center, ~backgroundColor=Consts.Colors.light, ())}>
            <Text style={style(~color=Consts.Colors.dark, ())}>
              {"First mobile"->React.string}
            </Text>
            <Text style={style(~color=Consts.Colors.dark, ~fontSize=20., ())}>
              {"web app"->React.string}
            </Text>
            <Text
              style={style(
                ~color=Consts.Colors.dark,
                ~fontSize=76.,
                ~lineHeight=76.,
                ~fontWeight=#_800,
                (),
              )}>
              {string_of_int(currentYear - 2005)->React.string}
            </Text>
            <Text
              style={style(
                ~color=Consts.Colors.dark,
                ~fontSize=18.,
                ~lineHeight=18.,
                ~fontWeight=#_100,
                (),
              )}>
              {" years ago"->React.string}
            </Text>
          </SpacedView>
        </SpacedView>
        <SpacedView style={viewStyle(~alignSelf=#flexEnd, ())}>
          <Text style={style(~color=Consts.Colors.light, ~fontWeight=#_200, ())}>
            {"Professional for"->React.string}
          </Text>
          <Text
            style={style(
              ~color=Consts.Colors.light,
              ~fontSize=116.,
              ~lineHeight=116.,
              ~fontWeight=#_700,
              ~marginTop=dp(-10.),
              (),
            )}>
            {string_of_int(currentYear - 2007)->React.string}
          </Text>
          <Text
            style={style(
              ~color=Consts.Colors.light,
              ~fontSize=64.,
              ~lineHeight=64.,
              ~fontWeight=#_100,
              ~marginTop=dp(-20.),
              (),
            )}>
            {" years"->React.string}
          </Text>
        </SpacedView>
      </View>
    </View>
    <Spacer size=XXL />
    <Container>
      <Center>
        <Text style={array([Font.iosEm["largeTitle"], T.stylesDark["text"]])}>
          {j`Experiences`->React.string}
        </Text>
      </Center>
      <ResumeTimeline items />
      <Spacer size=XL />
    </Container>
    <FixedBottom>
      <SpacedView>
        <ViewLink href="/contact/">
          <GradientLinearBackground
            style={viewStyle(~borderRadius=60., ())}
            angle=180.
            stops=[
              {
                offset: 0.->pct,
                stopColor: "#00E2C2",
                stopOpacity: "1",
              },
              {
                offset: 100.->pct,
                stopColor: "#00d2ff",
                stopOpacity: "1",
              },
            ]>
            <SpacedView horizontal=L style={Predefined.styles["rowCenter"]}>
              <Text style={array([Font.iosEm["headline"], T.stylesDark["text"]])}>
                {"Get in touch"->React.string}
                <Text style={Font.ios["caption"]}> {"\nI am always listening"->React.string} </Text>
              </Text>
              <Spacer size=XS />
              <View style={style(~transform=[rotate(~rotate=90.->deg)], ())}>
                <SVGArrowRoundedWithTailTop
                  width={36.->Style.dp} height={36.->Style.dp} fill={Consts.Colors.light}
                />
              </View>
            </SpacedView>
          </GradientLinearBackground>
        </ViewLink>
      </SpacedView>
      <WindowSizeFilter.SMax> <TabBarWrapper.Placeholder /> </WindowSizeFilter.SMax>
    </FixedBottom>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~items=props.items, ~malformed=props.malformed, ()))

let getStaticProps: Next.Page.GetStaticProps.t<props, unit> = _ctx => {
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
