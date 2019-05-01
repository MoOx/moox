open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "title":
        style([
          fontSize(Float(36.)),
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

let component = ReasonReact.statelessComponent("RouteBlog");

[@react.component]
let make = (~posts) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <AppWrapper>
        <BsReactHelmet>
          <title> {("Blog - " ++ Consts.defaultTitle)->React.string} </title>
        </BsReactHelmet>
        <Container>
          <Spacer />
          <Text style=styles##title> "Latest Posts"->React.string </Text>
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
                          ? "/" : "/after/" ++ previous ++ "/"
                      }>
                      "Fresh posts"->React.string
                    </TextLink>
                  | None => React.null
                  }}
                 <Text> " "->React.string </Text>
                 {switch (posts##next |> Js.toOption) {
                  | Some(next) =>
                    <TextLink href={"/after/" ++ next ++ "/"}>
                      "Older posts"->React.string
                    </TextLink>
                  | None => React.null
                  }}
               </View>
             </View>
           }}
          <Spacer size=XL />
        </Container>
      </AppWrapper>,
  });

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
