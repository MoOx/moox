open ReactNative;
open ReactMultiversal;

[@react.component]
let make =
    (
      ~title,
      ~animateBackgroundOpacity: StickyHeader.animateBackgroundOpacity=True,
      ~getInTouch=true,
    ) => {
  <WindowSizeFilter.SMax>
    <StickyHeader
      scrollYAnimatedValue=AppWrapper.scrollYAnimatedValue
      scrollOffsetY=100.
      title
      animateBackgroundOpacity
      color="#fff"
      color2={Predefined.Colors.Ios.light.blue}
      right={({color}) =>
        <>
          {getInTouch
             ? <ViewLink href="/contact/">
                 <Row.Center>
                   <Text
                     style=Style.(style(~color, ~paddingBottom=2.->dp, ()))>
                     "Get in touch"->React.string
                   </Text>
                   <SVGChevronRight fill=color width=19. height=19. />
                   <Spacer size=XXS />
                 </Row.Center>
               </ViewLink>
             : <a
                 href="/MaximeThirouin.vcf"
                 style={ReactDOMRe.Style.make(~textDecoration="none", ())}>
                 <Row.Center>
                   <Text
                     style=Style.(style(~color, ~paddingBottom=2.->dp, ()))>
                     "Save"->React.string
                   </Text>
                   <Spacer size=XXS />
                   <SVGContact fill=color width=19. height=19. />
                   <Spacer size=XXS />
                 </Row.Center>
               </a>}
        </>
      }
    />
  </WindowSizeFilter.SMax>;
};
