open ReactNative;

let uri = "/avatar.jpg";

[@react.component]
let make = (~size) => {
  <Image
    style=Style.(
      style(
        ~borderRadius=size,
        ~width=size->pt,
        ~height=size->pt,
        ~borderWidth=Predefined.hairlineWidth,
        ~borderColor=Predefined.Colors.separator,
        (),
      )
    )
    source=Image.(
      Source.(fromUriSource(uriSource(~uri, ~width=size, ~height=size, ())))
    )
    defaultSource=Image.(
      DefaultSource.(fromUri(~uri, ~width=size, ~height=size, ()))
    )
  />;
};
