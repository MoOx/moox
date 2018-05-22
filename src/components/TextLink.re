open BsReactNative;

module type TextLinkComponent = {
  let make:
    (
      ~href: string=?,
      ~accessible: bool=?,
      ~allowFontScaling: bool=?,
      ~ellipsizeMode: [ | `clip | `head | `middle | `tail]=?,
      ~numberOfLines: int=?,
      ~onLayout: MyRNEvent.NativeLayoutEvent.t => unit=?,
      ~onLongPress: unit => unit=?,
      ~onPress: unit => unit=?,
      ~pressRetentionOffset: MyTypesRN.insets=?,
      ~selectable: bool=?,
      ~style: Style.t=?,
      ~testID: string=?,
      ~selectionColor: string=?,
      ~textBreakStrategy: [ | `simple | `highQuality | `balanced]=?,
      ~adjustsFontSizeToFit: bool=?,
      ~minimumFontScale: float=?,
      ~suppressHighlighting: bool=?,
      ~value: string=?,
      array(ReasonReact.reactElement)
    ) =>
    ReasonReact.component(
      ReasonReact.stateless,
      ReasonReact.noRetainedProps,
      unit
    );
};

module CreateComponent = (Impl: View.Impl) : TextLinkComponent => {
  let make =
      (
        ~href=?,
        ~accessible=?,
        ~allowFontScaling=?,
        ~ellipsizeMode=?,
        ~numberOfLines=?,
        ~onLayout=?,
        ~onLongPress=?,
        ~onPress=?,
        ~pressRetentionOffset=?,
        ~selectable=?,
        ~style=?,
        ~testID=?,
        ~selectionColor=?,
        ~textBreakStrategy=?,
        ~adjustsFontSizeToFit=?,
        ~minimumFontScale=?,
        ~suppressHighlighting=?,
        ~value=?,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=Impl.view,
      ~props=
        Js.Undefined.(
          {
            "href": from_opt(href),
            "accessibilityRole": "link",
            "accessible": from_opt(MyUtilsRN.optBoolToOptJsBoolean(accessible)),
            "allowFontScaling":
              from_opt(MyUtilsRN.optBoolToOptJsBoolean(allowFontScaling)),
            "ellipsizeMode":
              from_opt(
                MyUtilsRN.option_map(
                  fun
                  | `head => "head"
                  | `middle => "middle"
                  | `tail => "tail"
                  | `clip => "clip",
                  ellipsizeMode
                )
              ),
            "numberOfLines": from_opt(numberOfLines),
            "onLayout": from_opt(onLayout),
            "onLongPress": from_opt(onLongPress),
            "onPress": from_opt(onPress),
            "pressRetentionOffset": from_opt(pressRetentionOffset),
            "selectable": from_opt(MyUtilsRN.optBoolToOptJsBoolean(selectable)),
            "style": from_opt(style),
            "testID": from_opt(testID),
            "selectionColor": from_opt(selectionColor),
            "textBreakStrategy":
              from_opt(
                MyUtilsRN.option_map(
                  fun
                  | `simple => "simple"
                  | `highQuality => "highQuality"
                  | `balanced => "balanced",
                  textBreakStrategy
                )
              ),
            "adjustsFontSizeToFit":
              from_opt(MyUtilsRN.optBoolToOptJsBoolean(adjustsFontSizeToFit)),
            "minimumFontScale": from_opt(minimumFontScale),
            "suppressHighlighting":
              from_opt(MyUtilsRN.optBoolToOptJsBoolean(suppressHighlighting))
          }
        ),
      switch value {
      | Some(string) =>
        Array.append([|ReasonReact.stringToElement(string)|], children)
      | None => children
      }
    );
};

include
  CreateComponent(
    {
      [@bs.module "react-native"]
      external view : ReasonReact.reactClass = "Text";
    }
  );
