open Belt;
open BsReactNative;

type state = {animation: Animated.Value.t};

type action =
  | AnimateIn
  | AnimateOut;

[@react.component]
let make = (~scrollYAnimatedValue=?, ~children, _) => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | AnimateIn =>
          Animated.(
            start(
              spring(
                ~value=state.animation,
                ~toValue=`raw(0.),
                ~useNativeDriver=true,
                (),
              ),
              (),
            )
          );
          state;
        | AnimateOut =>
          Animated.(
            start(
              spring(
                ~value=state.animation,
                ~toValue=`raw(200.),
                ~useNativeDriver=true,
                (),
              ),
              (),
            )
          );
          state;
        },
      {animation: Animated.Value.create(200.)},
    );
  React.useEffect0(() => {
    dispatch(AnimateIn);
    Some(() => dispatch(AnimateOut));
  });
  <div className="fixedBottom">
    <Animated.View
      style=Style.(
        style([
          alignItems(Center),
          // position(Absolute),
          // left(Pt(0.)),
          // right(Pt(0.)),
          // bottom(Pt(0.)),
          transform([
            translateY(
              Animated(
                scrollYAnimatedValue
                ->Option.map(scrollYAnimatedValue =>
                    Animated.Value.add(
                      state.animation,
                      Animated.Value.interpolate(
                        scrollYAnimatedValue,
                        ~inputRange=[(-200.), 1.],
                        ~outputRange=`float([(-200.), 1.]),
                        (),
                      ),
                    )
                  )
                ->Option.getWithDefault(state.animation->Obj.magic),
              ),
            ),
          ]),
        ])
      )>
      children
    </Animated.View>
  </div>;
};
