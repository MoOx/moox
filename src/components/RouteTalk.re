open Helpers;

open BsReactNative;

let component = ReasonReact.statelessComponent("Talk");

let make = (~contentItem) => {
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
        | Idle(contentItem) =>
          <View>
            <Head title=contentItem##title />
            <Html.H1 textStyle=styles##title> (contentItem##title |> text) </Html.H1>
            <Container>
              <Background>
                <View style=(isLarge ? styles##viewLarge : styles##viewSmall)>
                  (
                    switch (Js.Undefined.to_opt(contentItem##videoEmbed)) {
                    | None => nothing
                    | Some(videoEmbed) => 
                      <View>
                        <div style=(ReactDOMRe.Style.make(
                          ~position="relative",
                          ~overflow="hidden",
                          ~paddingBottom="56.2502460948%",
                          ()
                        ))>
                          <iframe
                            allowFullScreen=(Js.true_)
                            style=(ReactDOMRe.Style.make(
                              ~position="absolute",
                              ~top="0",
                              ~left="0",
                              ~width="100%",
                              ~height="100%",
                              ()))
                            src=videoEmbed
                          ></iframe>
                          
                        </div>
                        <Spacer />
                      </View>
                    }
                  )
                  (
                    switch (Js.Undefined.to_opt(contentItem##slidesEmbed)) {
                    | None => nothing
                    | Some(slidesEmbed) => 
                      <View>
                        <div style=(ReactDOMRe.Style.make(
                          ~position="relative",
                          ~overflow="hidden",
                          ~paddingBottom="56.2502460948%",
                          ()
                        ))>
                          <iframe
                            allowFullScreen=(Js.true_)
                            style=(ReactDOMRe.Style.make(
                              ~position="absolute",
                              ~top="0",
                              ~left="0",
                              ~width="100%",
                              ~height="100%",
                              ()))
                            src=slidesEmbed
                          ></iframe>
                        </div>
                        <Spacer />
                      </View>
                    }
                  )
                  (
                    switch (Js.Undefined.to_opt(contentItem##slides)) {
                      | None => nothing
                      | Some(slides) => 
                        <Spacer>
                          <a href=slides>(slides |> text)</a>
                        </Spacer>
                    }
                  )
                  <MyBodyRenderer body=contentItem##body />
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
    make(~contentItem=PhenomicPresetReactApp.jsEdge(jsProps##contentItem))
  );

let queries = props => {
  let contentItem = 
    PhenomicPresetReactApp.query(
      Item({path: "talks", id: props##params##splat})
    );
  {"contentItem": contentItem};
};
