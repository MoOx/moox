@react.component
let make = (~color, ~color2, ~children, ()) =>
  <div
    style={ReactDOM.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~flex="1 1 auto",
      ~borderRadius="6px",
      ~background="linear-gradient(0.45turn, " ++ (color ++ (" 10%, " ++ (color2 ++ " 110%)"))),
      ~overflow="hidden",
      (),
    )}>
    children
  </div>
