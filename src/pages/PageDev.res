open Belt
open ReactNative
open ReactNative.Style
open ReactMultiversal

module Malformed = {
  type t = {
    id: string,
    message: string,
  }
}
type props = {
  posts: array<BlogFrontend.t>,
  malformed: array<Malformed.t>,
}
type params = unit

let styles = {
  "button": style(~width=200.->dp, ()),
  "logoStyle": Style.unsafeStyle({"filter": "grayscale(100%) contrast(25%) brightness(150%)"}),
}->StyleSheet.create

@react.component
let make = (~posts: array<BlogFrontend.t>, ~malformed: array<Malformed.t>) => {
  let theme = T.useTheme()
  malformed->Array.map(Js.Console.error)->ignore
  <AppWrapper>
    <Next.Head>
      <title>
        {(Consts.title ++ (", React & React Native " ++ Consts.defaultTitle))->React.string}
      </title>
    </Next.Head>
    <HeaderSmall title="MoOx" />
    <LinkContactBubbleFixedBottom />
    <View style={theme.styles["back"]}>
      <JumbotronApps scrollYAnimatedValue=AppWrapper.scrollYAnimatedValue />
      <BlocksAboutMySkills />
      <Container wrapperStyle={theme.styles["backDark"]}>
        <Spacer size=L />
        <Container maxWidth={1600.->Style.dp}>
          <Spacer size=L />
          <Center>
            <TitlePre> {"COMPANIES THAT TRIED TO HIRE ME"->React.string} </TitlePre>
          </Center>
          <Row.Wrap.Center>
            <SVGCompanyFacebook
              width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
            />
            <SVGCompanyTwitter
              width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
            />
            <SVGCompanyMicrosoft
              width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
            />
            <SVGCompanyGoogle
              width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
            />
          </Row.Wrap.Center>
        </Container>
        <Spacer size=L />
        <Center> <TitlePre> {"THINGS I LIKE TO WORK WITH"->React.string} </TitlePre> </Center>
        <Skills />
        <Center>
          <UnderlinedTextLink
            href="/resume/" style={style(~fontSize=14., ~fontWeight=#_200, ~color="#bbc", ())}>
            {"And more"->React.string}
          </UnderlinedTextLink>
        </Center>
        <Spacer size=L />
      </Container>
      <Container maxWidth={1600.->Style.dp}>
        <Spacer size=L />
        <Center>
          <TitlePre> {`🇫🇷 FRENCH COMPANIES THAT TRUSTED ME`->React.string} </TitlePre>
        </Center>
        <Row.Wrap.Center>
          <SVGCompanyMolotovTv
            width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
          />
          <SVGCompanyAlltricks
            width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
          />
          <SVGCompanyKisioDigital
            width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
          />
          <SVGCompanyAirbus
            width={200.->Style.dp} height={200.->Style.dp} style={styles["logoStyle"]}
          />
        </Row.Wrap.Center>
      </Container>
      <Spacer />
      <SpacedView vertical=L style={style(~backgroundColor=Consts.Colors.dark, ())}>
        <Center>
          <TitlePre> {"Interested with my profile ?"->React.string} </TitlePre>
          <Spacer size=L />
          <Row.Wrap.Center>
            <SpacedView horizontal=XS>
              <LinkButton
                href="/resume/"
                color=Consts.Colors.lightest
                color2=Consts.Colors.dark
                textSize=24.
                mode=Outlined
                style={styles["button"]}>
                <Text> {"Learn more"->React.string} </Text>
                <Text style={style(~fontSize=12., ~fontWeight=#_300, ())}>
                  {"\nCheck out my resume"->React.string}
                </Text>
              </LinkButton>
            </SpacedView>
            <SpacedView horizontal=XS>
              <LinkButton
                href="/contact/"
                color=Consts.Colors.lightest
                color2=Consts.Colors.dark
                textSize=24.
                style={styles["button"]}>
                <Text> {"Hire me"->React.string} </Text>
                <Text style={style(~fontSize=12., ~fontWeight=#_300, ())}>
                  {"\nCheck out availabilities"->React.string}
                </Text>
              </LinkButton>
            </SpacedView>
          </Row.Wrap.Center>
        </Center>
      </SpacedView>
      <Container>
        <SpacedView vertical=L>
          <Center>
            <Text style={array([Font.iosEm["title1"], theme.styles["text"]])}>
              {"Latest Posts on the Blog"->React.string}
            </Text>
          </Center>
          <View>
            <Spacer />
            <PostList posts />
            <Spacer />
            <Row.Center>
              <TextLink href="/blog/" style={array([Font.iosEm["caption"], theme.styles["text"]])}>
                {"More posts"->React.string}
              </TextLink>
            </Row.Center>
          </View>
        </SpacedView>
      </Container>
    </View>
  </AppWrapper>
}

let default = (props: props) => make(makeProps(~posts=props.posts, ~malformed=props.malformed, ()))

let getStaticProps: Next.Page.GetStaticProps.t<props, params> = _ctx => {
  let (posts, malformed) = BackendApi.getAll(#blog)->Array.reduce(([], []), (acc, postData) => {
    let (posts, malformed) = acc
    let decoded = postData.json->BlogFrontend.decode(postData.slug, _)
    switch decoded {
    | Error(message) => (
        posts,
        malformed->Array.concat([{Malformed.id: postData.slug, message: message}]),
      )
    | Ok(post) =>
      posts->Js.Array2.push(post)->ignore
      (posts, malformed)
    }
  })

  Js.Promise.resolve({
    "props": {
      posts: posts->BlogFrontend.orderByDate->Array.slice(~len=5, ~offset=0),
      malformed: malformed,
    },
  })
}
