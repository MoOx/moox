open BsReactNative;

let component = ReasonReact.statelessComponent("Jumbotron");

let triangleHeight = 80.;

let styles =
  StyleSheet.create(
    Style.{
      "container": style([alignItems(Center)]),
      "head": style([position(Absolute), bottom(Pct(0.))]),
      "imgWrapper":
        style([
          width(Pct(100.)),
          height(Pt(390.)),
          overflow(Hidden),
          alignItems(Center),
        ]),
      "me": style([]),
      "title":
        style([
          textAlign(Center),
          fontSize(Float(44.)),
          fontWeight(`Bold),
          color(String("#fff")),
        ]),
      "subtitle":
        style([
          textAlign(Center),
          fontSize(Float(16.)),
          fontWeight(`_200),
          color(String("#fff")),
        ]),
      "trickLeft":
        style([
          backgroundColor(String("#fff")),
          position(Absolute),
          bottom(Pct(0.)),
          left(Pt((-1.) *. triangleHeight /. Triangle.coef)),
          width(Pct(33.)),
          height(Pt(triangleHeight)),
        ]),
      "trickLeft_":
        style([
          position(Absolute),
          bottom(Pct(0.)),
          right(Pt((-1.) *. triangleHeight /. Triangle.coef)),
        ]),
      "trickRight":
        style([
          backgroundColor(String("#fff")),
          position(Absolute),
          bottom(Pct(0.)),
          right(Pt((-1.) *. triangleHeight /. Triangle.coef)),
          width(Pct(33.)),
          height(Pt(triangleHeight)),
        ]),
      "trickRight_":
        style([
          position(Absolute),
          bottom(Pct(0.)),
          left(Pt((-1.) *. triangleHeight /. Triangle.coef)),
        ]),
      "icons": style([textAlign(Center), lineHeight(60.)]),
      "icon": style([paddingHorizontal(Pt(26.))]),
      "text":
        style([
          backgroundColor(String("#fff")),
          padding(Pt(20.)),
          alignItems(Center),
          width(Pct(100.)),
        ]),
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String("#000F2B")),
          fontWeight(`_800),
        ]),
      "textNode":
        style([
          fontSize(Float(28.)),
          color(String("#000F2B")),
          fontWeight(`_200),
        ]),
    },
  );

let make = _children => {
  ...component,
  render: _self =>
    <div
      style={ReactDOMRe.Style.make(
        ~display="flex",
        ~flexDirection="column",
        ~flex="1 1 auto",
        ~background=
          "radial-gradient(circle at 50% 60%, #36E9BE 80px, #13D0BF 160px, #0CA5AE 240px, #096F97 320px, transparent 70%), linear-gradient(179deg, #111, #08274F, #002770)",
        (),
      )}>
      <View style=styles##container>
        <View style=styles##imgWrapper>
          <Spacer />
          <View style=styles##me> <Me /> </View>
          <View style=styles##head>
            <Text style=styles##title> {"MoOx" |> R.string} </Text>
            <Text style=styles##subtitle>
              {"Maxime Thirouin" |> R.string}
            </Text>
            <Spacer />
          </View>
          <View style=styles##trickLeft>
            <Triangle style=styles##trickLeft_ height=triangleHeight />
          </View>
          <View style=styles##trickRight>
            <Triangle style=styles##trickRight_ height=triangleHeight />
          </View>
        </View>
        <View style=styles##text>
          <Spacer />
          <Text style=styles##textNodeStrong>
            {{j|Freelance Mobile & Web Developer|j} |> R.string}
          </Text>
          <Spacer />
          <Text style=styles##textNode>
            {{j|I make front-ends using React, JavaScript & Reason.|j}
             |> R.string}
          </Text>
          <Spacer />
        </View>
      </View>
    </div>,
};
