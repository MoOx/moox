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
  items: array<TalksFrontend.t>,
  malformed: array<Malformed.t>,
}

@react.component
let make = (~items: array<TalksFrontend.t>, ~malformed: array<Malformed.t>) => {
  let theme = T.useTheme()
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head> <title> {("Talks - " ++ Consts.defaultTitle)->React.string} </title> </Next.Head>
    // <HeaderSmall title="Talks" />
    <JumbotronTalks />
    <View style={theme.styles["back"]}>
      <Spacer />
      <Container>
        <Text style={array([Font.ios["subtitle1"], theme.styles["textLight1"]])}>
          {"Latest"->React.string}
        </Text>
        <Text style={array([Font.iosEm["largeTitle"], theme.styles["text"]])}>
          {"Talks"->React.string}
        </Text>
        <SpacedView> <TalkList talks=items /> <Spacer size=L /> </SpacedView>
      </Container>
    </View>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~items=props.items, ~malformed=props.malformed, ()))

let getStaticProps: Next.Page.GetStaticProps.t<props, unit> = _ctx => {
  open TalksFrontend
  let (items, malformed) = BackendApi.getAll(#talks)->Array.reduce(([], []), (acc, itemData) => {
    let (items, malformed) = acc
    let decoded = itemData.json->decode(itemData.slug, _)
    switch decoded {
    | Error(message) => (
        items,
        malformed->Array.concat([{Malformed.id: itemData.slug, message: message}]),
      )
    | Ok(post) =>
      items->Js.Array2.push(post)->ignore
      (items, malformed)
    }
  })

  Js.Promise.resolve({
    "props": {
      items: items->orderByDate,
      malformed: malformed,
    },
  })
}
