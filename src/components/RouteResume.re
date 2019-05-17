open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style(
          ~fontSize=36.,
          ~fontWeight=`bold,
          ~textAlign=`center,
          ~marginVertical=20.->pt,
          ~color=Consts.Colors.dark,
          (),
        ),
      "textStrong":
        style(
          ~fontSize=32.,
          ~color=Consts.Colors.dark,
          ~fontWeight=`_800,
          (),
        ),
      "textLight":
        style(
          ~fontSize=28.,
          ~color=Consts.Colors.dark,
          ~fontWeight=`_200,
          (),
        ),
      "nanoTitle":
        style(
          ~fontSize=14.,
          ~fontWeight=`_600,
          ~textAlign=`center,
          ~color="#bbc",
          (),
        ),
      "iconText":
        style(
          ~fontSize=10.,
          ~lineHeight=14.,
          ~fontWeight=`_300,
          ~textAlign=`center,
          ~color="#bbc",
          (),
        ),
      "activities":
        style(
          ~flexDirection=`row,
          ~flexWrap=`wrap,
          ~justifyContent=`center,
          ~alignItems=`flexStart,
          (),
        ),
    })
  );

let grayIconDomStyle =
  ReactDOMRe.Style.make(
    ~display="flex",
    ~flexDirection="column",
    ~flex="1 1 auto",
    ~filter=
      [|"grayscale(1)", "brightness(0.9)", "contrast(0.6)", "opacity(0.6)"|]
      |> Js.Array.joinWith(" "),
    (),
  );

let rightArrow = size => {
  <View
    style=Style.(
      style(~transform=Transform.([|rotate(~rotate=90.->deg)|]), ())
    )>
    <SVGArrowRoundedWithTailTop
      width=size
      height=size
      fill=Consts.Colors.light
    />
  </View>;
};

[@react.component]
let make = (~items) => {
  <AppWrapper>
    <BsReactHelmet>
      <title> {("Resume - " ++ Consts.defaultTitle)->React.string} </title>
    </BsReactHelmet>
    <WindowSizeFilter.SMax> <ResumeJumbotronSmall /> </WindowSizeFilter.SMax>
    <WindowSizeFilter.MMin> <ResumeJumbotronLarge /> </WindowSizeFilter.MMin>
    <Container>
      <SpacedView horizontal=M vertical=L>
        <View
          style=Style.(style(~alignItems=`center, ()))
          accessibilityRole=`header>
          <View accessibilityRole=`header>
            <Text style=styles##textStrong>
              {j|Freelance Mobile & Web Developer|j}->React.string
            </Text>
          </View>
          <Spacer />
          <Text style=styles##textLight>
            {j|I make front-ends using React, JavaScript & ReasonML.|j}
            ->React.string
          </Text>
        </View>
      </SpacedView>
      <View
        style=Style.(
          style(
            ~flexDirection=`row,
            ~flexWrap=`wrap,
            ~justifyContent=`center,
            ~alignItems=`flexStart,
            (),
          )
        )>
        <SpacedView
          horizontal=S
          style=Style.(
            style(
              ~justifyContent=`center,
              ~alignItems=`center,
              ~flex=1.,
              ~minWidth=240.->pt,
              ~maxWidth=310.->pt,
              (),
            )
          )>
          <Text style=styles##nanoTitle>
            "THINGS I WORK WITH"->React.string
          </Text>
          <View style=styles##activities>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGJavaScript fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "JavaScript"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGReact fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "React"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGReason fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "ReasonML"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGJest fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Jest"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGTypeScript fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "TypeScript"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGFlow fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Flow"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGGraphql fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Graphql"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGApollo fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Apollo"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGWebpack fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Webpack"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGPhotoshop fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Photoshop"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGSketch fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Sketch"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGCommandLine fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "CLI"->React.string </Text>
            </SpacedView>
          </View>
        </SpacedView>
        <SpacedView
          horizontal=S
          style=Style.(
            style(
              ~justifyContent=`flexStart,
              ~alignItems=`flexStart,
              ~flex=1.,
              ~flexBasis=240.->pt,
              (),
            )
          )>
          <Text
            style=Style.(
              style(
                ~fontSize=16.,
                ~lineHeight=24.,
                ~color=Consts.Colors.dark,
                (),
              )
            )>
            {j|Hi, I am Maxime Thirouin, also known as MoOx. I live near Toulouse, France.

I am a software developer specialized in front-end development of mobile & web applications.
I love to design and develop UIs. I care about UX, responsiveness, performance, maintainability and scalability.

When I am not coding or meditating, I enjoy simple things like gardening, watching a movie or enjoying one of the various activities that life has to offer.|j}
            ->React.string
          </Text>
        </SpacedView>
        <SpacedView
          horizontal=S
          style=Style.(
            style(
              ~justifyContent=`center,
              ~alignItems=`center,
              ~flex=1.,
              ~minWidth=240.->pt,
              ~maxWidth=310.->pt,
              (),
            )
          )>
          <Text style=styles##nanoTitle>
            "WEEKLY ACTIVITIES"->React.string
          </Text>
          <View style=styles##activities>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGActivityCrossfit fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Crossfit"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGActivityBike fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Bike"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGActivityWakeboard fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Wakeboard"->React.string </Text>
            </SpacedView>
          </View>
          <Text style=styles##nanoTitle>
            "REGULAR ACTIVITIES"->React.string
          </Text>
          <View style=styles##activities>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGActivityDiy fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Bricolage"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGMicrophone fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Podcast"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XS vertical=XS>
              <div style=grayIconDomStyle>
                <SVGTraining fill="#bbb" width=48. height=48. />
              </div>
              <Text style=styles##iconText> "Teaching"->React.string </Text>
            </SpacedView>
          </View>
          <Text style=styles##nanoTitle>
            "CASUAL ACTIVITIES"->React.string
          </Text>
          <View style=styles##activities>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivitySkydiving fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText> "Skydiving"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivitySki fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText>
                "Alpine\nSkiing"->React.string
              </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivityMartialArt fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText>
                "Martial\nArt"->React.string
              </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivityTrekking fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText> "Trekking"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivitySkateboard fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText> "Skate"->React.string </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivityObstacleCourseRace
                  fill="#bbb"
                  width=36.
                  height=36.
                />
              </div>
              <Text style=styles##iconText>
                "Obstacle\nRace"->React.string
              </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivityBeachVolley fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText>
                "Beach\nVolley"->React.string
              </Text>
            </SpacedView>
            <SpacedView horizontal=XXS vertical=XXS>
              <div style=grayIconDomStyle>
                <SVGActivitySoccer fill="#bbb" width=36. height=36. />
              </div>
              <Text style=styles##iconText> "Soccer"->React.string </Text>
            </SpacedView>
          </View>
        </SpacedView>
      </View>
      <Spacer size=M />
      <Text style=styles##title> {j|Timeline|j}->React.string </Text>
      {switch ((items: T.resumeList)) {
       | Inactive
       | Loading => <LoadingIndicator />
       | Errored => <Error />
       | Idle(items) => <ResumeTimeline items=items##list />
       }}
      <Spacer size=XL />
    </Container>
    <FixedBottom>
      <SpacedView>
        <ViewLink href="/contact/">
          <WindowSizeFilter.MMin>
            <ButtonContained
              round=true style=Style.(style(~width=275.->pt, ()))>
              <ButtonContained.Text textSize=22.>
                "HIRE ME NOW"->React.string
                <Text
                  style=Style.(
                    style(
                      ~fontSize=12.,
                      ~lineHeight=12.,
                      ~fontWeight=`_400,
                      (),
                    )
                  )>
                  "\nCheck out my availabilities"->React.string
                </Text>
              </ButtonContained.Text>
              <Spacer />
              {rightArrow(36.)}
            </ButtonContained>
          </WindowSizeFilter.MMin>
          <WindowSizeFilter.SMax>
            <ButtonContained round=true>
              <ButtonContained.Text>
                "HIRE ME NOW"->React.string
              </ButtonContained.Text>
              <Spacer size=XS />
              {rightArrow(20.)}
            </ButtonContained>
          </WindowSizeFilter.SMax>
        </ViewLink>
      </SpacedView>
    </FixedBottom>
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~items) =>
  React.createElementVariadic(
    make,
    makeProps(~items=PhenomicPresetReactApp.jsEdge(items), ()),
    [|React.null|],
  );

let queries = _ => {
  let items =
    PhenomicPresetReactApp.query(
      List({
        path: "content/resume",
        by: Some("default"),
        value: None,
        order: None,
        sort: Some("dateStart"),
        limit: None,
      }),
    );
  {"items": items};
};
