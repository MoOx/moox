open Belt;
open ReactNative;
open ReactMultiversal;

let colorInactive = Consts.Colors.tabBarIconInactive;
let colorActive = Consts.Colors.tabBarIconActive;

let styles =
  Style.(
    StyleSheet.create({
      "itemWrapper": viewStyle(~flex=1., ~justifyContent=`center, ()),
    })
  );

[@react.component]
let make = () => {
  let currentLocation = "";
  <TabBarWrapper>
    {Consts.menuLinks
     ->Array.map(({link, text, icon, isActive}) =>
         <ViewLink key=link href=link style=styles##itemWrapper>
           <TabBarItem
             icon
             isActive={isActive(currentLocation, link)}
             colorActive
             colorInactive
             text
           />
         </ViewLink>
       )
     ->React.array}
  </TabBarWrapper>;
};

let default = make;
