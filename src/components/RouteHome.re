open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "title":
        style([
          fontSize(Float(28.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String("#000F2B")),
        ]),
      "links":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("RouteHome");

let make = (~posts) => {
  ...component,
  render: _self =>
    <AppWrapper>
      <Jumbotron />
      <Skills />
      <Container>
        <Spacer size=XL />
        <Text style=styles##title>
          {"Latest Posts on the blog" |> R.string}
        </Text>
        {switch ((posts: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(posts) =>
           <View>
             <PostList posts=posts##list />
             <View style=styles##links>
               <TextLink href="/blog/"> {"More posts" |> R.string} </TextLink>
             </View>
           </View>
         }}
        <Spacer size=XL />
      </Container>
    </AppWrapper>,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~posts=PhenomicPresetReactApp.jsEdge(jsProps##posts))
  );

let queries = _ => {
  let posts =
    PhenomicPresetReactApp.query(
      PaginatedList({
        path: "content/blog",
        by: Some("default"),
        value: None,
        order: None,
        sort: None,
        limit: Some(5),
        after: None,
      }),
    );
  {"posts": posts};
};
