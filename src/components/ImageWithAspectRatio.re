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

let component = ReasonReact.statelessComponent("ImageWithAspectRatio");

[@react.component]
let make = (~uri, ~ratio, ~style=?, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View style=styles##imageContainer>
        <PlaceholderWithAspectRatio ratio>
          <ImageFromUri
            style={Style.concat([
              styles##image,
              style->Belt.Option.getWithDefault(Style.style([])),
            ])}
            uri
          />
        </PlaceholderWithAspectRatio>
      </View>,
  });
