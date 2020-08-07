open ReactNative;

[@react.component]
let make =
    (
      ~wrapperStyle,
      ~iconStyle,
      ~iconColor=Consts.Colors.lightest,
      ~iconSize=16.,
      /* note the default value that just wrap with a simple node */
      ~iconWrapperFunc=(~children) => children,
      (),
    ) => {
  <View style=wrapperStyle>
    {Consts.socialLinks
     ->Belt.Array.map(item =>
         <ViewLink
           key={item.link}
           style=iconStyle
           href={item.link}
           accessibilityLabel={item.text}>
           {iconWrapperFunc(
              ~children=item.componentFunc(~iconColor, ~iconSize),
            )}
         </ViewLink>
       )
     ->React.array}
  </View>;
};
