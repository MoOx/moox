open Belt;
open ReactNative;
open ReactMultiversal;

module Malformed = {
  type t = {
    id: string,
    message: string,
  };
};

type props = {post: Result.t(BlogFrontend.t, Malformed.t)};
type params = {slug: string};

let styles =
  Style.(
    StyleSheet.create({
      "title": style(~color=Consts.Colors.dark, ()),
      "text": style(~fontSize=21., ~lineHeight=33., ~fontWeight=`_400, ()),
    })
  );

[@react.component]
let make = (~post: Result.t(BlogFrontend.t, Malformed.t)) => {
  switch (post) {
  | Error({message}) => message->React.string
  | Ok(post) =>
    let title = post.title->Js.Null.toOption->Option.getWithDefault("");
    <AppWrapper>
      <Container>
        <Next.Head> <title> title->React.string </title> </Next.Head>
        <SpacedView vertical=None>
          <Html.H1 textStyle=styles##title> title->React.string </Html.H1>
          {post.body
           ->Js.Null.toOption
           ->Option.map(body => <MyBodyRenderer body />)
           ->Option.getWithDefault(React.null)}
          <Spacer size=XXL />
          <DisqusComments
            shortname="moox"
            identifier={"http://moox.io/blog/" ++ post.id ++ "/"}
            url={"http://moox.io/blog/" ++ post.id ++ "/"}
          />
          <Spacer size=L />
        </SpacedView>
      </Container>
    </AppWrapper>;
  };
};

let default = (props: props) => make(makeProps(~post=props.post, ()));

let getStaticProps: Next.GetStaticProps.t(props, params) =
  ctx => {
    let {params} = ctx;
    let postData = BackendApi.getOne(params.slug ++ ".json", `blog);
    let props = {
      post:
        switch (postData) {
        | None =>
          Error({Malformed.id: params.slug, message: "Post does not exist"})
        | Some(postData) =>
          let decoded = postData.json->BlogFrontend.decode(postData.slug, _);
          switch (decoded) {
          | Error(message) =>
            Error({
              Malformed.id: params.slug,
              message: "Malformed post: " ++ message,
            })
          | Ok(post) => Ok(post)
          };
        },
    };

    Js.Promise.resolve({"props": props});
  };

let getStaticPaths: Next.GetStaticPaths.t(params) =
  () => {
    open Next.GetStaticPaths;

    let paths =
      BackendApi.getAll(`blog)
      ->Array.map(postData => {
                                params: {
                                  slug: postData.slug,
                                },
                              });
    Js.Promise.resolve({paths, fallback: false});
  };
