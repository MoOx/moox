open BsReactNative;

let component = ReasonReact.statelessComponent("RoutePost");

[@react.component]
let make = (~contentItem, ~id) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self => {
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
               "Ooops"->ReasonReact.string
             </Html.H1>
             <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
               <Text> "Ooops"->ReasonReact.string </Text>
             </View>
           </Container>
         | Idle(item) =>
           <Container>
             <BsReactHelmet>
               <title> {item##title->ReasonReact.string} </title>
             </BsReactHelmet>
             <Html.H1 textStyle=styles##title>
               {item##title->ReasonReact.string}
             </Html.H1>
             <View style={isLarge ? styles##viewLarge : styles##viewSmall}>
               <MyBodyRenderer body=item##body />
               <Spacer size=XXL />
               <DisqusComments
                 shortname="moox"
                 identifier={"http://moox.io/blog/" ++ id ++ "/"}
                 url={"http://moox.io/blog/" ++ id ++ "/"}
               />
             </View>
           </Container>
         }}
      </AppWrapper>;
    },
  });

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
