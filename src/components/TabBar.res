open Belt
open ReactNative

let colorInactive = Consts.Colors.tabBarIconInactive
let colorActive = Consts.Colors.tabBarIconActive

let styles = {
  open Style
  StyleSheet.create({
    "itemWrapper": viewStyle(~flex=1., ~justifyContent=#center, ()),
  })
}

@react.component
let make = () => {
  let currentLocation = Next.useRouter().pathname
  <ReactMultiversal.TabBarWrapper>
    {Consts.menuLinks
    ->Array.map(({link, text, icon, isActive}) =>
      <ViewLink key=link href=link style={styles["itemWrapper"]}>
        <TabBarItem
          icon isActive={isActive(currentLocation, link)} colorActive colorInactive text={text}
        />
      </ViewLink>
    )
    ->React.array}
  </ReactMultiversal.TabBarWrapper>
}

let default = make
