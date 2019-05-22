module Style = {
  open ReactNative.Style;
  let unsafeAddProp: (t, string, string) => t =
    (style, property, value) => {
      Js.Obj.empty()
      ->Js.Obj.assign(style->Obj.magic)
      ->Js.Obj.assign(
          {
            let o = Js.Dict.empty();
            o->Js.Dict.set(property, value);
            o->Obj.magic;
          },
        )
      ->Obj.magic;
    };
};

module Transform = {
  open ReactNative.Transform;
  let unsafeTransform: (string, string) => t =
    (prop, value) => {
      let tf = Js.Dict.empty();
      tf->Js.Dict.set(prop, value);
      tf->Obj.magic;
    };
};
