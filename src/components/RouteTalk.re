open BsReactNative;

[@react.component]
let make = (~contentItem) => {
  let dimensions = Dimensions.get(`window);
  let styles =
    Style.(
      StyleSheet.create({
        "title":
          style([
            padding(Pt(20.)),
            textAlign(Center),
            color(String(Consts.Colors.dark)),
          ]),
        "viewSmall": style([flexGrow(1.), padding(Pt(20.))]),
        "viewLarge": style([flexGrow(1.), padding(Pt(60.))]),
        "text":
          style([
            fontSize(Float(21.)),
            lineHeight(33.),
            fontWeight(`_400),
          ]),
      })
    );
  let isLarge = dimensions##width > 500;
  <AppWrapper>
    {switch ((contentItem: T.contentItemNode)) {
     | Inactive
     | Loading =>
       <Container>
         <BsReactHelmet>
           <title> "Loading..."->React.string </title>
         </BsReactHelmet>
         <Html.H1 textStyle=styles##title> "..."->React.string </Html.H1>
         <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
           <ActivityIndicator size=`large />
         </View>
       </Container>
     | Errored =>
       <Container>
         <BsReactHelmet>
           <title> "Ooops..."->React.string </title>
         </BsReactHelmet>
         <Html.H1 textStyle=styles##title> "Oupssss"->React.string </Html.H1>
         <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
           <Error />
         </View>
       </Container>
     | Idle(contentItem) =>
       <Container>
         <BsReactHelmet>
           <title> {contentItem##title->React.string} </title>
         </BsReactHelmet>
         <Html.H1 textStyle=styles##title>
           {contentItem##title->React.string}
         </Html.H1>
         <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
           {switch (Js.Undefined.toOption(contentItem##videoEmbed)) {
            | None => React.null
            | Some(videoEmbed) =>
              <View>
                <div
                  style={ReactDOMRe.Style.make(
                    ~position="relative",
                    ~overflow="hidden",
                    ~paddingBottom="56.2502460948%",
                    (),
                  )}>
                  <iframe
                    allowFullScreen=true
                    style={ReactDOMRe.Style.make(
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
           {switch (Js.Undefined.toOption(contentItem##slidesEmbed)) {
            | None => React.null
            | Some(slidesEmbed) =>
              <View>
                <div
                  style={ReactDOMRe.Style.make(
                    ~position="relative",
                    ~overflow="hidden",
                    ~paddingBottom="56.2502460948%",
                    (),
                  )}>
                  <iframe
                    allowFullScreen=true
                    style={ReactDOMRe.Style.make(
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
           {switch (Js.Undefined.toOption(contentItem##slides)) {
            | None => React.null
            | Some(slides) =>
              <SpacedView>
                <a href=slides> slides->React.string </a>
              </SpacedView>
            }}
           <MyBodyRenderer body=contentItem##body />
         </View>
       </Container>
     }}
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~contentItem) =>
  React.createElementVariadic(
    make,
    makeProps(~contentItem=PhenomicPresetReactApp.jsEdge(contentItem), ()),
    [|React.null|],
  );

let queries = props => {
  let contentItem =
    PhenomicPresetReactApp.query(
      Item({path: "content/talks", id: props##params##splat}),
    );
  {"contentItem": contentItem};
};
