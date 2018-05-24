open BsReactNative;

let imageRatio = 240. /. 350.;

let styles =
  StyleSheet.create(
    Style.(
      {
        "imageContainer": style([overflow(Hidden)]),
        "image":
          style([
            position(Absolute),
            top(Pt(0.)),
            bottom(Pt(0.)),
            right(Pt(0.)),
            left(Pt(0.)),
          ]),
      }
    ),
  );

let component = ReasonReact.statelessComponent("ImageWithAspectRatio");

let make = (~uri, _) => {
  ...component,
  render: _self =>
    <View style=styles##imageContainer>
      <View
        style=Style.(
                style([
                  width(Pct(100.)),
                  paddingBottom(Pct(100. *. imageRatio)),
                ])
              )>
        <Image
          style=styles##image
          source=(URI(Image.(imageURISource(~uri, ()))))
        />
      </View>
    </View>,
};
