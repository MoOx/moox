open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "title": style([color(String(Consts.Colors.dark))]),
      "text":
        style([fontSize(Float(21.)), lineHeight(33.), fontWeight(`_400)]),
    })
  );

[@react.component]
let make = (~contentItem) => {
  <AppWrapper>
    {switch ((contentItem: T.contentItemNode)) {
     | Inactive
     | Loading =>
       <Container>
         <BsReactHelmet>
           <title> "Loading..."->React.string </title>
         </BsReactHelmet>
         <SpacedView vertical=None>
           <Html.H1 textStyle=styles##title> "..."->React.string </Html.H1>
           <ActivityIndicator size=`large />
           <Spacer size=L />
         </SpacedView>
       </Container>
     | Errored =>
       <Container>
         <BsReactHelmet>
           <title> "Ooops..."->React.string </title>
         </BsReactHelmet>
         <SpacedView vertical=None>
           <Html.H1 textStyle=styles##title> "Oupssss"->React.string </Html.H1>
           <Error />
           <Spacer size=L />
         </SpacedView>
       </Container>
     | Idle(contentItem) =>
       <Container>
         <BsReactHelmet>
           <title> {contentItem##title->React.string} </title>
         </BsReactHelmet>
         <SpacedView vertical=None>
           <Html.H1 textStyle=styles##title>
             {contentItem##title->React.string}
           </Html.H1>
           <Spacer size=L />
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
           <Spacer size=L />
         </SpacedView>
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
