open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Post");

let make = (~contentItem, ~id) => {
  ...component,
  render: _self => {
    let dimensions = Dimensions.get(`window);
    let styles =
      StyleSheet.create(
        Style.(
          {
            "title":
              style([
                padding(Pt(20.)),
                textAlign(Center),
                color("#030303"),
              ]),
            "viewSmall": style([flexGrow(1.), padding(Pt(20.))]),
            "viewLarge": style([flexGrow(1.), padding(Pt(60.))]),
            "text":
              style([fontSize(Float(21.)), lineHeight(33.), fontWeight(`_400)])
          }
        )
      );
    let isLarge = dimensions##width > 500;
    <ScrollView>
      <CommonThings />
      <Header />
      (
        switch (contentItem: Types.contentItemNode) {
        | Inactive
        | Loading =>
          <View>
            <Head title="Loading..." />
            <Html.H1 textStyle=styles##title> ("..." |> text) </Html.H1>
            <Container>
              <Background>
                <View style=(isLarge ? styles##viewLarge : styles##viewSmall)>
                  <ActivityIndicator size=`large />
                </View>
              </Background>
            </Container>
          </View>
        | Errored =>
          <View>
            <Head title="Oupssss" />
            <Html.H1 textStyle=styles##title> ("Oupssss" |> text) </Html.H1>
            <Container>
              <Background>
                <View style=(isLarge ? styles##viewLarge : styles##viewSmall)>
                  <Text> ("Oops" |> text) </Text>
                </View>
              </Background>
            </Container>
          </View>
        | Idle(item) =>
          <View>
            <Head title=item##title />
            <Html.H1 textStyle=styles##title> (item##title |> text) </Html.H1>
            <Container>
              <Background>
                <View style=(isLarge ? styles##viewLarge : styles##viewSmall)>
                  <MyBodyRenderer body=item##body />
                  <DisqusComments
                    shortname="moox"
                    identifier=("http://moox.io/blog/" ++ id ++ "/")
                    url=("http://moox.io/blog/" ++ id ++ "/")
                  />
                </View>
              </Background>
            </Container>
          </View>
        }
      )
      <Footer />
    </ScrollView>;
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~contentItem=PhenomicPresetReactApp.jsEdge(jsProps##contentItem),
      ~id=jsProps##params##splat
    )
  );

let queries = props => {
  let contentItem = 
    PhenomicPresetReactApp.query(
      Item({path: "blog", id: props##params##splat})
    );
  {"contentItem": contentItem};
};
