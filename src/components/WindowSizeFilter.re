module SMax = {
  let component = ReasonReact.statelessComponent("WindowSizeFilterSMax");

  let make = (~style=?, children) => {
    ...component,
    render: _self =>
      <ViewWeb className="WindowSizeFilterSMax" ?style> ...children </ViewWeb>,
  };
};

module MMin = {
  let component = ReasonReact.statelessComponent("WindowSizeFilterMMin");

  let make = (~style=?, children) => {
    ...component,
    render: _self =>
      <ViewWeb className="WindowSizeFilterMMin" ?style> ...children </ViewWeb>,
  };
};
