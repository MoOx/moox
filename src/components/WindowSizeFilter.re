open Belt;

module SMax = {
  [@react.component]
  let make = (~style=?, ~children=?, ()) => {
    <div className="WindowSizeFilterSMax" ?style>
      {children->Option.getWithDefault(React.null)}
    </div>;
  };
};

module MMin = {
  [@react.component]
  let make = (~style=?, ~children=?, ()) => {
    <div className="WindowSizeFilterMMin" ?style>
      {children->Option.getWithDefault(React.null)}
    </div>;
  };
};
