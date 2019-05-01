open BsReactNative;

let component = ReasonReact.statelessComponent("Skills");

let triangleHeight = 80.;

let styles =
  Style.(
    StyleSheet.create({
      "container":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
          alignItems(Center),
          backgroundColor(String(Consts.Colors.light)),
        ]),
      "skillWrapper": style([flex(1.), flexBasis(Pt(250.))]),
      "skill":
        style([
          padding(Pt(20.)),
          flexBasis(Pt(200.)),
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.2),
          shadowRadius(10.),
        ]),
      "icon":
        style([
          position(Absolute),
          right(Pt(-20.)),
          bottom(Pt(-20.)),
          opacity(Float(0.1)),
          Transform.make(~perspective=800., ~rotate="6deg", ()),
        ]),
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String(Consts.Colors.light)),
          fontWeight(`_800),
        ]),
      "textSpace": style([flex(1.)]),
      "textNode":
        style([
          textAlign(Right),
          fontSize(Float(16.)),
          color(String(Consts.Colors.light)),
          fontWeight(`_300),
        ]),
    })
  );

type item = {
  title: string,
  text: string,
  color: string,
  bg: string,
  bg2: string,
  icon: ReasonReact.reactElement,
};

[@react.component]
let make = (~item, ()) =>
  ReactCompat.useRecordApi({
    ...component,
    render: _self =>
      <SpacedView
        key={item.title} horizontal=M vertical=M style=styles##skillWrapper>
        <div
          style={ReactDOMRe.Style.make(
            ~display="flex",
            ~flexDirection="column",
            ~flex="1 1 auto",
            ~borderRadius="4px",
            ~background=
              "linear-gradient(0.45turn, "
              ++ item.bg
              ++ " 10%, "
              ++ item.bg2
              ++ " 110%)",
            ~overflow="hidden",
            (),
          )}>
          <View style=styles##skill>
            {item.icon}
            <Text
              style=Style.(
                array([|
                  styles##textNodeStrong,
                  style([color(String(item.color))]),
                |])
              )>
              item.title->ReasonReact.string
            </Text>
            <Spacer style=styles##textSpace />
            <Text style=styles##textNode> item.text->ReasonReact.string </Text>
          </View>
        </div>
      </SpacedView>,
  });
