open BsReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "center": style([alignItems(Center), justifyContent(Center)]),
      "blahblah":
        style([flex(1.), alignItems(Center), flexBasis(Pt(240.))]),
      "row":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
        ]),
      "rowCentered":
        style([
          flexDirection(Row),
          flexWrap(Wrap),
          justifyContent(Center),
          alignItems(Center),
        ]),
      "flex": style([flexShrink(1.)]),
      "textLight":
        style([
          fontSize(Float(28.)),
          color(String(Consts.Colors.dark)),
          fontWeight(`_200),
        ]),
      "blahblahText":
        style([
          fontSize(Float(16.)),
          lineHeight(24.),
          color(String(Consts.Colors.dark)),
        ]),
      "nanoTitle":
        style([
          fontSize(Float(14.)),
          fontWeight(`_600),
          textAlign(Center),
          color(String("#bbc")),
        ]),
      "title":
        style([
          fontSize(Float(28.)),
          fontWeight(`Bold),
          textAlign(Center),
          marginVertical(Pt(20.)),
          color(String(Consts.Colors.dark)),
        ]),
      "links":
        style([
          flexDirection(Row),
          justifyContent(Center),
          alignItems(Center),
        ]),
      "button": style([width(Pt(200.))]),
    })
  );

[@react.component]
let make = (~posts) => {
  <AppWrapper>
    <HomeJumbotron />
    <Container style=styles##center maxWidth=1200.>
      <View style=styles##row>
        <SpacedView horizontal=M vertical=M style=styles##blahblah>
          <SpacedView vertical=M horizontal=XS style=styles##rowCentered>
            <SVGDevices fill="#bbb" width=32. height=32. />
            <Spacer size=S />
            <Text style=styles##textLight>
              {j|Software Architect.|j}->React.string
            </Text>
          </SpacedView>
          <Spacer size=M />
          <Text style=styles##blahblahText>
            {j|Since I made my first website in 1998, I never stopped to learn things. Over the years, I refined my way to approach development, which allows me to confidently takes high-level design choices when building web & mobile apps, and selecting tools adapted to your needs.|j}
            ->React.string
          </Text>
        </SpacedView>
        <SpacedView horizontal=M vertical=M style=styles##blahblah>
          <SpacedView vertical=M horizontal=XS style=styles##rowCentered>
            <SVGReact fill="#bbb" width=32. height=32. />
            <Spacer size=S />
            <Text style=styles##textLight>
              {j|React Developer.|j}->React.string
            </Text>
          </SpacedView>
          <Spacer size=M />
          <Text style=styles##blahblahText>
            {j|I think React is currently the best tool available to to produce durable things when working on products or long-running projects.
React & React Native allows me to focus on feature with scalability and performance in mind.|j}
            ->React.string
          </Text>
        </SpacedView>
        <SpacedView horizontal=M vertical=M style=styles##blahblah>
          <SpacedView vertical=M horizontal=XS style=styles##rowCentered>
            <SVGMenuTalk fill="#bbb" width=32. height=32. />
            <Spacer size=S />
            <Text style=styles##textLight>
              {j|Expert, Leader, Trainer.|j}->React.string
            </Text>
          </SpacedView>
          <Spacer size=M />
          <Text style=styles##blahblahText>
            {j|I can provide consultancy to companies of all sizes all around the world. From leading team to get started with latest & proven technologies, to teaching people to work better on large codebase at scale, I can probably help you & your team.|j}
            ->React.string
          </Text>
        </SpacedView>
      </View>
      <View style=styles##rowCentered>
        <SpacedView vertical=M horizontal=XS>
          <LinkButton
            href="/resume/"
            color="rgb(0, 112, 201)"
            textSize=24.
            style=styles##button>
            <Text> "Learn more"->React.string </Text>
            <Text
              style=Style.(
                style([fontSize(Float(12.)), fontWeight(`_300)])
              )>
              "\nabout my experiences"->React.string
            </Text>
          </LinkButton>
        </SpacedView>
        <SpacedView vertical=M horizontal=M>
          <Text style=styles##nanoTitle> "or"->React.string </Text>
        </SpacedView>
        <SpacedView vertical=M horizontal=XS>
          <LinkButton
            href="/contact/"
            color="rgb(0, 112, 201)"
            mode=Outlined
            textSize=24.
            style=styles##button>
            <Text> "Hire me"->React.string </Text>
            <Text
              style=Style.(
                style([fontSize(Float(12.)), fontWeight(`_300)])
              )>
              "\nI am available!"->React.string
            </Text>
          </LinkButton>
        </SpacedView>
      </View>
      <Spacer />
    </Container>
    <Container style=styles##center>
      <Text style=styles##nanoTitle>
        "THINGS I LIKE TO WORK WITH"->React.string
      </Text>
      <Skills />
      <UnderlinedTextLink
        href="/resume/"
        style=Style.(
          style([
            fontSize(Float(14.)),
            fontWeight(`_200),
            textAlign(Center),
            color(String("#bbc")),
          ])
        )>
        "And more"->React.string
      </UnderlinedTextLink>
      <Spacer size=L />
    </Container>
    <Container maxWidth=1600.>
      <Spacer size=L />
      <Text style=styles##nanoTitle>
        "COMPANIES THAT TRUSTED ME"->React.string
      </Text>
      <View style=styles##rowCentered>
        <SVGCompanyKisioDigital width=200. height=200. fill="#bbb" />
        <SVGCompanyMolotovTv width=200. height=200. fill="#bbb" />
        <SVGCompanyAirbus width=200. height=200. fill="#bbb" />
        <SVGCompanyViareport width=200. height=200. fill="#bbb" />
        <SVGCompanyJirafe width=200. height=200. fill="#bbb" />
      </View>
    </Container>
    <Spacer size=L />
    <View style=styles##center>
      <Text style=styles##nanoTitle>
        "Interested with my profile ?"->React.string
      </Text>
      <Spacer size=L />
      <View style=styles##center>
        <View style=styles##rowCentered>
          <SpacedView vertical=M horizontal=XS>
            <LinkButton
              href="/resume/"
              color=Consts.Colors.lightest
              color2=Consts.Colors.dark
              textSize=24.
              mode=Outlined
              style=styles##button>
              <Text> "Learn more"->React.string </Text>
              <Text
                style=Style.(
                  style([fontSize(Float(12.)), fontWeight(`_300)])
                )>
                "\nCheck out my resume"->React.string
              </Text>
            </LinkButton>
          </SpacedView>
          <SpacedView vertical=M horizontal=XS>
            <LinkButton
              href="/contact/"
              color=Consts.Colors.lightest
              color2=Consts.Colors.dark
              textSize=24.
              style=styles##button>
              <Text> "Hire me"->React.string </Text>
              <Text
                style=Style.(
                  style([fontSize(Float(12.)), fontWeight(`_300)])
                )>
                "\nI am available!"->React.string
              </Text>
            </LinkButton>
          </SpacedView>
        </View>
      </View>
      /*
       <Spacer size=L />
       <Text style=styles##nanoTitle>
         "Or you can "->React.string
         <UnderlinedTextLink href="/resume/">
           "learn more about my experiences"->React.string
         </UnderlinedTextLink>
       </Text>
       */
      <Spacer size=XL />
    </View>
    <Container style=styles##center>
      <Spacer size=XL />
      <Text style=styles##title>
        "Latest Posts on the blog"->React.string
      </Text>
      {switch ((posts: T.contentList)) {
       | Inactive
       | Loading => <LoadingIndicator />
       | Errored => <Error />
       | Idle(posts) =>
         <View>
           <PostList posts=posts##list />
           <View style=styles##links>
             <TextLink href="/blog/"> "More posts"->React.string </TextLink>
           </View>
         </View>
       }}
      <Spacer size=XL />
    </Container>
  </AppWrapper>;
};

[@react.component]
let jsComponent = (~posts) =>
  React.createElementVariadic(
    make,
    makeProps(~posts=PhenomicPresetReactApp.jsEdge(posts), ()),
    [|React.null|],
  );

let queries = _ => {
  let posts =
    PhenomicPresetReactApp.query(
      PaginatedList({
        path: "content/blog",
        by: Some("default"),
        value: None,
        order: None,
        sort: None,
        limit: Some(5),
        after: None,
      }),
    );
  {"posts": posts};
};
