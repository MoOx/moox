open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

module Malformed = {
  type t = {
    id: string,
    message: string,
  }
}

type props = {post: Result.t<BlogFrontend.t, Malformed.t>}
type params = {slug: string}

@react.component
let make = (~post: Result.t<BlogFrontend.t, Malformed.t>) => {
  let theme = T.useTheme()
  switch post {
  | Error({message}) => message->React.string
  | Ok(post) =>
    let title = post.title->Js.Null.toOption->Option.getWithDefault("")
    <AppWrapper>
      <Next.Head> <title> {title->React.string} </title> </Next.Head>
      <View style={T.stylesLight["back"]}>
        <Container>
          <SpacedView vertical=None>
            <Html.H1 textStyle={array([Font.iosEm["largeTitle"], theme.styles["text"]])}>
              {title->React.string}
            </Html.H1>
            {post.date
            ->Js.Null.toOption
            ->Option.map(date =>
              <Text style={array([Font.ios["subtitle1"], theme.styles["textLight1"]])}>
                {date->Js.String2.slice(~from=0, ~to_=10)->React.string}
              </Text>
            )
            ->Option.getWithDefault(React.null)}
            <Spacer size=M />
            {post.body
            ->Js.Null.toOption
            ->Option.map(body => <MyBodyRenderer body />)
            ->Option.getWithDefault(React.null)}
            <Spacer size=XXL />
            <DisqusComments
              shortname="moox"
              identifier={"http://moox.io/blog/" ++ (post.id ++ "/")}
              url={"http://moox.io/blog/" ++ (post.id ++ "/")}
            />
            <Spacer size=L />
          </SpacedView>
        </Container>
      </View>
    </AppWrapper>
  }
}
let default = (props: props) => make(makeProps(~post=props.post, ()))

let getStaticProps: Next.Page.GetStaticProps.t<props, params> = ctx => {
  let {params} = ctx
  let postData = BackendApi.getOne(params.slug ++ ".json", #blog)
  let props = {
    post: switch postData {
    | None => Error({Malformed.id: params.slug, message: "Post does not exist"})
    | Some(postData) =>
      let decoded = postData.json->BlogFrontend.decode(postData.slug, _)
      switch decoded {
      | Error(message) =>
        Error({
          Malformed.id: params.slug,
          message: "Malformed post: " ++ message,
        })
      | Ok(post) => Ok(post)
      }
    },
  }

  Js.Promise.resolve({"props": props})
}

let getStaticPaths: Next.Page.GetStaticPaths.t<params> = () => {
  open Next.Page.GetStaticPaths

  let paths = BackendApi.getAll(#blog)->Array.map(postData => {
    params: {
      slug: postData.slug,
    },
  })
  Js.Promise.resolve({paths: paths, fallback: false})
}
