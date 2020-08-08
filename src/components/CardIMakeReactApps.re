open ReactNative;
open ReactMultiversal;

[@react.component]
let make = () => {
  <ViewWithGradient color=Consts.Colors.blue color2=Consts.Colors.blueDarker>
    <SpacedView>
      <View
        style=Style.(
          style(
            ~position=`absolute,
            ~opacity=0.1,
            ~transform=[|
              perspective(~perspective=800.),
              rotate(~rotate=6.->deg),
            |],
            ~right=(-40.)->dp,
            ~bottom=(-50.)->dp,
            (),
          )
        )>
        <SVGReact
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill=Consts.Colors.light
        />
      </View>
      <Text
        style=Style.(
          style(
            ~fontSize=22.,
            ~color=Consts.Colors.lightGrey,
            ~fontWeight=`_400,
            (),
          )
        )>
        "I MAKE"->React.string
      </Text>
      <Text
        style=Style.(
          style(
            ~fontSize=52.,
            ~color=Consts.Colors.lightest,
            ~fontWeight=`_700,
            (),
          )
        )>
        "React Apps"->React.string
      </Text>
      <Spacer />
      <Text
        style=Style.(
          style(
            ~fontSize=20.,
            ~color=Consts.Colors.ultralightGrey,
            ~fontWeight=`_100,
            (),
          )
        )>
        "AND WEBSITES"->React.string
      </Text>
      <Spacer size=L />
    </SpacedView>
    <SpacedView
      style=Style.(
        style(
          ~backgroundColor=Consts.Colors.blue,
          ~flexDirection=`row,
          ~borderBottomLeftRadius=4.,
          ~borderBottomRightRadius=4.,
          (),
        )
      )>
      <SVGDevices
        fill=Consts.Colors.lightGrey
        width={42.->Style.dp}
        height={42.->Style.dp}
      />
      <Spacer />
      <Text
        style=Style.(
          style(
            ~fontSize=36.,
            ~color=Consts.Colors.lightest,
            ~fontWeight=`_100,
            (),
          )
        )>
        "Mobile & Web"->React.string
      </Text>
    </SpacedView>
  </ViewWithGradient>;
};
