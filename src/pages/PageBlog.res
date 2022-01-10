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
type props = {
  posts: array<BlogFrontend.t>,
  malformed: array<Malformed.t>,
}

@react.component
let make = (~posts: array<BlogFrontend.t>, ~malformed: array<Malformed.t>) => {
  let theme = T.useTheme()
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head> <title> {("Blog - " ++ Consts.defaultTitle)->React.string} </title> </Next.Head>
    <HeaderSmall title="Blog" />
    <View style={theme.styles["back"]}>
      <Container>
        <Spacer />
        <Text style={array([Font.ios["subtitle1"], theme.styles["textLight1"]])}>
          {"Latest"->React.string}
        </Text>
        <Text style={array([Font.iosEm["largeTitle"], theme.styles["text"]])}>
          {"Posts"->React.string}
        </Text>
        <SpacedView> <PostList posts /> </SpacedView>
        <Spacer size=L />
      </Container>
    </View>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~posts=props.posts, ~malformed=props.malformed, ()))

let getStaticProps: Next.Page.GetStaticProps.t<props, unit> = _ctx => {
  let (posts, malformed) = BackendApi.getAll(#blog)->Array.reduce(([], []), (acc, postData) => {
    let (posts, malformed) = acc
    let decoded = postData.json->BlogFrontend.decode(postData.slug, _)
    switch decoded {
    | Error(message) => (
        posts,
        malformed->Array.concat([{Malformed.id: postData.slug, message: message}]),
      )
    | Ok(post) =>
      posts->Js.Array2.push(post)->ignore
      (posts, malformed)
    }
  })

  Js.Promise.resolve({
    "props": {
      posts: posts->BlogFrontend.orderByDate,
      malformed: malformed,
    },
  })
}
