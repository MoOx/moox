open Belt;
open ReactNative;
open ReactMultiversal;

module Malformed = {
  type t = {
    id: string,
    message: string,
  };
};
type props = {
  posts: array(BlogFrontend.t),
  malformed: array(Malformed.t),
};

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
let make = (~posts: array(BlogFrontend.t), ~malformed: array(Malformed.t)) => {
  malformed->Array.map(Js.Console.error)->ignore;
  <AppWrapper>
    <Next.Head>
      <title> {("Blog - " ++ Consts.defaultTitle)->React.string} </title>
    </Next.Head>
    <HeaderSmall title="Blog" />
    <Container>
      <ScreenHeader titlePre="Latest" title="Posts" />
      <SpacedView> <PostList posts /> </SpacedView>
      <Spacer size=L />
    </Container>
  </AppWrapper>;
};

let default = (props: props) =>
  make(makeProps(~posts=props.posts, ~malformed=props.malformed, ()));

let getStaticProps: Next.GetStaticProps.t(props, unit) =
  _ctx => {
    let (posts, malformed) =
      BackendApi.getAll(`blog)
      ->Array.reduce(
          ([||], [||]),
          (acc, postData) => {
            let (posts, malformed) = acc;
            let decoded =
              postData.json->BlogFrontend.decode(postData.slug, _);
            switch (decoded) {
            | Error(message) => (
                posts,
                malformed->Array.concat([|
                  {Malformed.id: postData.slug, message},
                |]),
              )
            | Ok(post) =>
              posts->Js.Array2.push(post)->ignore;
              (posts, malformed);
            };
          },
        );

    Js.Promise.resolve({
      "props": {
        posts: posts->BlogFrontend.orderByDate,
        malformed,
      },
    });
  };
