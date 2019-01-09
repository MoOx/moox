open BsReactNative;

let component = ReasonReact.statelessComponent("Skills");

let triangleHeight = 80.;

let styles =
  StyleSheet.create(
    Style.{
      "container":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
          alignItems(Center),
          backgroundColor(String("#fff")),
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
      "textNodeStrong":
        style([
          fontSize(Float(32.)),
          color(String("#fff")),
          fontWeight(`_800),
        ]),
      "textSpace": style([flex(1.)]),
      "textNode":
        style([
          textAlign(Right),
          fontSize(Float(16.)),
          color(String("#fff")),
          fontWeight(`_300),
        ]),
    },
  );

type skill = {
  title: string,
  text: string,
  color: string,
  bg: string,
  bg2: string,
};

let make = _children => {
  ...component,
  render: _self =>
    <Container>
      <View style=styles##container>
        {[|
           {
             title: {j|JavaScript|j},
             text: {j|ES20** + Flow / TypeScript|j},
             color: "#fff",
             bg: "#F0DA4E",
             bg2: "#000",
           },
           {
             title: {j|React|j},
             text: {j|Web or Native... or both!|j},
             color: "#fff",
             bg: "#48AADC",
             bg2: "#000",
           },
           {
             title: {j|Reason|j},
             text: {j|Ocaml + BuckleScript = ♥|j},
             color: "#fff",
             bg: "#DD4B39",
             bg2: "#000",
           },
           {
             title: {j|Front-End|j},
             text: {j|I care about UI and UX|j},
             color: "#fff",
             bg: "#333",
             bg2: "#000",
           },
           {
             title: {j|Best Practices|j},
             text: {j|Git, Reviews, Tests...|j},
             color: "#fff",
             bg: "#0A0A40",
             bg2: "#000",
           },
           {
             title: {j|Open Source|j},
             text: {j|Sharing is caring|j},
             color: "#fff",
             bg: "#24292F",
             bg2: "#000",
           },
         |]
         ->Belt.Array.map(skill =>
             <SpacedView
               key={skill.title}
               horizontal=M
               vertical=M
               style=styles##skillWrapper>
               <div
                 style={ReactDOMRe.Style.make(
                   ~display="flex",
                   ~flexDirection="column",
                   ~flex="1 1 auto",
                   ~borderRadius="4px",
                   ~background=
                     "linear-gradient(0.45turn, "
                     ++ skill.bg
                     ++ " 10%, "
                     ++ skill.bg2
                     ++ " 110%)",
                   (),
                 )}>
                 <View style=styles##skill>
                   <Text
                     style=Style.(
                       concat([
                         styles##textNodeStrong,
                         style([color(String(skill.color))]),
                       ])
                     )>
                     skill.title->R.string
                   </Text>
                   <Spacer style=styles##textSpace />
                   <Text style=styles##textNode> skill.text->R.string </Text>
                 </View>
               </div>
             </SpacedView>
           )
         ->ReasonReact.array}
      </View>
    </Container>,
};
