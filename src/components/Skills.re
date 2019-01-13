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
    },
  );

type skill = {
  title: string,
  text: string,
  color: string,
  bg: string,
  bg2: string,
  icon: ReasonReact.reactElement,
};

let make = _children => {
  ...component,
  render: _self =>
    <View style=styles##container>
      {[|
         {
           title: {j|JavaScript|j},
           text: {j|ES20** + Flow / TypeScript|j},
           color: Consts.Colors.light,
           bg: "#000B28",
           bg2: Consts.Colors.dark,
           icon:
             <View style=Style.(concat([styles##icon, style([])]))>
               <SVGJavaScriptMini
                 width=170.
                 height=170.
                 fill=Consts.Colors.light
               />
             </View>,
         },
         {
           title: {j|React|j},
           text: {j|Web or Native... or both!|j},
           color: Consts.Colors.light,
           bg: "#09274F",
           bg2: Consts.Colors.dark,
           icon:
             <View
               style=Style.(
                 concat([
                   styles##icon,
                   style([right(Pt(-40.)), bottom(Pt(-40.))]),
                 ])
               )>
               <SVGReact width=200. height=200. fill=Consts.Colors.light />
             </View>,
         },
         {
           title: {j|Reason|j},
           text: {j|Ocaml + BuckleScript = ♥|j},
           color: Consts.Colors.light,
           bg: "#035A93",
           bg2: Consts.Colors.dark,
           icon:
             <View
               style=Style.(
                 concat([
                   styles##icon,
                   style([right(Pt(-40.)), bottom(Pt(-40.))]),
                 ])
               )>
               <SVGReasonMini
                 width=200.
                 height=200.
                 fill=Consts.Colors.light
               />
             </View>,
         },
         {
           title: {j|Front-End|j},
           text: {j|I care about UI and UX|j},
           color: Consts.Colors.light,
           bg: "#28416A",
           bg2: Consts.Colors.dark,
           icon:
             <View
               style=Style.(
                 concat([
                   styles##icon,
                   style([right(Pt(-30.)), bottom(Pt(-30.))]),
                 ])
               )>
               <SVGTouch width=200. height=200. fill=Consts.Colors.light />
             </View>,
         },
         {
           title: {j|Best Practices|j},
           text: {j|Git, Reviews, Tests...|j},
           color: Consts.Colors.light,
           bg: "#0FA5AE",
           bg2: Consts.Colors.dark,
           icon:
             <View style=Style.(concat([styles##icon, style([])]))>
               <SVGUi width=180. height=180. fill=Consts.Colors.light />
             </View>,
         },
         {
           title: {j|Open Source|j},
           text: {j|Sharing is caring|j},
           color: Consts.Colors.light,
           bg: "#36E9BE",
           bg2: Consts.Colors.dark,
           icon:
             <View style=Style.(concat([styles##icon, style([])]))>
               <SVGSocialGithub
                 width=200.
                 height=200.
                 fill=Consts.Colors.light
               />
             </View>,
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
                 ~overflow="hidden",
                 (),
               )}>
               <View style=styles##skill>
                 {skill.icon}
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
    </View>,
};
