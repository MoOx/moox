open Belt
open ReactNative
open ReactMultiversal

let styles = {
  open Style
  StyleSheet.create({
    "wrapper": style(~flexGrow=1., ~flexShrink=1., ()),
    "container": style(
      ~flexGrow=1.,
      ~flexShrink=1.,
      ~borderRadius=10.,
      ~backgroundColor=Consts.Colors.lightest,
      ~shadowColor="#000",
      ~shadowOffset=offset(~width=0., ~height=5.),
      ~shadowOpacity=0.15,
      ~shadowRadius=30.,
      (),
    ),
    "imageWrapper": style(
      ~borderTopLeftRadius=10.,
      ~borderTopRightRadius=10.,
      ~overflow=#hidden,
      (),
    ),
    "title": style(~fontSize=14., ~color="#888", ~fontWeight=#_500, ()),
    "company": style(~fontSize=16., ~color="#333", ~fontWeight=#_100, ()),
    "description": textStyle(
      ~flexShrink=1.,
      ~fontSize=24.,
      ~fontWeight=#_700,
      ~overflow=#hidden,
      (),
    ),
    "duration": style(~fontSize=14., ~color="#666", ~fontWeight=#_300, ()),
    "links": style(~flex=1., ~flexDirection=#row, ~flexWrap=#wrap, ~justifyContent=#flexEnd, ()),
    "link": style(
      ~display=#flex,
      ~justifyContent=#center,
      ~alignItems=#flexEnd,
      ~fontSize=14.,
      ~color=Consts.Colors.dark,
      ~fontWeight=#_200,
      (),
    ),
    "tags": style(~flex=1., ~flexDirection=#row, ~flexWrap=#wrap, ~justifyContent=#flexEnd, ()),
    "tag": style(~fontSize=14., ~color=Consts.Colors.dark, ~fontWeight=#_300, ()),
  })
}

@module("date-fns")
external differenceInCalendarMonths: (Js.Date.t, Js.Date.t) => float = "differenceInCalendarMonths"

@react.component
let make = (~item: ResumeFrontend.t) => {
  let links = item.links->Js.Null.toOption->Belt.Option.getWithDefault([])
  <SpacedView key=item.id horizontal=None style={styles["wrapper"]}>
    <View style={styles["container"]}>
      {item.image
      ->Js.Null.toOption
      ->Belt.Option.map(image =>
        <View style={styles["imageWrapper"]}>
          <ImageWithAspectRatio uri=image ratio={2160. /. 3840.} />
        </View>
      )
      ->Belt.Option.getWithDefault(React.null)}
      <SpacedView style={Predefined.styles["flexGrow"]}>
        <View style={Predefined.styles["rowWrapSpaceBetween"]}>
          <Text style={styles["title"]}> {item.title->Js.String.toUpperCase->React.string} </Text>
          {item.url
          ->Js.Null.toOption
          ->Belt.Option.map(url =>
            <UnderlinedTextLink href=url style={styles["company"]}>
              {item.company->Js.Null.toOption->Belt.Option.getWithDefault("")->React.string}
            </UnderlinedTextLink>
          )
          ->Belt.Option.getWithDefault(React.null)}
        </View>
        <Spacer size=XS />
        <Text style={styles["description"]}>
          {item.description
          ->Js.Null.toOption
          ->Option.map(React.string)
          ->Option.getWithDefault(React.null)}
        </Text>
        {item.dateEnd
        ->Js.Null.toOption
        ->Option.map(dateEnd => {
          let durationInMonths =
            differenceInCalendarMonths(
              Js.Date.fromString(dateEnd),
              Js.Date.fromString(item.dateStart),
            )->int_of_float
          let durationYears = durationInMonths / 12
          let durationMonths = mod(durationInMonths, 12)
          <>
            <Spacer size=XS />
            <Text style={styles["duration"]}>
              {(switch durationYears {
              | 0 => ""
              | 1 => "1 year "
              | y => string_of_int(y) ++ " years "
              } ++
              switch durationMonths {
              | 0 => ""
              | 1 => "1 month "
              | y => string_of_int(y) ++ " months "
              })->React.string}
            </Text>
          </>
        })
        ->Option.getWithDefault(React.null)}
        <Spacer size=XL />
        <View style={styles["tags"]}>
          {item.hashtags
          ->Belt.Array.map(t =>
            <Text key=t style={styles["tag"]}> {(" #" ++ t)->React.string} </Text>
          )
          ->React.array}
        </View>
        {switch links {
        | [] => React.null
        | _ => <>
            <Spacer size=L />
            <View style={styles["links"]}>
              {links
              ->Belt.Array.map(link =>
                <React.Fragment key=link.title>
                  <Spacer size=XS />
                  <UnderlinedTextLink key=link.title href=link.url style={styles["link"]}>
                    {link.title->React.string} <Spacer size=XXS /> <SVGExternalLink />
                  </UnderlinedTextLink>
                </React.Fragment>
              )
              ->React.array}
            </View>
          </>
        }}
      </SpacedView>
    </View>
  </SpacedView>
}
