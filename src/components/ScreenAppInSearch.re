open ReactNative;

[@react.component]
let make = () => {
  <SpacedView>
    <Title>
      <Text style=Style.(style(~color="#356FEF", ()))>
        "G"->React.string
      </Text>
      <Text style=Style.(style(~color="#E22C28", ()))>
        "o"->React.string
      </Text>
      <Text style=Style.(style(~color="#FBB10D", ()))>
        "g"->React.string
      </Text>
      <Text style=Style.(style(~color="#356FEF", ()))>
        "g"->React.string
      </Text>
      <Text style=Style.(style(~color="#2B9C40", ()))>
        "l"->React.string
      </Text>
      <Text style=Style.(style(~color="#E22C28", ()))>
        "e"->React.string
      </Text>
      <Text style=Style.(style(~color="#FBB10D", ()))>
        "s"->React.string
      </Text>
    </Title>
    <Spacer />
    <Row>
      <TextInput
        defaultValue="your product"
        style=Style.(
          style(
            ~borderRadius=10.,
            ~borderStyle=`solid,
            ~borderWidth=1.,
            ~borderColor=Consts.Colors.lightGrey,
            ~width=90.->pct,
            ~padding=(Spacer.space /. 2.)->pt,
            (),
          )
        )
      />
      <Spacer />
      <ViewLink href="/contact/">
        <ButtonContained round=true verticalSpace=XS color="#1F5EDC">
          <ButtonContained.Text> "GO"->React.string </ButtonContained.Text>
        </ButtonContained>
      </ViewLink>
    </Row>
    <Spacer />
    <Text
      style=Style.(
        style(
          ~fontSize=22.,
          ~color="#356FEF",
          ~textDecorationLine=`underline,
          (),
        )
      )>
      "Your website"->React.string
    </Text>
    <Text
      style=Style.(
        style(~fontSize=18., ~fontWeight=`_600, ~color="orange", ())
      )>
      {j|⭑⭑⭑⭑⭑|j}->React.string
    </Text>
    <Text
      style=Style.(style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ()))>
      "You need an awesome website that is fast & appear in search results? You got lucky, I can help."
      ->React.string
    </Text>
    <Spacer size=S />
    <Row>
      <Spacer />
      <View style=Style.(style(~flex=1., ()))>
        <Text
          style=Style.(
            style(
              ~fontSize=20.,
              ~color="#356FEF",
              ~textDecorationLine=`underline,
              (),
            )
          )>
          "Fast"->React.string
        </Text>
        <Spacer size=XS />
        <Text
          style=Style.(
            style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ())
          )>
          "I know how to build fast & beautiful webapps in all browsers."
          ->React.string
        </Text>
      </View>
      <Spacer size=S />
      <View style=Style.(style(~flex=1., ()))>
        <Text
          style=Style.(
            style(
              ~fontSize=20.,
              ~color="#356FEF",
              ~textDecorationLine=`underline,
              (),
            )
          )>
          "Beautiful"->React.string
        </Text>
        <Spacer size=XS />
        <Text
          style=Style.(
            style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ())
          )>
          "I can make your websites looking good without compromise."
          ->React.string
        </Text>
      </View>
    </Row>
    <Spacer />
    <Text
      style=Style.(
        style(
          ~fontSize=22.,
          ~color="#356FEF",
          ~textDecorationLine=`underline,
          (),
        )
      )>
      "Competitor website"->React.string
    </Text>
    <Text
      style=Style.(
        style(~fontSize=18., ~fontWeight=`_600, ~color="orange", ())
      )>
      {j|⭑|j}->React.string
      <Text style=Style.(style(~color=Consts.Colors.lightGrey, ()))>
        {j|⭑⭑⭑⭑|j}->React.string
      </Text>
    </Text>
    <Text
      style=Style.(style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ()))>
      "Search engines measures performances. That's a fact."->React.string
    </Text>
    <Spacer size=S />
    <Row>
      <Spacer />
      <View style=Style.(style(~flex=1., ()))>
        <Text
          style=Style.(
            style(
              ~fontSize=20.,
              ~color="#356FEF",
              ~textDecorationLine=`underline,
              (),
            )
          )>
          "SEO"->React.string
        </Text>
        <Spacer size=XS />
        <Text
          style=Style.(
            style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ())
          )>
          "Your sites & apps need to be fast, I know how to make it them fast."
          ->React.string
        </Text>
      </View>
      <Spacer size=S />
      <View style=Style.(style(~flex=1., ()))>
        <Text
          style=Style.(
            style(
              ~fontSize=20.,
              ~color="#356FEF",
              ~textDecorationLine=`underline,
              (),
            )
          )>
          "User experience"->React.string
        </Text>
        <Spacer size=XS />
        <Text
          style=Style.(
            style(~fontSize=14., ~fontWeight=`_300, ~color="#333", ())
          )>
          "It needs to be polished. I can handle that for you."->React.string
        </Text>
      </View>
    </Row>
    <Spacer size=L />
    <TitlePre> "You are looking for something"->React.string </TitlePre>
    <Title> "Here is a joke for you"->React.string </Title>
    <Spacer />
    <Text
      style=Style.(
        style(
          ~fontSize=14.,
          ~lineHeight=14. *. 1.5,
          ~fontWeight=`_300,
          ~color="#333",
          (),
        )
      )>
      {j|An engineer walks into a CSS codebase, he asks "can you make this button green?"
Codebase replies: "Can you be more specific?"
Engineer: but it's kind of !important"|j}
      ->React.string
    </Text>
  </SpacedView>;
};
