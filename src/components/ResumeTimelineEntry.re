open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "wrapper": style([flex(1.)]),
      "block":
        style([
          flex(1.),
          /* borderWidth(1.),
             borderColor(String("#030303")), */
          borderRadius(6.),
          shadowColor(String("#000")),
          shadowOffset(~width=0., ~height=5.),
          shadowOpacity(0.15),
          shadowRadius(30.),
        ]),
      "head": style([flexDirection(Row), justifyContent(SpaceBetween)]),
      "title":
        style([
          fontSize(Float(14.)),
          color(String("#888")),
          fontWeight(`_500),
        ]),
      "company":
        style([
          fontSize(Float(18.)),
          color(String("#333")),
          fontWeight(`_100),
        ]),
      "description": style([fontSize(Float(24.)), fontWeight(`_700)]),
      "duration":
        style([
          fontSize(Float(14.)),
          color(String("#666")),
          fontWeight(`_300),
        ]),
      "links":
        style([
          flex(1.),
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(FlexEnd),
        ]),
      "link":
        style([
          display(Flex),
          justifyContent(Center),
          alignItems(FlexEnd),
          fontSize(Float(14.)),
          color(String("#111")),
          fontWeight(`_200),
        ]),
      "tags":
        style([
          flex(1.),
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(FlexEnd),
        ]),
      "tag":
        style([
          fontSize(Float(14.)),
          color(String("#111")),
          fontWeight(`_300),
        ]),
    },
  );

let component = ReasonReact.statelessComponent("ResumeTimelineEntry");

let make = (~item: T.partialResumeItem, _) => {
  ...component,
  render: _self => {
    let links =
      item##links->Js.undefinedToOption->Belt.Option.getWithDefault([||]);
    let durationInMonths =
      DateFns.differenceInCalendarMonths(
        Js.Date.parse(item##dateEnd),
        Js.Date.parse(item##dateStart),
      )
      ->int_of_float;
    let durationYears = durationInMonths / 12;
    let durationMonths = durationInMonths mod 12;
    <SpacedView key=item##id vertical=M style=styles##wrapper>
      <SpacedView style=styles##block vertical=M horizontal=M>
        <View style=styles##head>
          <Text style=styles##title>
            {item##title->Js.String.toUpperCase->ReasonReact.string}
          </Text>
          {item##url
           ->Js.undefinedToOption
           ->Belt.Option.map(url =>
               <UnderlinedTextLink href=url style=styles##company>
                 {item##company
                  ->Js.undefinedToOption
                  ->Belt.Option.getWithDefault("")
                  ->ReasonReact.string}
               </UnderlinedTextLink>
             )
           ->Belt.Option.getWithDefault(ReasonReact.null)}
        </View>
        <Spacer size=XS />
        <Text style=styles##description>
          {item##description->ReasonReact.string}
        </Text>
        <Spacer size=XS />
        <Text style=styles##duration>
          {(
             (
               switch (durationYears) {
               | 0 => ""
               | 1 => "1 year "
               | y => string_of_int(y) ++ " years "
               }
             )
             ++ (
               switch (durationMonths) {
               | 0 => ""
               | 1 => "1 month "
               | y => string_of_int(y) ++ " months "
               }
             )
           )
           ->ReasonReact.string}
        </Text>
        <Spacer size=XL />
        <View style=styles##tags>
          {item##hashtags
           ->Belt.Array.map(t =>
               <Text key=t style=styles##tag>
                 {(" #" ++ t)->ReasonReact.string}
               </Text>
             )
           ->ReasonReact.array}
        </View>
        {switch (links) {
         | [||] => ReasonReact.null
         | _ =>
           <>
             <Spacer size=L />
             <View style=styles##links>
               {links
                ->Belt.Array.map(l =>
                    <>
                      <Spacer size=XS />
                      <UnderlinedTextLink
                        key={l##title} href={l##url} style=styles##link>
                        {l##title->ReasonReact.string}
                        <Spacer size=XXS />
                        <SVGExternalLink />
                      </UnderlinedTextLink>
                    </>
                  )
                ->ReasonReact.array}
             </View>
           </>
         }}
      </SpacedView>
    </SpacedView>;
  },
};
