open BsReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style([
          fontSize(Float(28.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "links":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
        ]),
    })
  );

[@react.component]
let make = (~posts) => {
  <AppWrapper>
    <BsReactHelmet>
      <title> {("Error 404 - " ++ Consts.defaultTitle)->React.string} </title>
    </BsReactHelmet>
    <HeaderSmall title="Ooops!" />
    <Container>
      <Error label={j|It seems that this page doesn't exist 😕|j} />
      <Spacer size=XL />
      <Text style=styles##title>
        "Latest Posts on the blog"->React.string
      </Text>
      {switch ((posts: T.contentList)) {
       | Inactive
       | Loading => <LoadingIndicator />
       | Errored => <Error />
       | Idle(posts) =>
         <View>
           <PostList posts=posts##list />
           <View style=styles##links>
             <TextLink href="/blog/"> "More posts"->React.string </TextLink>
           </View>
         </View>
       }}
      <Spacer size=XL />
    </Container>
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~posts) =>
  React.createElementVariadic(
    make,
    makeProps(~posts=PhenomicPresetReactApp.jsEdge(posts), ()),
    [|React.null|],
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
