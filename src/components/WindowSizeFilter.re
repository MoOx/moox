module SMax = {
  let component = ReasonReact.statelessComponent("WindowSizeFilterSMax");

  [@react.component]
  let make = (~children, ()) => {
    <div className="WindowSizeFilterSMax"> children </div>;
  };
};

module MMin = {
  let component = ReasonReact.statelessComponent("WindowSizeFilterMMin");

  [@react.component]
  let make = (~children, ()) => {
    <div className="WindowSizeFilterMMin"> children </div>;
  };
};
