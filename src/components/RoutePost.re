open BsReactNative;
open ReactMultiversal;

let styles =
  Style.(
    StyleSheet.create({
      "title": style([color(String(Consts.Colors.dark))]),
      "text":
        style([fontSize(Float(21.)), lineHeight(33.), fontWeight(`_400)]),
    })
  );

[@react.component]
let make = (~contentItem, ~id) => {
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
     | Idle(item) =>
       <Container>
         <BsReactHelmet>
           <title> {item##title->React.string} </title>
         </BsReactHelmet>
         <SpacedView vertical=None>
           <Html.H1 textStyle=styles##title>
             {item##title->React.string}
           </Html.H1>
           <MyBodyRenderer body=item##body />
           <Spacer size=XXL />
           <DisqusComments
             shortname="moox"
             identifier={"http://moox.io/blog/" ++ id ++ "/"}
             url={"http://moox.io/blog/" ++ id ++ "/"}
           />
           <Spacer size=L />
         </SpacedView>
       </Container>
     }}
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~contentItem, ~params) =>
  React.createElementVariadic(
    make,
    makeProps(
      ~contentItem=PhenomicPresetReactApp.jsEdge(contentItem),
      ~id=params##splat,
      (),
    ),
    [|React.null|],
  );

let queries = props => {
  let contentItem =
    PhenomicPresetReactApp.query(
      Item({path: "content/blog", id: props##params##splat}),
    );
  {"contentItem": contentItem};
};
