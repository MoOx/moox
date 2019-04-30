open BsReactNative;

let component = ReasonReact.statelessComponent("ResumeJumbotronSmall");

let triangleHeight = 80.;

let styles =
  Style.(
    StyleSheet.create({
      "container": style([alignItems(Center)]),
      "icons": style([textAlign(Center), lineHeight(60.)]),
      "icon": style([paddingHorizontal(Pt(26.))]),
      "text":
        style([
          backgroundColor(String(Consts.Colors.light)),
          padding(Pt(20.)),
          alignItems(Center),
          width(Pct(100.)),
        ]),
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_800),
        ]),
      "textNode":
        style([
          fontSize(Float(28.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
    })
  );

let currentYear = Js.Date.getFullYear(Js.Date.make())->int_of_float;

[@react.component]
let make = () =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <div
        style={ReactDOMRe.Style.make(
          ~display="flex",
          ~flexDirection="column",
          ~flex="1 1 auto",
          ~background=
            "linear-gradient(hsl(219.1, 100%, 8.5%), hsl(219.1, 40%, 8.5%))",
          (),
        )}>
        <SpacedView
          horizontal=M
          vertical=L
          style=Style.(
            style([
              width(Pct(100.)),
              overflow(Hidden),
              alignItems(FlexStart),
            ])
          )>
          <View
            style=Style.(
              style([
                width(Pct(100.)),
                flexDirection(Row),
                justifyContent(SpaceAround),
                alignItems(FlexEnd),
              ])
            )>
            ResumeJumbotronLarge.moox
            <Spacer />
            ResumeJumbotronLarge.meta
          </View>
          <Spacer size=L />
          <View
            style=Style.(
              style([
                position(Absolute),
                bottom(Pt(40.)),
                left(Pct(80.)),
              ])
            )>
            <View style=Style.(style([left(Pct(-50.))]))> <Me /> </View>
          </View>
          <View
            style=Style.(
              style([
                zIndex(2),
                width(Pct(100.)),
                flexDirection(Row),
                justifyContent(SpaceAround),
                alignItems(FlexEnd),
              ])
            )>
            <View>
              ResumeJumbotronLarge.proForXyears
              <Spacer />
              ResumeJumbotronLarge.firstMobileApp
            </View>
            ResumeJumbotronLarge.firstWebsite
          </View>
        </SpacedView>
      </div>,
  });
