open ReactNative;
open ReactMultiversal;

[@react.component]
let make = () => {
  <FixedBottom>
    <SpacedView style=Style.(style(~alignSelf=`flexEnd, ()))>
      <ViewLink href="/contact/">
        <ButtonContained
          round=true
          horizontalSpace=S
          verticalSpace=S
          color={Predefined.Colors.Ios.light.green}>
          <SVGSpeechBubble
            fill=Predefined.Colors.white
            width={24.->Style.dp}
            height={24.->Style.dp}
          />
        </ButtonContained>
      </ViewLink>
    </SpacedView>
    <WindowSizeFilter.SMax>
      <TabBarWrapper.Placeholder />
    </WindowSizeFilter.SMax>
  </FixedBottom>;
};
