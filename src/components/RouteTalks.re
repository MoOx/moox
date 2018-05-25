open BsReactNative;

open Helpers;

let styles =
  StyleSheet.create(
    Style.(
      {
        "title":
          style([
            fontSize(Float(36.)),
            fontWeight(`Bold),
            textAlign(Center),
            marginVertical(Pt(20.)),
            color(String("#030303")),
          ]),
        "links":
          style([
            flexDirection(Row),
            justifyContent(Center),
            alignItems(Center),
          ]),
      }
    ),
  );

let component = ReasonReact.statelessComponent("Home");

let make = (~talks) => {
  ...component,
  render: _self =>
    <ScrollView>
      <CommonThings />
      <Head title={j|MoOx Talks, Frontend UI Web & Mobile Developer.|j} />
      <Header />
      <Container>
        <Text style=styles##title> ("Latest Talks" |> text) </Text>
        <Background>
          (
            switch ((talks: T.contentList)) {
            | Inactive
            | Loading => <Text> ("Loading ..." |> text) </Text>
            | Errored => <Text> ("Oops" |> text) </Text>
            | Idle(talks) =>
              <View>
                <TalkList talks=talks##list />
                <View style=styles##links>
                  (
                    switch (talks##previous |> Js.toOption) {
                    | Some(previous) =>
                      <TextLink
                        href=(
                          talks##previousPageIsFirst ?
                            "/talks/" : "/talks/after/" ++ previous ++ "/"
                        )>
                        ("Fresh talks" |> text)
                      </TextLink>
                    | None => nothing
                    }
                  )
                  <Text> (" " |> text) </Text>
                  (
                    switch (talks##next |> Js.toOption) {
                    | Some(next) =>
                      <TextLink href=("/talks/after/" ++ next ++ "/")>
                        ("Older talks" |> text)
                      </TextLink>
                    | None => nothing
                    }
                  )
                </View>
              </View>
            }
          )
        </Background>
      </Container>
      <Footer />
    </ScrollView>,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~talks=PhenomicPresetReactApp.jsEdge(jsProps##talks))
  );

let queries = props => {
  let talks =
    PhenomicPresetReactApp.query(
      PaginatedList({
        path: "content/talks",
        by: Some("default"),
        value: None,
        order: None,
        sort: None,
        limit: Some(10),
        after: Some(props##params##after),
      }),
    );
  {"talks": talks};
};
