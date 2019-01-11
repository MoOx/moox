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
        ]),
      "textLight":
        style([
          fontSize(Float(28.)),
          color(String("#000F2B")),
          fontWeight(`_200),
        ]),
      "blahblahText":
        style([
          fontSize(Float(16.)),
          lineHeight(24.),
          color(String("#000F2B")),
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
          color(String("#000F2B")),
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
          <Spacer />
          <Text style=styles##textLight>
            {j|I build apps using React, JavaScript & Reason.  |j}
            ->ReasonReact.string
            <ButtonLink href="/contact/" color="rgb(0, 112, 201)">
              "Hire me"->R.string
            </ButtonLink>
          </Text>
          <Spacer size=L />
          <Text style=styles##blahblahText>
            {j|Since I made my first website in 1995, I never stopped to learn things. I love to build useful UIs that offer the best UX possible. I like to produce durable things when working on products or long-running projects by focusing on maintainability, scalability and performance.
Over the years, I refined my way to approach development, mostly by cultivating my empathy.
Leading team to get started with latest & proven technologies is my jam. I like to teach people to work better on large codebase that must scale.|j}
            ->ReasonReact.string
          </Text>
        </SpacedView>
        <Spacer />
        <Text style=styles##nanoTitle>
          {"THINGS I LIKE TO WORK WITH" |> R.string}
        </Text>
        <Skills />
        <Spacer size=L />
      </Container>
      <Container maxWidth=1600.>
        <Spacer size=L />
        <Text style=styles##nanoTitle>
          {"COMPANIES THAT TRUSTED ME" |> R.string}
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
          {"Interested with my profile ?" |> R.string}
        </Text>
        <Spacer size=L />
        <View style=styles##center>
          <ButtonLink href="/contact/"> "Hire me"->R.string </ButtonLink>
        </View>
        <Spacer size=XL />
      </View>
      <Container style=styles##center>
        <Spacer size=XL />
        <Text style=styles##title>
          {"Latest Posts on the blog" |> R.string}
        </Text>
        {switch ((posts: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(posts) =>
           <View>
             <PostList posts=posts##list />
             <View style=styles##links>
               <TextLink href="/blog/"> {"More posts" |> R.string} </TextLink>
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
