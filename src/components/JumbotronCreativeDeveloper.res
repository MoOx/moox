open ReactNative
open ReactNative.Style
open ReactMultiversal

let styles = {
  "container": viewStyle(
    ~flexDirection=#row,
    ~justifyContent=#center,
    ~alignItems=#center,
    // ~backgroundColor="#020202",
    ~minHeight=450.->dp,
    // ~overflow=#hidden,
    (),
  ),
  "content": style(~flex=1., ~justifyContent=#center, ()),
  "subtitle": style(~fontSize=18.5, ~fontWeight=#_200, ~color=Consts.Colors.light, ()),
}->StyleSheet.create

@react.component
let make = () => {
  // let theme = T.useTheme()
  <>
    <SvgFilterTurbulence
      id="JumbotronCreativeDeveloperSVGFilter1"
      baseFrequency="0.05"
      numOctaves="5"
      seed="4"
      saturate="50"
      scale="4"
    />
    <SvgFilterTurbulence
      id="JumbotronCreativeDeveloperSVGFilter2"
      baseFrequency="0.04"
      numOctaves="5"
      seed="4"
      saturate="50"
      scale="4"
    />
    <SvgFilterTurbulence
      id="JumbotronCreativeDeveloperSVGFilter4"
      baseFrequency="0.03"
      numOctaves="5"
      seed="4"
      saturate="50"
      scale="4"
    />
    <SvgFilterTurbulence
      id="JumbotronCreativeDeveloperSVGFilter5"
      baseFrequency="0.045"
      numOctaves="5"
      seed="4"
      saturate="50"
      scale="4"
    />
    <SvgFilterTurbulence
      id="JumbotronCreativeDeveloperSVGFilter5"
      baseFrequency="0.045"
      numOctaves="7"
      seed="4"
      saturate="50"
      scale="4"
    />
    <style
      dangerouslySetInnerHTML={
        "__html": `
@keyframes JumbotronCreativeDeveloperSVGFilterAnimation {
  0% { filter: url(#JumbotronCreativeDeveloperSVGFilter1); }
  20% { filter: url(#JumbotronCreativeDeveloperSVGFilter2); }
  40% { filter: url(#JumbotronCreativeDeveloperSVGFilter3); }
  60% { filter: url(#JumbotronCreativeDeveloperSVGFilter4); }
  80% { filter: url(#JumbotronCreativeDeveloperSVGFilter5); }
  100% { filter: url(#JumbotronCreativeDeveloperSVGFilter6); }
}`,
      }
    />
    <View style={styles["container"]}>
      <View
        style={array([
          StyleSheet.absoluteFill,
          viewStyle(
            ~overflow=#hidden,
            ~transform=[rotate(~rotate=-3.->deg), scale(~scale=1.1)],
            (),
          ),
          unsafeStyle({
            "background": "linear-gradient(16deg, #f430a9, #f2e782)",
            // "background": "linear-gradient(180deg, #00E2C2, #027596)",
          }),
        ])}
      />
      <View
        style={array([
          viewStyle(
            ~position=#absolute,
            ~top=60.->dp,
            // ~bottom=0.->dp,
            ~left=25.->pct,
            ~justifyContent=#flexEnd,
            (),
          ),
          unsafeStyle({
            // "mixBlendMode": "color-dodge", // ligtttthhhh
            // "mixBlendMode": "hard-light", // hummm
            // "mixBlendMode": "lighten", // need exposure (constrat+)
            // "mixBlendMode": "luminosity", // good mix
            // "mixBlendMode": "overlay", // fade
            // "mixBlendMode": "plus-lighter", // over exposed
            "mixBlendMode": "screen",
            "filter": "grayscale(100%) contrast(2)",
          }),
        ])}>
        <Next.Image src="/me-with-hand-mic.png" width=350. height=350. objectFit=#contain />
      </View>
      <View style={array([StyleSheet.absoluteFill, Predefined.styles["rowCenter"]])}>
        <WindowSizeFilter.MMin>
          <View
            style={style(
              ~position=#absolute,
              ~top=-30.->dp,
              ~right=-20.->dp,
              ~opacity=0.06,
              ~transform=[rotate(~rotate=6.->deg)],
              (),
            )}>
            <SVGLogo width={240.->Style.dp} height={240.->Style.dp} fill=Consts.Colors.lightest />
          </View>
        </WindowSizeFilter.MMin>
        <div style={ReactDOM.Style.make(~width="5%", ~height="1px", ())} />
        <WindowSizeFilter.MMin style={ReactDOM.Style.make(~width="35%", ~height="1px", ())} />
        <View style={styles["content"]} accessibilityRole=#header>
          <Text
            style={array([
              Font.androidEm["headline3"],
              textStyle(~color=Theme.Default.colors.dark.text, ()),
              unsafeStyle({
                "filter": "url(#JumbotronCreativeDeveloperSVGFilter1)",
                // "animation": ".4s linear infinite JumbotronCreativeDeveloperSVGFilterAnimation",
              }),
            ])}>
            {"MoOx"->React.string}
          </Text>
          <Text style={styles["subtitle"]}> {"Maxime Thirouin"->React.string} </Text>
          <Spacer />
          <GradientLinearBackground
            angle={90.}
            stops=[
              {
                offset: 0.->pct,
                stopColor: "#fff",
                stopOpacity: "1",
              },
              {
                offset: 100.->pct,
                stopColor: "#fff",
                stopOpacity: "0",
              },
            ]
            style={viewStyle(~borderRadius=6., ())}>
            <SpacedView>
              <Text
                style={array([
                  Font.android["headline3"],
                  Font.weight["bold"],
                  unsafeStyle({
                    "filter": "drop-shadow(1px 1px 1px rgba(0,0,0,0.5)) drop-shadow(2px 6px 6px rgba(254,167,183,0.22))",
                    "backgroundClip": "text",
                    "WebkitTextFillColor": "transparent",
                    "backgroundImage": "linear-gradient(0deg, #792F93 0%, #000064 80%)",
                  }),
                ])}>
                {j`Front-End Developer`->React.string}
              </Text>
              <View style={array([Predefined.styles["row"], viewStyle(~alignItems=#center, ())])}>
                <Text style={array([Font.weight["200"]])}> {j`For `->React.string} </Text>
                <View style={viewStyle(~transform=[rotate(~rotate=-6.->deg)], ())}>
                  <Text
                    style={array([
                      Font.android["headline3"],
                      textStyle(~fontFamily="StoneHarbour", ~color="#fff", ())->unsafeAddStyle({
                        "filter": "drop-shadow(1px 1px 0px rgba(0,0,0,0.25)) drop-shadow(2px 6px 6px rgba(254,167,183,0.22))",
                        "backgroundClip": "text",
                        "WebkitTextFillColor": "transparent",
                        "backgroundImage": "linear-gradient(0deg, #F451C8 0%, #EACE5E 80%)",
                      }),
                    ])}>
                    {j`Creative People`->React.string}
                  </Text>
                </View>
              </View>
            </SpacedView>
          </GradientLinearBackground>
        </View>
      </View>
    </View>
  </>
}
