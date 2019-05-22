open ReactNative;

let uri = "/avatar.jpg";

[@react.component]
let make = (~size) => {
  <View
    style=Style.(
      style(
        ~borderWidth=Predefined.hairlineWidth,
        ~borderColor=Predefined.Colors.separator,
        ~borderRadius=size,
        ~width=size->pt,
        ~height=size->pt,
        ~overflow=`hidden,
        (),
      )
    )>
    <Image
      source=Image.(
        Source.(
          fromUriSource(uriSource(~uri, ~width=size, ~height=size, ()))
        )
      )
      // SSR workaround https://github.com/necolas/react-native-web/issues/543
      defaultSource=Image.(
        DefaultSource.(fromUri(~uri, ~width=size, ~height=size, ()))
      )
    />
  </View>;
};
