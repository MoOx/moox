open ReactNative
open ReactMultiversal

@react.component
let make = (
  ~title,
  ~animateBackgroundOpacity: StickyHeader.animateBackgroundOpacity=True,
  ~getInTouch=true,
) =>
  <WindowSizeFilter.SMax>
    <StickyHeader
      backgroundElement={<StickyHeaderBackground
        backdropFilter="saturate(200%) brightness(150%) grayscale(20%) blur(20px)"
        style={
          open Style
          style(
            ~position=#absolute,
            ~top=0.->dp,
            ~left=0.->dp,
            ~bottom=0.->dp,
            ~right=0.->dp,
            ~backgroundColor="rgba(255,255,255,0.8)",
            (),
          )
        }
      />}
      scrollYAnimatedValue=AppWrapper.scrollYAnimatedValue
      scrollOffsetY=100.
      title
      animateBackgroundOpacity
      color="#fff"
      color2=Predefined.Colors.Ios.light.blue
      right={({color}) => <>
        {getInTouch
          ? <ViewLink href="/contact">
              <Row.Center>
                <Text
                  style={
                    open Style
                    style(~color, ~paddingBottom=2.->dp, ())
                  }>
                  {"Get in touch"->React.string}
                </Text>
                <SVGChevronRight fill=color width={19.->Style.dp} height={19.->Style.dp} />
              </Row.Center>
            </ViewLink>
          : <a href="/MaximeThirouin.vcf" style={ReactDOM.Style.make(~textDecoration="none", ())}>
              <Row.Center>
                <Text
                  style={
                    open Style
                    style(~color, ~paddingBottom=2.->dp, ())
                  }>
                  {"Save"->React.string}
                </Text>
                <Spacer size=XXS />
                <SVGContact fill=color width={19.->Style.dp} height={19.->Style.dp} />
              </Row.Center>
            </a>}
      </>}
    />
  </WindowSizeFilter.SMax>
