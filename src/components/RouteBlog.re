open ReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style(
          ~fontSize=36.,
          ~fontWeight=`bold,
          ~textAlign=`center,
          ~marginVertical=20.->dp,
          ~color=Consts.Colors.dark,
          (),
        ),
      "links":
        style(
          ~flexDirection=`row,
          ~justifyContent=`center,
          ~alignItems=`center,
          (),
        ),
    })
  );

[@react.component]
let make = (~posts) => {
  <AppWrapper>
    <BsReactHelmet>
      <title> {("Blog - " ++ Consts.defaultTitle)->React.string} </title>
    </BsReactHelmet>
    <HeaderSmall title="Blog" />
    <Container>
      <ScreenHeader titlePre="Latest" title="Posts" />
      <SpacedView>
        {switch ((posts: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(posts) =>
           <View>
             <PostList posts=posts##list />
             <View style=styles##links>
               {switch (posts##previous |> Js.toOption) {
                | Some(previous) =>
                  <TextLink
                    href={
                      posts##previousPageIsFirst
                        ? "/blog/" : "/blog/after/" ++ previous ++ "/"
                    }>
                    "Fresh posts"->React.string
                  </TextLink>
                | None => React.null
                }}
               <Text> " "->React.string </Text>
               {switch (posts##next |> Js.toOption) {
                | Some(next) =>
                  <TextLink href={"/blog/after/" ++ next ++ "/"}>
                    "Older posts"->React.string
                  </TextLink>
                | None => React.null
                }}
             </View>
           </View>
         }}
        <Spacer size=L />
      </SpacedView>
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
