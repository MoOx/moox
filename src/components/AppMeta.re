let component = ReasonReact.statelessComponent("AppMeta");

/* [@bs.module] external coverBlur : string = "../../../cover.blur.js"; */
let make = _ => {
  ...component,
  render: _self =>
    <BsReactHelmet defaultTitle=Consts.defaultTitle>
      <html lang="en" dir="ltr" />
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type_="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type_="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="manifest.json" />
      <meta name="theme-color" content="#0C0F1E" />
      /* <link rel="mask-icon" href="safari-pinned-tab.svg" color="#0C0F1E" /> */
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <style>
        {j|@-ms-viewport { width: device-width } @viewport { width: device-width }|j}
        ->ReasonReact.string
      </style>
      <style>
        {j|
html {
  height: 100%;
  background: #000F2B;
}
body {
  min-height:100%;
}

@supports(padding: max(0px)) {
  body {
    /* https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    /* padding-left: max(12px, env(safe-area-inset-left)); */
    /* padding-right: max(12px, env(safe-area-inset-right)); */
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.menu-backdrop {
  background-color: rgba(253, 255, 255, .98);
}
@supports ((-webkit-backdrop-filter: blur(14px)) or (backdrop-filter: blur(14px))) {
  .menu-backdrop {
    background-color: rgba(245, 245, 245, .75);
    -webkit-backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
    backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
  }
}

@media (min-width: 500px) { .WindowSizeFilterSMax { display: none } }
@media (max-width: 501px) { .WindowSizeFilterMMin { display: none } }
  |j}
        ->ReasonReact.string
      </style>
    </BsReactHelmet>,
};
