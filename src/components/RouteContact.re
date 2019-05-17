open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "subtitle":
        style(
          ~fontSize=28.,
          ~fontWeight=`_100,
          ~color=Consts.Colors.dark,
          (),
        ),
      "title":
        style(
          ~fontSize=42.,
          ~fontWeight=`bold,
          ~color=Consts.Colors.dark,
          (),
        ),
      "actions": style(~alignItems=`center, ()),
      "button": style(~width=250.->pt, ~alignItems=`flexStart, ()),
    })
  );

[@bs.val] external window: option(Dom.window) = "window";
let isClient = window->Belt.Option.isSome;

[@react.component]
let make = () => {
  <AppWrapper>
    <BsReactHelmet>
      <title> {("Contact - " ++ Consts.defaultTitle)->React.string} </title>
    </BsReactHelmet>
    <Container>
      <WindowSizeFilter.MMin> <Spacer /> </WindowSizeFilter.MMin>
      <SpacedView vertical=L>
        <Text style=styles##subtitle>
          "Awaiting your message"->React.string
        </Text>
        <Text style=styles##title> "Contact Maxime"->React.string </Text>
        <Spacer size=L />
        <Text style=Style.(style(~fontSize=16., ()))>
          "Want to get in touch with me?"->React.string
        </Text>
        <Spacer size=L />
        <View style=styles##actions>
          <Text
            style=Style.(
              style(~textAlign=`center, ~fontSize=24., ~lineHeight=36., ())
            )>
            "You got lucky.\nI am currently "->React.string
            <Text style=Style.(style(~fontWeight=`bold, ()))>
              "accepting new projects."->React.string
            </Text>
          </Text>
          <Spacer size=L />
          <SpacedView vertical=S>
            <ViewLink href={"mailto:" ++ (isClient ? "hello@moox.io" : "")}>
              <ButtonContained color="#2589FB" style=styles##button>
                <SVGEmail width=36. height=36. fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  "Email Me"->React.string
                  <Text
                    style=Style.(
                      style(
                        ~fontSize=12.,
                        ~lineHeight=12.,
                        ~fontWeight=`_300,
                        (),
                      )
                    )>
                    "\nhello @ moox.io"->React.string
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink href="tel:+33678135439">
              <ButtonContained color="#1FCE26" style=styles##button>
                <SVGPhone width=36. height=36. fill=Consts.Colors.light />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  "Call Me"->React.string
                  <Text
                    style=Style.(
                      style(
                        ~fontSize=12.,
                        ~lineHeight=12.,
                        ~fontWeight=`_300,
                        (),
                      )
                    )>
                    "\n+33 6 78 13 54 39"->React.string
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
          <SpacedView vertical=S>
            <ViewLink href="https://twitter.com/MoOx">
              <ButtonContained color="rgb(0, 112, 201)" style=styles##button>
                <SVGSocialTwitter
                  width=36.
                  height=36.
                  fill=Consts.Colors.light
                />
                <Spacer />
                <ButtonContained.Text textSize=24.>
                  "Message Me"->React.string
                  <Text
                    style=Style.(
                      style(
                        ~fontSize=12.,
                        ~lineHeight=12.,
                        ~fontWeight=`_300,
                        (),
                      )
                    )>
                    "\n@MoOx on Twitter"->React.string
                  </Text>
                </ButtonContained.Text>
              </ButtonContained>
            </ViewLink>
          </SpacedView>
        </View>
      </SpacedView>
      <Spacer size=XL />
      <WindowSizeFilter.MMin> <Spacer size=L /> </WindowSizeFilter.MMin>
    </Container>
  </AppWrapper>;
};

let default = make;
