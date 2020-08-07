open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "imageContainer": style(~display=`flex, ~overflow=`hidden, ()),
      "image":
        style(
          ~position=`absolute,
          ~top=0.->dp,
          ~bottom=0.->dp,
          ~right=0.->dp,
          ~left=0.->dp,
          ~backgroundColor="#eee",
          (),
        ),
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
