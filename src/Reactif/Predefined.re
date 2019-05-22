open ReactNative;

// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
module Colors = {
  open Style;
  let black = "#000";
  let dark = "rgb(51, 51, 51)";
  let white = "#fff";
  let grey = "#909192";
  // let grey2 = "rgb(89, 89, 89)";
  // let grey3 = "rgb(102, 102, 102)";
  let lightGrey = "rgb(242, 242, 242)";
  // let lightGrey2 = "#DADADA";
  let red = "rgb(255, 59, 48)";
  let orange = "rgb(255, 149, 0)";
  let yellow = "rgb(255, 204, 0)";
  let green = "rgb(76, 217, 100)";
  let tealBlue = "rgb(90, 200, 250)";
  let blue = "rgb(0, 122, 255)";
  let purple = "rgb(88, 86, 214)";
  let pink = "rgb(255, 45, 85)";
};

let styles =
  Style.(
    StyleSheet.create({
      "center": style(~alignItems=`center, ~justifyContent=`center, ()),
      "col": style(~flexDirection=`column, ()),
      "colCenter":
        style(
          ~flexDirection=`column,
          ~justifyContent=`center,
          ~alignItems=`center,
          (),
        ),
      "colSpaceBetween":
        style(
          ~flexDirection=`column,
          ~justifyContent=`spaceBetween,
          ~alignItems=`center,
          (),
        ),
      "row": style(~flexDirection=`row, ()),
      "rowCenter":
        style(
          ~flexDirection=`row,
          ~justifyContent=`center,
          ~alignItems=`center,
          (),
        ),
      "rowSpaceBetween":
        style(
          ~flexDirection=`row,
          ~justifyContent=`spaceBetween,
          ~alignItems=`center,
          (),
        ),
      "rowWrap": style(~flexDirection=`row, ~flexWrap=`wrap, ()),
      "rowWrapCenter":
        style(
          ~flexDirection=`row,
          ~flexWrap=`wrap,
          ~justifyContent=`center,
          ~alignItems=`center,
          (),
        ),
      "rowWrapSpaceBetween":
        style(
          ~flexDirection=`row,
          ~flexWrap=`wrap,
          ~justifyContent=`spaceBetween,
          ~alignItems=`center,
          (),
        ),
    })
  );
