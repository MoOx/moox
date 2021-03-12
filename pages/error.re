// open ReactNative;
// open ReactMultiversal;
// let styles =
//   Style.(
//     StyleSheet.create({
//       "title":
//         style(
//           ~fontSize=28.,
//           ~fontWeight=`bold,
//           ~textAlign=`center,
//           ~marginVertical=20.->dp,
//           ~color=Consts.Colors.dark,
//           (),
//         ),
//       "links":
//         style(
//           ~flexDirection=`row,
//           ~justifyContent=`center,
//           ~alignItems=`center,
//           (),
//         ),
//     })
//   );
// [@react.component]
// let make = (~posts) => {
//   <AppWrapper>
//     <Next.Head>
//       <title> {("Error 404 - " ++ Consts.defaultTitle)->React.string} </title>
//     </Next.Head>
//     <HeaderSmall title="Ooops!" />
//     <Container>
//       <ErrorView label={j|It seems that this page doesn't exist 😕|j} />
//       <Spacer size=XL />
//       <Text style=styles##title>
//         "Latest Posts on the blog"->React.string
//       </Text>
//       {switch ((posts: T.contentList)) {
//        | Inactive
//        | Loading => <LoadingIndicator />
//        | Errored => <ErrorView />
//        | Idle(posts) =>
//          <View>
//            <PostList posts=posts##list />
//            <View style=styles##links>
//              <TextLink href="/blog/"> "More posts"->React.string </TextLink>
//            </View>
//          </View>
//        }}
//       <Spacer size=XL />
//     </Container>
//   </AppWrapper>;
// };
// [@react.component]
// let jsComponent = (~posts) =>
//   React.createElementVariadic(
//     make,
//     makeProps(~posts=PhenomicPresetReactApp.jsEdge(posts), ()),
//     [|React.null|],
//   );
// let queries = _ => {
//   let posts =
//     PhenomicPresetReactApp.query(
//       PaginatedList({
//         path: "content/blog",
//         by: Some("default"),
//         value: None,
//         order: None,
//         sort: None,
//         limit: Some(5),
//         after: None,
//       }),
//     );
//   {"posts": posts};
// };
