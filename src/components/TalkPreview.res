open ReactNative
open ReactNative.Style
open ReactMultiversal

@react.component
let make = (~item: TalksFrontend.t, ()) => {
  let theme = T.useTheme()
  let href = "/talk/" ++ (item.id ++ "/")
  <SpacedView key=item.id horizontal=None>
    <Text style={array([Font.ios["title3"], theme.styles["text"]])}>
      <Text> {j`•`->React.string} </Text>
      <Spacer size=S />
      <UnderlinedTextLink href>
        {item.title->React.string}
        <small>
          {switch item.conference->Js.Null.toOption {
          | None => React.null
          | Some(conference) => <Text> {(" @ " ++ conference)->React.string} </Text>
          }}
        </small>
      </UnderlinedTextLink>
      <Spacer size=S />
      {switch item.lang->Js.Null.toOption {
      | None => React.null
      | Some(lang) => <Text> {("[" ++ (lang ++ "] "))->React.string} </Text>
      }}
    </Text>
  </SpacedView>
}
