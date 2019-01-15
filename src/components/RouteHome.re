open BsReactNative;

let styles =
  StyleSheet.create(
    Style.{
      "center": style([alignItems(Center), justifyContent(Center)]),
      "blahblah": style([alignItems(Center)]),
      "row":
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
    },
  );

let component = ReasonReact.statelessComponent("RouteHome");

let make = (~posts) => {
  ...component,
  render: _self =>
    <AppWrapper>
      <HomeJumbotron />
      <Container style=styles##center>
        <SpacedView horizontal=M vertical=M style=styles##blahblah>
          <View style=styles##row>
            <SpacedView vertical=M horizontal=XS style=styles##flex>
              <Text style=styles##textLight>
                {j|I build apps using React, JavaScript & ReasonML.|j}
                ->ReasonReact.string
              </Text>
            </SpacedView>
            <SpacedView vertical=M horizontal=XS>
              <ButtonSmallLink href="/contact/" color="rgb(0, 112, 201)">
                <Text> "Hire me"->R.string </Text>
              </ButtonSmallLink>
            </SpacedView>
          </View>
          <Spacer size=M />
          <Text style=styles##blahblahText>
            {j|Since I made my first website in 1995, I never stopped to learn things. I love to build useful UIs that offer the best UX possible. I like to produce durable things when working on products or long-running projects by focusing on maintainability, scalability and performance.
Over the years, I refined my way to approach development, mostly by cultivating my empathy.
Leading team to get started with latest & proven technologies is my jam. I like to teach people to work better on large codebase that must scale.|j}
            ->ReasonReact.string
          </Text>
        </SpacedView>
        <Spacer />
        <Text style=styles##nanoTitle>
          "THINGS I LIKE TO WORK WITH"->ReasonReact.string
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
          "And more"->ReasonReact.string
        </UnderlinedTextLink>
        <Spacer size=L />
      </Container>
      <Container maxWidth=1600.>
        <Spacer size=L />
        <Text style=styles##nanoTitle>
          "COMPANIES THAT TRUSTED ME"->ReasonReact.string
        </Text>
        <View style=styles##row>
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
          "Interested with my profile ?"->ReasonReact.string
        </Text>
        <Spacer size=L />
        <View style=styles##center>
          <ButtonLink href="/contact/">
            <Text> "Hire me"->R.string </Text>
          </ButtonLink>
          <Spacer size=L />
          <Text style=styles##nanoTitle>
            "Or you can "->R.string
            <UnderlinedTextLink href="/resume/">
              "learn more about my experiences"->R.string
            </UnderlinedTextLink>
          </Text>
        </View>
        <Spacer size=XL />
      </View>
      <Container style=styles##center>
        <Spacer size=XL />
        <Text style=styles##title>
          "Latest Posts on the blog"->ReasonReact.string
        </Text>
        {switch ((posts: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(posts) =>
           <View>
             <PostList posts=posts##list />
             <View style=styles##links>
               <TextLink href="/blog/">
                 "More posts"->ReasonReact.string
               </TextLink>
             </View>
           </View>
         }}
        <Spacer size=XL />
      </Container>
    </AppWrapper>,
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~posts=PhenomicPresetReactApp.jsEdge(jsProps##posts))
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
