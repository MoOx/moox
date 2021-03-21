open Belt
open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "block": style(~flex=1., ~flexDirection=#row, ()),
    "text": style(
      ~flexDirection=#row,
      ~flex=1.,
      ~alignItems=#flexStart,
      ~lineHeight=28.,
      ~color=Consts.Colors.dark,
      (),
    ),
    "title": style(~fontSize=22., ()),
  })
}

@react.component
let make = (~item: BlogFrontend.t, ()) => {
  let href = "/blog/" ++ (item.id ++ "/")
  <SpacedView key=item.id horizontal=None>
    <Text style={styles["text"]}>
      <Text> {j`•`->React.string} </Text>
      <Spacer size=S />
      <UnderlinedTextLink style={styles["title"]} href>
        {item.title->Js.Null.toOption->Option.getWithDefault("...")->React.string}
      </UnderlinedTextLink>
      <Spacer size=S />
      {switch item.lang->Js.Null.toOption {
      | None => React.null
      | Some(lang) => <Text> {("[" ++ (lang ++ "] "))->React.string} </Text>
      }}
    </Text>
  </SpacedView>
}
