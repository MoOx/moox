open ReactMultiversal;

[@bs.module "./TabBarWithRouter"] [@react.component]
external make:
  (~links: array(TabBar.link), ~children: React.element=?) => React.element =
  "default";
