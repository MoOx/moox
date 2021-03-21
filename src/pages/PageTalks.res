open Belt
open ReactNative
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

let styles = {
  open Style
  StyleSheet.create({
    "title": style(
      ~fontSize=36.,
      ~fontWeight=#bold,
      ~textAlign=#center,
      ~marginVertical=20.->dp,
      ~color=Consts.Colors.dark,
      (),
    ),
  })
}
@react.component
let make = (~items: array<TalksFrontend.t>, ~malformed: array<Malformed.t>) => {
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head> <title> {("Talks - " ++ Consts.defaultTitle)->React.string} </title> </Next.Head>
    <HeaderSmall title="Talks" />
    <Container>
      <ScreenHeader titlePre="Latest" title="Talks" />
      <SpacedView> <TalkList talks=items /> <Spacer size=L /> </SpacedView>
    </Container>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~items=props.items, ~malformed=props.malformed, ()))

let getStaticProps: Next.GetStaticProps.t<props, unit> = _ctx => {
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
