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

let component = ReasonReact.statelessComponent("RouteTalks");

[@react.component]
let make = (~talks) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <AppWrapper>
        <BsReactHelmet>
          <title>
            {("Talks - " ++ Consts.defaultTitle)->ReasonReact.string}
          </title>
        </BsReactHelmet>
        <Container>
          <Spacer />
          <Text style=styles##title> "Latest Talks"->ReasonReact.string </Text>
          {switch ((talks: T.contentList)) {
           | Inactive
           | Loading => <LoadingIndicator />
           | Errored => <Error />
           | Idle(talks) =>
             <View>
               <TalkList talks=talks##list />
               <View style=styles##links>
                 {switch (talks##previous |> Js.toOption) {
                  | Some(previous) =>
                    <TextLink
                      href={
                        talks##previousPageIsFirst
                          ? "/talks/" : "/talks/after/" ++ previous ++ "/"
                      }>
                      "Fresh talks"->ReasonReact.string
                    </TextLink>
                  | None => ReasonReact.null
                  }}
                 <Text> " "->ReasonReact.string </Text>
                 {switch (talks##next |> Js.toOption) {
                  | Some(next) =>
                    <TextLink href={"/talks/after/" ++ next ++ "/"}>
                      "Older talks"->ReasonReact.string
                    </TextLink>
                  | None => ReasonReact.null
                  }}
               </View>
             </View>
           }}
          <Spacer size=XL />
        </Container>
      </AppWrapper>,
  });

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
