open ReactNative;
open ReactMultiversal;

let styles =
  Style.(StyleSheet.create({"button": style(~width=200.->dp, ())}));

[@react.component]
let make = (~posts) => {
  <AppWrapper>
    <BsReactHelmet>
      <title>
        {(Consts.title ++ ", React & React Native " ++ Consts.defaultTitle)
         ->React.string}
      </title>
    </BsReactHelmet>
    <HeaderSmall title="MoOx" />
    <LinkContactBubbleFixedBottom />
    <JumbotronApps scrollYAnimatedValue=AppWrapper.scrollYAnimatedValue />
    <BlocksAboutMySkills />
    <Container
      wrapperStyle=Style.(style(~backgroundColor=Consts.Colors.light, ()))>
      <Spacer size=L />
      <Center>
        <TitlePre> "THINGS I LIKE TO WORK WITH"->React.string </TitlePre>
      </Center>
      <Skills />
      <Center>
        <UnderlinedTextLink
          href="/resume/"
          style=Style.(
            style(~fontSize=14., ~fontWeight=`_200, ~color="#bbc", ())
          )>
          "And more"->React.string
        </UnderlinedTextLink>
      </Center>
      <Spacer size=L />
    </Container>
    <Container maxWidth={1600.->Style.dp}>
      <Spacer size=L />
      <Center>
        <TitlePre> "COMPANIES THAT TRUSTED ME"->React.string </TitlePre>
      </Center>
      <Row.Wrap.Center>
        <SVGCompanyKisioDigital
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill="#bbb"
        />
        <SVGCompanyMolotovTv
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill="#bbb"
        />
        <SVGCompanyAirbus
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill="#bbb"
        />
        <SVGCompanyViareport
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill="#bbb"
        />
        <SVGCompanyJirafe
          width={200.->Style.dp}
          height={200.->Style.dp}
          fill="#bbb"
        />
      </Row.Wrap.Center>
    </Container>
    <Spacer />
    <SpacedView
      vertical=L style=Style.(style(~backgroundColor=Consts.Colors.dark, ()))>
      <Center>
        <TitlePre> "Interested with my profile ?"->React.string </TitlePre>
        <Spacer size=L />
        <Row.Wrap.Center>
          <SpacedView horizontal=XS>
            <LinkButton
              href="/resume/"
              color=Consts.Colors.lightest
              color2=Consts.Colors.dark
              textSize=24.
              mode=Outlined
              style=styles##button>
              <Text> "Learn more"->React.string </Text>
              <Text style=Style.(style(~fontSize=12., ~fontWeight=`_300, ()))>
                "\nCheck out my resume"->React.string
              </Text>
            </LinkButton>
          </SpacedView>
          <SpacedView horizontal=XS>
            <LinkButton
              href="/contact/"
              color=Consts.Colors.lightest
              color2=Consts.Colors.dark
              textSize=24.
              style=styles##button>
              <Text> "Hire me"->React.string </Text>
              <Text style=Style.(style(~fontSize=12., ~fontWeight=`_300, ()))>
                "\nCheck out availabilities"->React.string
              </Text>
            </LinkButton>
          </SpacedView>
        </Row.Wrap.Center>
      </Center>
    </SpacedView>
    /*
     <Spacer size=L />
     <Text style=styles##nanoTitle>
       "Or you can "->React.string
       <UnderlinedTextLink href="/resume/">
         "learn more about my experiences"->React.string
       </UnderlinedTextLink>
     </Text>
     */
    <Container>
      <SpacedView vertical=L>
        <Center>
          <Title> "Latest Posts on the Blog"->React.string </Title>
        </Center>
        {switch ((posts: T.contentList)) {
         | Inactive
         | Loading => <LoadingIndicator />
         | Errored => <Error />
         | Idle(posts) =>
           <View>
             <PostList posts=posts##list />
             <Row.Center>
               <TextLink href="/blog/"> "More posts"->React.string </TextLink>
             </Row.Center>
           </View>
         }}
      </SpacedView>
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
