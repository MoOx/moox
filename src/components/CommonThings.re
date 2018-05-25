let component = ReasonReact.statelessComponent("CommonThings");

/* [@bs.module] external coverBlur : string = "../../../cover.blur.js"; */
let make = (_) => {
  ...component,
  render: _self =>
    <Head>
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        _type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        _type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="manifest.json" />
      <meta name="theme-color" content="#0C0F1E" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <style>
        (
          "@-ms-viewport { width: device-width } @viewport { width: device-width }"
          |> R.string
        )
      </style>
      <style>
        (
          {j|
html {
  height: 100%;
  background: #FBFCF8;
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
  |j}
          |> R.string
        )
      </style>
    </Head>,
  /* <link rel="mask-icon" href="safari-pinned-tab.svg" color="#0C0F1E" /> */
};
