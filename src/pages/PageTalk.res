open Belt
open ReactNative
open ReactMultiversal

module Malformed = {
  type t = {
    id: string,
    message: string,
  }
}
type props = {item: Result.t<TalksFrontend.t, Malformed.t>}
type params = {slug: string}

let styles = {
  open Style
  StyleSheet.create({
    "title": style(~color=Consts.Colors.dark, ()),
    "text": style(~fontSize=21., ~lineHeight=33., ~fontWeight=#_400, ()),
  })
}

@react.component
let make = (~item: Result.t<TalksFrontend.t, Malformed.t>) =>
  switch item {
  | Error({message}) => message->React.string
  | Ok(item) =>
    <AppWrapper>
      <Container>
        <Next.Head> <title> {item.title->React.string} </title> </Next.Head>
        <SpacedView vertical=None>
          <Html.H1 textStyle={styles["title"]}> {item.title->React.string} </Html.H1>
          <Spacer size=L />
          {switch Js.Null.toOption(item.videoEmbed) {
          | None => React.null
          | Some(videoEmbed) =>
            <View>
              <div
                style={ReactDOM.Style.make(
                  ~position="relative",
                  ~overflow="hidden",
                  ~paddingBottom="56.2502460948%",
                  (),
                )}>
                <iframe
                  allowFullScreen=true
                  style={ReactDOM.Style.make(
                    ~position="absolute",
                    ~top="0",
                    ~left="0",
                    ~width="100%",
                    ~height="100%",
                    (),
                  )}
                  src=videoEmbed
                />
              </div>
              <Spacer />
            </View>
          }}
          {switch Js.Null.toOption(item.slidesEmbed) {
          | None => React.null
          | Some(slidesEmbed) =>
            <View>
              <div
                style={ReactDOM.Style.make(
                  ~position="relative",
                  ~overflow="hidden",
                  ~paddingBottom="56.2502460948%",
                  (),
                )}>
                <iframe
                  allowFullScreen=true
                  style={ReactDOM.Style.make(
                    ~position="absolute",
                    ~top="0",
                    ~left="0",
                    ~width="100%",
                    ~height="100%",
                    (),
                  )}
                  src=slidesEmbed
                />
              </div>
              <Spacer />
            </View>
          }}
          {switch Js.Null.toOption(item.slides) {
          | None => React.null
          | Some(slides) => <SpacedView> <a href=slides> {slides->React.string} </a> </SpacedView>
          }}
          {item.body
          ->Js.Null.toOption
          ->Option.map(body => <MyBodyRenderer body />)
          ->Option.getWithDefault(React.null)}
          <Spacer size=L />
        </SpacedView>
      </Container>
    </AppWrapper>
  }

let default = (props: props) => make(makeProps(~item=props.item, ()))

let getStaticProps: Next.GetStaticProps.t<props, params> = ctx => {
  open TalksFrontend
  let {params} = ctx
  let itemData = BackendApi.getOne(params.slug ++ ".json", #talks)
  let props = {
    item: switch itemData {
    | None => Error({Malformed.id: params.slug, message: "Post does not exist"})
    | Some(itemData) =>
      let decoded = itemData.json->decode(itemData.slug, _)
      switch decoded {
      | Error(message) =>
        Error({
          Malformed.id: params.slug,
          message: "Malformed item: " ++ message,
        })
      | Ok(item) => Ok(item)
      }
    },
  }

  Js.Promise.resolve({"props": props})
}

let getStaticPaths: Next.GetStaticPaths.t<params> = () => {
  open Next.GetStaticPaths

  let paths = BackendApi.getAll(#talks)->Array.map(itemData => {
    params: {
      slug: itemData.slug,
    },
  })
  Js.Promise.resolve({paths: paths, fallback: false})
}
