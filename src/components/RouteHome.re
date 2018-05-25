open BsReactNative;

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

let make = (~posts) => {
  ...component,
  render: _self =>
    <ScrollView>
      <CommonThings />
      <Head title={j|MoOx, Frontend UI Web & Mobile Developer.|j} />
      <Header />
      <Jumbotron />
      <Spacer />
      <Spacer />
      <Spacer />
      <Container>
        <Text style=styles##title> ("Latest Posts" |> R.string) </Text>
        <Background>
          (
            switch ((posts: T.contentList)) {
            | Inactive
            | Loading => <Text> ("Loading ..." |> R.string) </Text>
            | Errored => <Text> ("Oops" |> R.string) </Text>
            | Idle(posts) =>
              <View>
                <PostList posts=posts##list />
                <View style=styles##links>
                  (
                    switch (posts##previous |> Js.toOption) {
                    | Some(previous) =>
                      <TextLink
                        href=(
                          posts##previousPageIsFirst ?
                            "/" : "/after/" ++ previous ++ "/"
                        )>
                        ("Fresh posts" |> R.string)
                      </TextLink>
                    | None => R.null
                    }
                  )
                  <Text> (" " |> R.string) </Text>
                  (
                    switch (posts##next |> Js.toOption) {
                    | Some(next) =>
                      <TextLink href=("/after/" ++ next ++ "/")>
                        ("Older posts" |> R.string)
                      </TextLink>
                    | None => R.null
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
    make(~posts=PhenomicPresetReactApp.jsEdge(jsProps##posts))
  );

let queries = props => {
  let posts =
    PhenomicPresetReactApp.query(
      PaginatedList({
        path: "content/blog",
        by: Some("default"),
        value: None,
        order: None,
        sort: None,
        limit: Some(10),
        after: Some(props##params##after),
      }),
    );
  {"posts": posts};
};
