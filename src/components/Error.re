open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "container": style([justifyContent(Center), alignItems(Center)]),
      "oops":
        style([
          fontSize(Float(64.)),
          lineHeight(64.),
          color(String("#ddd")),
        ]),
      "title":
        style([
          margin(Pt(60.)),
          fontSize(Float(24.)),
          lineHeight(48.),
          textAlign(Center),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("Error");

let make = (~label=?, _) => {
  ...component,
  render: _self => {
    let errorText =
      switch (label) {
      | None => "Shit happened!"
      | Some(label) => label
      };
    <SpacedView vertical=XXL>
      <Text style=styles##oops> "Oooops!"->ReasonReact.string </Text>
      <View>
        <Text style=styles##title>
          /* <strong>{status |>text}</strong> */
           errorText->ReasonReact.string </Text>
      </View>
    </SpacedView>;
    /*
     {status === 404 && (
       <View>
         <Text>
           {"It seems you found a broken link. "}
           {"Sorry about that. "}
           <br />
           {"Do not hesitate to report this page."}
         </Text>
       </View>
     )}
     */
  },
};
