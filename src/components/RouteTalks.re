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
    })
  );

[@react.component]
let make = (~talks) => {
  <AppWrapper>
    <BsReactHelmet>
      <title> {("Talks - " ++ Consts.defaultTitle)->React.string} </title>
    </BsReactHelmet>
    <HeaderSmall title="Talks" />
    <Container>
      <ScreenHeader titlePre="Latest" title="Talks" />
      <SpacedView>
        {switch ((talks: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(talks) =>
           <>
             <TalkList talks=talks##list />
             <Center>
               {switch (talks##previous |> Js.toOption) {
                | Some(previous) =>
                  <TextLink
                    href={
                      talks##previousPageIsFirst
                        ? "/talks/" : "/talks/after/" ++ previous ++ "/"
                    }>
                    "Fresh talks"->React.string
                  </TextLink>
                | None => React.null
                }}
               <Text> " "->React.string </Text>
               {switch (talks##next |> Js.toOption) {
                | Some(next) =>
                  <TextLink href={"/talks/after/" ++ next ++ "/"}>
                    "Older talks"->React.string
                  </TextLink>
                | None => React.null
                }}
             </Center>
           </>
         }}
        <Spacer size=L />
      </SpacedView>
    </Container>
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~talks) =>
  React.createElementVariadic(
    make,
    makeProps(~talks=PhenomicPresetReactApp.jsEdge(talks), ()),
    [|React.null|],
  );

let queries = props => {
  let talks =
    PhenomicPresetReactApp.query(
      PaginatedList({
        path: "content/talks",
        by: Some("default"),
        value: None,
        order: None,
        sort: None,
        limit: Some(10),
        after: Some(props##params##after),
      }),
    );
  {"talks": talks};
};
