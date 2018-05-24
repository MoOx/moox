type touchResponderHandlers = {
  onMoveShouldSetResponder: option(MyRNEvent.NativeEvent.t => bool),
  onMoveShouldSetResponderCapture: option(MyRNEvent.NativeEvent.t => bool),
  onResponderGrant: option(MyRNEvent.NativeEvent.t => unit),
  onResponderMove: option(MyRNEvent.NativeEvent.t => unit),
  onResponderReject: option(MyRNEvent.NativeEvent.t => unit),
  onResponderRelease: option(MyRNEvent.NativeEvent.t => unit),
  onResponderTerminate: option(MyRNEvent.NativeEvent.t => unit),
  onResponderTerminationRequest: option(MyRNEvent.NativeEvent.t => unit),
  onStartShouldSetResponder: option(MyRNEvent.NativeEvent.t => bool),
  onStartShouldSetResponderCapture: option(MyRNEvent.NativeEvent.t => bool)
};

let serialize = (handlers: option(touchResponderHandlers)) =>
  switch handlers {
  | None => Js.Obj.empty()
  | Some(handlers) =>
    Js.Undefined.(
      {
        "onMoveShouldSetResponder":
          fromOption(
            MyUtilsRN.option_map(
              (g, x) => Js.Boolean.to_js_boolean(g(x)),
              handlers.onMoveShouldSetResponder
            )
          ),
        "onMoveShouldSetResponderCapture":
          fromOption(
            MyUtilsRN.option_map(
              (g, x) => Js.Boolean.to_js_boolean(g(x)),
              handlers.onMoveShouldSetResponderCapture
            )
          ),
        "onResponderGrant": fromOption(handlers.onResponderGrant),
        "onResponderMove": fromOption(handlers.onResponderMove),
        "onResponderReject": fromOption(handlers.onResponderReject),
        "onResponderRelease": fromOption(handlers.onResponderRelease),
        "onResponderTerminate": fromOption(handlers.onResponderTerminate),
        "onResponderTerminationRequest":
          fromOption(handlers.onResponderTerminationRequest),
        "onStartShouldSetResponder":
          fromOption(
            MyUtilsRN.option_map(
              (g, x) => Js.Boolean.to_js_boolean(g(x)),
              handlers.onStartShouldSetResponder
            )
          ),
        "onStartShouldSetResponderCapture":
          fromOption(
            MyUtilsRN.option_map(
              (g, x) => Js.Boolean.to_js_boolean(g(x)),
              handlers.onStartShouldSetResponderCapture
            )
          )
      }
    )
  };

let extendView =
    (
      ~accessibilityLabel=?,
      ~accessible=?,
      ~hitSlop=?,
      ~onAccessibilityTap=?,
      ~onLayout=?,
      ~onMagicTap=?,
      ~responderHandlers=?,
      ~pointerEvents=?,
      ~removeClippedSubviews=?,
      ~style=?,
      ~testID=?,
      ~accessibilityComponentType=?,
      ~accessibilityLiveRegion=?,
      ~collapsable=?,
      ~importantForAccessibility=?,
      ~needsOffscreenAlphaCompositing=?,
      ~renderToHardwareTextureAndroid=?,
      ~accessibilityTraits=?,
      ~accessibilityViewIsModal=?,
      ~shouldRasterizeIOS=?,
      moreProps
    ) =>
  MyUtilsRN.objAssign2(
    Js.Undefined.(
      {
        "accessibilityLabel": fromOption(accessibilityLabel),
        "accessible": fromOption(MyUtilsRN.optBoolToOptJsBoolean(accessible)),
        "hitSlop": fromOption(hitSlop),
        "onAccessibilityTap": fromOption(onAccessibilityTap),
        "onLayout": fromOption(onLayout),
        "onMagicTap": fromOption(onMagicTap),
        "removeClippedSubviews":
          fromOption(MyUtilsRN.optBoolToOptJsBoolean(removeClippedSubviews)),
        "pointerEvents":
          fromOption(
            MyUtilsRN.option_map(
              x =>
                switch x {
                | `auto => "auto"
                | `none => "none"
                | `boxNone => "box-none"
                | `boxOnly => "box-only"
                },
              pointerEvents
            )
          ),
        "style": fromOption(style),
        "testID": fromOption(testID),
        "accessibilityComponentType":
          fromOption(
            MyUtilsRN.option_map(
              x =>
                switch x {
                | `none => "none"
                | `button => "button"
                | `radiobutton_checked => "radiobutton_checked-none"
                | `radiobutton_unchecked => "radiobutton_unchecked"
                },
              accessibilityComponentType
            )
          ),
        "accessibilityLiveRegion":
          fromOption(
            MyUtilsRN.option_map(
              x =>
                switch x {
                | `polite => "polite"
                | `none => "none"
                | `assertive => "assertive"
                },
              accessibilityLiveRegion
            )
          ),
        "collapsable": fromOption(MyUtilsRN.optBoolToOptJsBoolean(collapsable)),
        "importantForAccessibility":
          fromOption(
            MyUtilsRN.option_map(
              prop =>
                switch prop {
                | `auto => "auto"
                | `yes => "yes"
                | `no => "no"
                | `noHideDescendants => "noHideDescendants"
                },
              importantForAccessibility
            )
          ),
        "needsOffscreenAlphaCompositing":
          fromOption(
            MyUtilsRN.optBoolToOptJsBoolean(needsOffscreenAlphaCompositing)
          ),
        "renderToHardwareTextureAndroid":
          fromOption(
            MyUtilsRN.optBoolToOptJsBoolean(renderToHardwareTextureAndroid)
          ),
        "accessibilityTraits":
          fromOption(
            MyUtilsRN.option_map(
              traits => {
                let to_string =
                  fun
                  | `none => "none"
                  | `button => "button"
                  | `link => "link"
                  | `header => "header"
                  | `search => "search"
                  | `image => "image"
                  | `selected => "selected"
                  | `plays => "plays"
                  | `key => "key"
                  | `text => "text"
                  | `summary => "summary"
                  | `disabled => "disabled"
                  | `frequentUpdates => "frequentUpdates"
                  | `startsMedia => "startsMedia"
                  | `adjustable => "adjustable"
                  | `allowsDirectInteraction => "allowsDirectInteraction"
                  | `pageTurn => "pageTurn";
                traits |> List.map(to_string) |> Array.of_list;
              },
              accessibilityTraits
            )
          ),
        "accessibilityViewIsModal":
          fromOption(MyUtilsRN.optBoolToOptJsBoolean(accessibilityViewIsModal)),
        "shouldRasterizeIOS":
          fromOption(MyUtilsRN.optBoolToOptJsBoolean(shouldRasterizeIOS))
      }
    ),
    moreProps,
    serialize(responderHandlers)
  );
