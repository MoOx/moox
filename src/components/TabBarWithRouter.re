open ReactMultiversal;

[@bs.module "./TabBarWithRouter"] [@react.component]
external make:
  (~links: array(Consts.menuLink), ~children: React.element=?) =>
  React.element =
  "default";
