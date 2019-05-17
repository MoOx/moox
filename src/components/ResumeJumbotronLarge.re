open BsReactNative;

let currentYear = Js.Date.getFullYear(Js.Date.make())->int_of_float;

let triangleHeight = 80.;

let leftTriangle =
  <Triangle
    style=Style.(
      style([
        position(Absolute),
        bottom(Pct(0.)),
        right(Pt((-1.) *. triangleHeight /. Triangle.coef)),
      ])
    )
    height=triangleHeight
  />;
let rightTriangle =
  <Triangle
    style=Style.(
      style([
        position(Absolute),
        bottom(Pct(0.)),
        left(Pt((-1.) *. triangleHeight /. Triangle.coef)),
      ])
    )
    height=triangleHeight
  />;

let moox =
  <View>
    <Text
      style=Style.(
        style([
          fontSize(Float(64.)),
          lineHeight(66.),
          fontWeight(`_700),
          color(String(Consts.Colors.light)),
        ])
      )>
      "MoOx"->React.string
    </Text>
    <Text
      style=Style.(
        style([
          fontSize(Float(26.)),
          lineHeight(26.),
          fontWeight(`_200),
          color(String(Consts.Colors.light)),
        ])
      )>
      "Maxime Thirouin"->React.string
    </Text>
  </View>;

let meta =
  <View>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.light)),
          fontSize(Float(18.)),
          lineHeight(18.),
          fontWeight(`_100),
        ])
      )>
      "French"->React.string
    </Text>
    <Text style=Style.(style([textAlign(Center)]))>
      <Text
        style=Style.(
          style([
            color(String(Consts.Colors.light)),
            fontSize(Float(56.)),
            lineHeight(56.),
            fontWeight(`_100),
          ])
        )>
        {string_of_int(currentYear - 1985)->React.string}
      </Text>
      <Text
        style=Style.(
          style([
            color(String(Consts.Colors.light)),
            fontSize(Float(18.)),
            lineHeight(18.),
            fontWeight(`_900),
          ])
        )>
        " yo "->React.string
      </Text>
    </Text>
  </View>;

let proForXyears =
  <View style=Style.(style([alignItems(FlexStart)]))>
    <Text
      style=Style.(
        style([color(String(Consts.Colors.light)), fontWeight(`_200)])
      )>
      "Professional for"->React.string
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.light)),
          fontSize(Float(116.)),
          lineHeight(116.),
          fontWeight(`_700),
          marginTop(Pt(-10.)),
        ])
      )>
      {string_of_int(currentYear - 2007)->React.string}
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.light)),
          fontSize(Float(64.)),
          lineHeight(64.),
          fontWeight(`_100),
          marginTop(Pt(-20.)),
        ])
      )>
      " years"->React.string
    </Text>
  </View>;

let firstMobileApp =
  <SpacedView
    vertical=S
    style=Style.(
      style([
        alignItems(Center),
        backgroundColor(String(Consts.Colors.light)),
      ])
    )>
    <Text style=Style.(style([color(String(Consts.Colors.dark))]))>
      "First mobile"->React.string
    </Text>
    <Text
      style=Style.(
        style([color(String(Consts.Colors.dark)), fontSize(Float(20.))])
      )>
      "web app"->React.string
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.dark)),
          fontSize(Float(76.)),
          lineHeight(76.),
          fontWeight(`_800),
        ])
      )>
      {string_of_int(currentYear - 2005)->React.string}
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.dark)),
          fontSize(Float(18.)),
          lineHeight(18.),
          fontWeight(`_100),
        ])
      )>
      " years ago"->React.string
    </Text>
  </SpacedView>;

let firstWebsite =
  <View style=Style.(style([alignItems(Center)]))>
    <Text style=Style.(style([color(String(Consts.Colors.light))]))>
      "First website"->React.string
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.light)),
          fontSize(Float(76.)),
          lineHeight(76.),
          fontWeight(`_400),
        ])
      )>
      {string_of_int(currentYear - 1999)->React.string}
    </Text>
    <Text
      style=Style.(
        style([
          color(String(Consts.Colors.light)),
          fontSize(Float(18.)),
          lineHeight(18.),
          fontWeight(`_100),
        ])
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
        style([
          position(Absolute),
          right(Pt(-20.)),
          bottom(Pt(20.)),
          Transform.make(~rotate="6deg", ()),
        ])
      )>
      <SVGLogo
        width=320.
        height=320.
        fill=Consts.Colors.light
        style=Style.(style([opacity(Float(0.02))]))
      />
    </View>
    <View style=Style.(style([justifyContent(FlexEnd), flex(1.)]))>
      <View
        style=Style.(
          style([
            /* width(Pct(100.)), */
            backgroundColor(String(Consts.Colors.light)),
            height(Pt(triangleHeight)),
          ])
        )>
        leftTriangle
        <Spacer size=L />
      </View>
    </View>
    <View style=Style.(style([flexGrow(1.)]))>
      <View
        style=Style.(
          style([position(Absolute), bottom(Pt(0.)), left(Pct(51.))])
        )>
        <View style=Style.(style([left(Pct(-50.))]))> <Me /> </View>
      </View>
      <View
        style=Style.(
          style([
            flexGrow(1.),
            zIndex(1),
            width(Pct(100.)),
            /* minHeight(Pt(390.)), */
            /* overflow(Hidden), */
            alignItems(Center),
          ])
        )>
        <Spacer size=L />
        <View style=Style.(style([flexDirection(Row), flexGrow(1.)]))>
          <View style=Style.(style([justifyContent(SpaceBetween)]))>
            moox
            proForXyears
          </View>
          <Spacer size=XXL />
          <View
            style=Style.(
              style([
                flex(1.),
                justifyContent(FlexEnd),
                alignItems(Center),
              ])
            )>
            meta
          </View>
          <Spacer size=XXL />
          <View style=Style.(style([justifyContent(SpaceBetween)]))>
            firstMobileApp
            <Spacer size=L />
            firstWebsite
          </View>
        </View>
        <Spacer size=L />
      </View>
    </View>
    <View style=Style.(style([justifyContent(FlexEnd), flex(1.)]))>
      <View
        style=Style.(
          style([
            backgroundColor(String(Consts.Colors.light)),
            height(Pt(triangleHeight)),
          ])
        )>
        rightTriangle
      </View>
    </View>
  </div>;
};
