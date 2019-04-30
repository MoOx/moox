open BsReactNative;

let component = ReasonReact.statelessComponent("RouteTalk");

let make = (~contentItem) => {
  ...component,
  render: _self => {
    let dimensions = Dimensions.get(`window);
    let styles =
      StyleSheet.create(
        Style.{
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
        },
      );
    let isLarge = dimensions##width > 500;
    <AppWrapper>
      {switch ((contentItem: T.contentItemNode)) {
       | Inactive
       | Loading =>
         <Container>
           <BsReactHelmet>
             <title> "Loading..."->ReasonReact.string </title>
           </BsReactHelmet>
           <Html.H1 textStyle=styles##title>
             "..."->ReasonReact.string
           </Html.H1>
           <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
             <ActivityIndicator size=`large />
           </View>
         </Container>
       | Errored =>
         <Container>
           <BsReactHelmet>
             <title> "Ooops..."->ReasonReact.string </title>
           </BsReactHelmet>
           <Html.H1 textStyle=styles##title>
             "Oupssss"->ReasonReact.string
           </Html.H1>
           <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
             <Error />
           </View>
         </Container>
       | Idle(contentItem) =>
         <Container>
           <BsReactHelmet>
             <title> {contentItem##title->ReasonReact.string} </title>
           </BsReactHelmet>
           <Html.H1 textStyle=styles##title>
             {contentItem##title->ReasonReact.string}
           </Html.H1>
           <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
             {switch (Js.Undefined.toOption(contentItem##videoEmbed)) {
              | None => ReasonReact.null
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
              | None => ReasonReact.null
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
              | None => ReasonReact.null
              | Some(slides) =>
                <Spacer>
                  <a href=slides> slides->ReasonReact.string </a>
                </Spacer>
              }}
             <MyBodyRenderer body=contentItem##body />
           </View>
         </Container>
       }}
    </AppWrapper>;
  },
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~contentItem=PhenomicPresetReactApp.jsEdge(jsProps##contentItem))
  );

let queries = props => {
  let contentItem =
    PhenomicPresetReactApp.query(
      Item({path: "content/talks", id: props##params##splat}),
    );
  {"contentItem": contentItem};
};
