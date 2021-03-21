open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "icon": style(~padding=10.->dp, ()),
    "link": style(~padding=10.->dp, ~fontSize=14., ~color="#FBFCF8", ()),
    // "bar": style(~flexDirection=#row, ~flexWrap=#wrap, ~justifyContent=#spaceBetween, ()),
    // "barWrapper": style(~backgroundColor=Consts.Colors.dark, ()),
    "text": style(~fontSize=12., ~lineHeight=20., ~color="#FBFCF8", ()),
    // "row": style(~flexDirection=#row, ~flexWrap=#wrap, ~alignItems=#center, ()),
    // "column": style(~alignItems=#center, ~justifyContent=#center, ()),
  })
}

@react.component
let make = () =>
  <View>
    <Container
      wrapperStyle={
        open Style
        style(~backgroundColor=Consts.Colors.dark, ())
      }>
      <View
        style={Style.array([
          Predefined.styles["rowWrap"],
          Predefined.styles["flex"],
          Predefined.styles["alignCenter"],
        ])}>
        <SpacedView horizontal=S vertical=S>
          <SocialIcons
            wrapperStyle={Predefined.styles["rowCenter"]} iconStyle={styles["icon"]} iconSize=48.
          />
        </SpacedView>
        <View style={Predefined.styles["flex"]} />
        <SpacedView
          horizontal=S
          vertical=S
          style={Style.array([Predefined.styles["rowWrap"], Predefined.styles["flexShrink"]])}>
          {Consts.menuLinks
          ->Belt.Array.map(item =>
            <TextLink key=item.link style={styles["link"]} href=item.link>
              {item.text->React.string}
            </TextLink>
          )
          ->React.array}
        </SpacedView>
      </View>
      <SpacedView horizontal=L vertical=L style={Predefined.styles["rowWrap"]}>
        <View style={Style.array([Predefined.styles["rowWrap"], Predefined.styles["flexShrink"]])}>
          <Text style={styles["text"]}> {"Made with "->React.string} </Text>
          <TextLink style={styles["text"]} href="https://rescript-lang.org/">
            {"ReScript, "->React.string}
          </TextLink>
          <TextLink style={styles["text"]} href="https://reactnative.dev">
            {"React Native"->React.string}
          </TextLink>
          <TextLink style={styles["text"]} href="https://necolas.github.io/react-native-web/">
            {" Web, "->React.string}
          </TextLink>
          <TextLink style={styles["text"]} href="https://nextjs.org">
            {"Next.js"->React.string}
          </TextLink>
          <Text style={styles["text"]}> {" and "->React.string} </Text>
          <TextLink style={styles["text"]} href="https://github.com/reason-react-native">
            {"ReScript React Native"->React.string}
          </TextLink>
        </View>
        <Text style={styles["text"]}> {j`  ·  `->React.string} </Text>
        <TextLink style={styles["text"]} href="https://github.com/MoOx/moox.io">
          {"100% Over-engineered source available on GitHub"->React.string}
        </TextLink>
      </SpacedView>
    </Container>
  </View>
