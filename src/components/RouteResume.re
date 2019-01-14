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
      "text":
        style([
          backgroundColor(String(Consts.Colors.light)),
          padding(Pt(20.)),
          alignItems(Center),
          width(Pct(100.)),
        ]),
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "textNode":
        style([
          fontSize(Float(28.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("RouteResume");

let make = (~items) => {
  ...component,
  render: _self =>
    <AppWrapper>
      <WindowSizeFilter.SMax> <ResumeJumbotronSmall /> </WindowSizeFilter.SMax>
      <WindowSizeFilter.MMin> <ResumeJumbotronLarge /> </WindowSizeFilter.MMin>
      <View style=styles##text>
        <Spacer />
        <Text style=styles##textNodeStrong>
          {j|Freelance Mobile & Web Developer|j}->R.string
        </Text>
        <Spacer />
        <Text style=styles##textNode>
          {j|I make front-ends using React, JavaScript & Reason.|j}->R.string
        </Text>
      </View>
      <Container>
        <Spacer size=XL />
        <Text style=styles##title> {{j|Past Experiences|j} |> R.string} </Text>
        {switch ((items: T.resumeList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(items) => <View> <ResumeTimeline items=items##list /> </View>
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
