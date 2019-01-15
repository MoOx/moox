open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "title":
        style([
          fontSize(Float(36.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "textStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "textLight":
        style([
          fontSize(Float(28.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
      "nanoTitle":
        style([
          fontSize(Float(14.)),
          fontWeight(`_600),
          textAlign(Center),
          color(String("#bbc")),
        ]),
      "iconText":
        style([
          fontSize(Float(10.)),
          lineHeight(14.),
          fontWeight(`_300),
          textAlign(Center),
          color(String("#bbc")),
        ]),
      "activities":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
          alignItems(FlexStart),
        ]),
    },
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

let component = ReasonReact.statelessComponent("RouteResume");

let make = (~items) => {
  ...component,
  render: _self =>
    <AppWrapper>
      <BsReactHelmet>
        <title>
          {("Resume - " ++ Consts.defaultTitle)->ReasonReact.string}
        </title>
      </BsReactHelmet>
      <WindowSizeFilter.SMax> <ResumeJumbotronSmall /> </WindowSizeFilter.SMax>
      <WindowSizeFilter.MMin> <ResumeJumbotronLarge /> </WindowSizeFilter.MMin>
      <Container>
        <SpacedView horizontal=M vertical=L>
          <View style=Style.(style([alignItems(Center)]))>
            <Text style=styles##textStrong>
              {j|Freelance Mobile & Web Developer|j}->R.string
            </Text>
            <Spacer />
            <Text style=styles##textLight>
              {j|I make front-ends using React, JavaScript & ReasonML.|j}
              ->R.string
            </Text>
          </View>
        </SpacedView>
        <View
          style=Style.(
            style([
              flexDirection(Row),
              flexWrap(Wrap),
              justifyContent(Center),
              alignItems(FlexStart),
            ])
          )>
          <SpacedView
            horizontal=S
            vertical=M
            style=Style.(
              style([
                justifyContent(Center),
                alignItems(Center),
                flex(1.),
                minWidth(Pt(240.)),
                maxWidth(Pt(310.)),
              ])
            )>
            <Text style=styles##nanoTitle>
              {"THINGS I WORK WITH" |> R.string}
            </Text>
            <View style=styles##activities>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGJavaScript fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "JavaScript"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGReact fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "React"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGReason fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "ReasonML"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGJest fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Jest"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGTypeScript fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "TypeScript"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGFlow fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Flow"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGGraphql fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Graphql"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGApollo fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Apollo"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGWebpack fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Webpack"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGPhotoshop fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Photoshop"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGSketch fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Sketch"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGCommandLine fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText> "CLI"->ReasonReact.string </Text>
              </SpacedView>
            </View>
          </SpacedView>
          <SpacedView
            horizontal=S
            vertical=M
            style=Style.(
              style([
                justifyContent(FlexStart),
                alignItems(FlexStart),
                flex(1.),
                flexBasis(Pt(240.)),
              ])
            )>
            <Text
              style=Style.(
                style([
                  fontSize(Float(16.)),
                  lineHeight(24.),
                  color(String(Consts.Colors.dark)),
                ])
              )>
              {j|Hi, I am Maxime Thirouin, also known as MoOx. I live near Toulouse, France.

I am a software developer specialized in front-end development of mobile & web applications.
I love to design and develop UIs. I care about UX, responsiveness, performance, maintainability and scalability.

When I am not coding or meditating, I enjoy simple things like gardening, watching a movie or enjoying one of the various activities that life has to offer.|j}
              ->ReasonReact.string
            </Text>
          </SpacedView>
          <SpacedView
            horizontal=S
            vertical=M
            style=Style.(
              style([
                justifyContent(Center),
                alignItems(Center),
                flex(1.),
                minWidth(Pt(240.)),
                maxWidth(Pt(310.)),
              ])
            )>
            <Text style=styles##nanoTitle>
              {"WEEKLY ACTIVITIES" |> R.string}
            </Text>
            <View style=styles##activities>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGActivityCrossfit fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Crossfit"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGActivityBike fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Bike"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGActivityWakeboard fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Wakeboard"->ReasonReact.string
                </Text>
              </SpacedView>
            </View>
            <Text style=styles##nanoTitle>
              {"REGULAR ACTIVITIES" |> R.string}
            </Text>
            <View style=styles##activities>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGActivityDiy fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Bricolage"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGMicrophone fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Podcast"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XS vertical=XS>
                <div style=grayIconDomStyle>
                  <SVGTraining fill="#bbb" width=48. height=48. />
                </div>
                <Text style=styles##iconText>
                  "Teaching"->ReasonReact.string
                </Text>
              </SpacedView>
            </View>
            <Text style=styles##nanoTitle>
              {"CASUAL ACTIVITIES" |> R.string}
            </Text>
            <View style=styles##activities>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivitySkydiving fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Skydiving"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivitySki fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Alpine\nSkiing"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivityMartialArt fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Martial\nArt"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivityTrekking fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Trekking"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivitySkateboard fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Skate"->ReasonReact.string
                </Text>
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
                  "Obstacle\nRace"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivityBeachVolley fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Beach\nVolley"->ReasonReact.string
                </Text>
              </SpacedView>
              <SpacedView horizontal=XXS vertical=XXS>
                <div style=grayIconDomStyle>
                  <SVGActivitySoccer fill="#bbb" width=36. height=36. />
                </div>
                <Text style=styles##iconText>
                  "Soccer"->ReasonReact.string
                </Text>
              </SpacedView>
            </View>
          </SpacedView>
        </View>
        <Spacer size=M />
        <Text style=styles##title> {{j|Timeline|j} |> R.string} </Text>
        {switch ((items: T.resumeList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(items) => <ResumeTimeline items=items##list />
         }}
        <Spacer size=XL />
      </Container>
    </AppWrapper>,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~items=PhenomicPresetReactApp.jsEdge(jsProps##items))
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
