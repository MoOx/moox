open BsReactNative;

let styles =
  StyleSheet.create(
    {
      Style.{
        "hugeText":
          style([
            display(Flex),
            flex(1.),
            paddingVertical(Pt(40.)),
            fontSize(Float(120.)),
            lineHeight(120.),
            justifyContent(Center),
          ]),
      };
    },
  );

[@react.component]
let make = (~children, ()) => {
  <Text style=styles##hugeText> children </Text>;
};
