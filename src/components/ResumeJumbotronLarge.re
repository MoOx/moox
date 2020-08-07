open ReactNative;
open ReactMultiversal;

let currentYear = Js.Date.getFullYear(Js.Date.make())->int_of_float;

let triangleHeight = 80.;

let leftTriangle =
  <Triangle
    style=Style.(
      style(
        ~position=`absolute,
        ~bottom=0.->pct,
        ~right=((-1.) *. triangleHeight /. Triangle.coef)->dp,
        (),
      )
    )
    height=triangleHeight
  />;
let rightTriangle =
  <Triangle
    style=Style.(
      style(
        ~position=`absolute,
        ~bottom=0.->pct,
        ~left=((-1.) *. triangleHeight /. Triangle.coef)->dp,
        (),
      )
    )
    height=triangleHeight
  />;

let moox =
  <View>
    <Text
      style=Style.(
        style(
          ~fontSize=64.,
          ~lineHeight=66.,
          ~fontWeight=`_700,
          ~color=Consts.Colors.light,
          (),
        )
      )>
      "MoOx"->React.string
    </Text>
    <Text
      style=Style.(
        style(
          ~fontSize=26.,
          ~lineHeight=26.,
          ~fontWeight=`_200,
          ~color=Consts.Colors.light,
          (),
        )
      )>
      "Maxime Thirouin"->React.string
    </Text>
  </View>;

let meta =
  <View>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.light,
          ~fontSize=18.,
          ~lineHeight=18.,
          ~fontWeight=`_100,
          (),
        )
      )>
      "French"->React.string
    </Text>
    <Text style=Style.(style(~textAlign=`center, ()))>
      <Text
        style=Style.(
          style(
            ~color=Consts.Colors.light,
            ~fontSize=56.,
            ~lineHeight=56.,
            ~fontWeight=`_100,
            (),
          )
        )>
        {string_of_int(currentYear - 1985)->React.string}
      </Text>
      <Text
        style=Style.(
          style(
            ~color=Consts.Colors.light,
            ~fontSize=18.,
            ~lineHeight=18.,
            ~fontWeight=`_900,
            (),
          )
        )>
        " yo "->React.string
      </Text>
    </Text>
  </View>;

let proForXyears =
  <View style=Style.(style(~alignItems=`flexStart, ()))>
    <Text
      style=Style.(style(~color=Consts.Colors.light, ~fontWeight=`_200, ()))>
      "Professional for"->React.string
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.light,
          ~fontSize=116.,
          ~lineHeight=116.,
          ~fontWeight=`_700,
          ~marginTop=dp(-10.),
          (),
        )
      )>
      {string_of_int(currentYear - 2007)->React.string}
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.light,
          ~fontSize=64.,
          ~lineHeight=64.,
          ~fontWeight=`_100,
          ~marginTop=dp(-20.),
          (),
        )
      )>
      " years"->React.string
    </Text>
  </View>;

let firstMobileApp =
  <SpacedView
    vertical=S
    style=Style.(
      style(~alignItems=`center, ~backgroundColor=Consts.Colors.light, ())
    )>
    <Text style=Style.(style(~color=Consts.Colors.dark, ()))>
      "First mobile"->React.string
    </Text>
    <Text style=Style.(style(~color=Consts.Colors.dark, ~fontSize=20., ()))>
      "web app"->React.string
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.dark,
          ~fontSize=76.,
          ~lineHeight=76.,
          ~fontWeight=`_800,
          (),
        )
      )>
      {string_of_int(currentYear - 2005)->React.string}
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.dark,
          ~fontSize=18.,
          ~lineHeight=18.,
          ~fontWeight=`_100,
          (),
        )
      )>
      " years ago"->React.string
    </Text>
  </SpacedView>;

let firstWebsite =
  <View style=Style.(style(~alignItems=`center, ()))>
    <Text style=Style.(style(~color=Consts.Colors.light, ()))>
      "First website"->React.string
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.light,
          ~fontSize=76.,
          ~lineHeight=76.,
          ~fontWeight=`_400,
          (),
        )
      )>
      {string_of_int(currentYear - 1999)->React.string}
    </Text>
    <Text
      style=Style.(
        style(
          ~color=Consts.Colors.light,
          ~fontSize=18.,
          ~lineHeight=18.,
          ~fontWeight=`_100,
          (),
        )
      )>
      "years ago"->React.string
    </Text>
  </View>;

[@react.component]
let make = () => {
  <div
    style={ReactDOMRe.Style.make(
      ~display="flex",
      ~flexDirection="row",
      ~justifyContent="space-between",
      ~flex="1 1 auto",
      ~background=
        "linear-gradient(hsl(219.1, 100%, 8.5%), hsl(219.1, 40%, 8.5%))",
      (),
    )}>
    <View
      style=Style.(
        style(
          ~position=`absolute,
          ~right=dp(-20.),
          ~bottom=20.->dp,
          ~transform=[|rotate(~rotate=6.->deg)|],
          (),
        )
      )>
      <SVGLogo
        width=320.
        height=320.
        fill=Consts.Colors.light
        style=Style.(style(~opacity=0.02, ()))
      />
    </View>
    <View style=Style.(style(~justifyContent=`flexEnd, ~flex=1., ()))>
      <View
        style=Style.(
          style(
            /* ~width=100.->pct, */
            ~backgroundColor=Consts.Colors.light,
            ~height=dp(triangleHeight),
            (),
          )
        )>
        leftTriangle
        <Spacer size=L />
      </View>
    </View>
    <View style=Style.(style(~flexGrow=1., ()))>
      <View
        style=Style.(
          style(~position=`absolute, ~bottom=0.->dp, ~left=51.->pct, ())
        )>
        <View style=Style.(style(~left=(-50.)->pct, ()))> <Me /> </View>
      </View>
      <View
        style=Style.(
          style(
            ~flexGrow=1.,
            ~zIndex=1,
            ~width=100.->pct,
            /* minHeight(390.->dp), */
            /* ~overflow=`hidden */
            ~alignItems=`center,
            (),
          )
        )>
        <Spacer size=L />
        <View style=Style.(style(~flexDirection=`row, ~flexGrow=1., ()))>
          <View style=Style.(style(~justifyContent=`spaceBetween, ()))>
            moox
            proForXyears
          </View>
          <Spacer size=XXL />
          <View
            style=Style.(
              style(
                ~flex=1.,
                ~justifyContent=`flexEnd,
                ~alignItems=`center,
                (),
              )
            )>
            meta
          </View>
          <Spacer size=XXL />
          <View style=Style.(style(~justifyContent=`spaceBetween, ()))>
            firstMobileApp
            <Spacer size=L />
            firstWebsite
          </View>
        </View>
        <Spacer size=L />
      </View>
    </View>
    <View style=Style.(style(~justifyContent=`flexEnd, ~flex=1., ()))>
      <View
        style=Style.(
          style(
            ~backgroundColor=Consts.Colors.light,
            ~height=dp(triangleHeight),
            (),
          )
        )>
        rightTriangle
      </View>
    </View>
  </div>;
};
