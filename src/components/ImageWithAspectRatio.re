open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "imageContainer": style([display(Flex), overflow(Hidden)]),
      "image":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          right(Pt(0.)),
          left(Pt(0.)),
          backgroundColor(String("#eee")),
        ]),
    })
  );

[@react.component]
let make = (~uri, ~ratio, ~style as styl=?, ()) => {
  <View style=styles##imageContainer>
    <PlaceholderWithAspectRatio ratio>
      <ImageFromUri
        style=Style.(arrayOption([|Some(styles##image), styl|]))
        uri
      />
    </PlaceholderWithAspectRatio>
  </View>;
};
