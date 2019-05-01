open BsReactNative;

let component = ReasonReact.statelessComponent("Jumbotron");

let triangleHeight = 80.;

let styles =
  Style.(
    StyleSheet.create({
      "container":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
          backgroundColor(String("#020202")),
          minHeight(Pt(450.)),
        ]),
      "bg":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          right(Pct(50.)),
        ]),
      "contentWrapper":
        style([
          position(Absolute),
          top(Pt(0.)),
          bottom(Pt(0.)),
          left(Pct(40.)),
          right(Pt(0.)),
          flexDirection(Row),
        ]),
      "content": style([flex(1.), justifyContent(Center)]),
      "title":
        style([
          fontSize(Float(44.)),
          fontWeight(`Bold),
          color(String(Consts.Colors.light)),
        ]),
      "subtitle":
        style([
          fontSize(Float(16.)),
          fontWeight(`_200),
          color(String(Consts.Colors.light)),
        ]),
      "textWrapper":
        style([
          backgroundColor(String(Consts.Colors.lightest)),
          opacity(Float(0.95)),
        ]),
      "textStrong":
        style([
          fontSize(Float(30.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "textLight":
        style([
          fontSize(Float(26.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
    })
  );

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <View style=styles##container>
        <MeBackground style=styles##bg />
        <View style=styles##contentWrapper>
          <WindowSizeFilter.MMin>
            <View
              style=Style.(
                style([
                  position(Absolute),
                  right(Pt(-20.)),
                  bottom(Pt(-80.)),
                  Transform.make(~rotate="6deg", ()),
                ])
              )>
              <SVGLogo
                width=360.
                height=360.
                fill=Consts.Colors.lightest
                style=Style.(style([opacity(Float(0.06))]))
              />
            </View>
          </WindowSizeFilter.MMin>
          <WindowSizeFilter.MMin
            style={ReactDOMRe.Style.make(~width="20%", ~height="1px", ())}
          />
          <View style=styles##content accessibilityRole=`header>
            <Text style=styles##title> "MoOx"->ReasonReact.string </Text>
            <Text style=styles##subtitle>
              "Maxime Thirouin"->ReasonReact.string
            </Text>
            <Spacer />
            <SpacedView style=styles##textWrapper horizontal=M vertical=M>
              <Text style=styles##textStrong>
                {j|Freelance Front-End Developer|j}->ReasonReact.string
              </Text>
              <Text style=styles##textLight>
                {j|Mobile & Web|j}->ReasonReact.string
              </Text>
            </SpacedView>
          </View>
        </View>
      </View>,
  });
