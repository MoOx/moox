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
          color(String("#000F2B")),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("RouteResume");

let make = (~items) => {
  ...component,
  render: _self =>
    <AppWrapper>
      <Container>
        <Spacer />
        <Text style=styles##title> {{j|Résumé|j} |> R.string} </Text>
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
