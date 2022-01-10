@react.component
let make = () => {
  <Next.Head>
    <meta charSet="utf-8" />
    /* analytics */
    <link rel="dns-prefetch" href="https://a.moox.fr" />
    <link rel="preconnect" href="https://a.moox.fr" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type_="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type_="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    /* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000f2b" /> */
    <meta name="msapplication-TileColor" content="#01093C" />
    <meta name="theme-color" content="#01093C" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style
      dangerouslySetInnerHTML={
        "__html": `@-ms-viewport { width: device-width } @viewport { width: device-width }`,
      }
    />
    <style
      dangerouslySetInnerHTML={
        "__html": `
@font-face {
  font-family: 'StoneHarbour';
  src: url('/fonts/stoneharbour-webfont.woff2') format('woff2'),
        url('/fonts/stoneharbour-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'StoneHarbourWash';
  src: url('/fonts/stoneharbourswash-webfont.woff2') format('woff2'),
        url('/fonts/stoneharbourswash-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Phosphate';
  src: url('/fonts/phosphateinline-webfont.woff2') format('woff2'),
        url('/fonts/phosphateinline-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

html {
  width: 100%;
  height: 100%;
  overflow-x:hidden;
  background: #fff;
}
body {
  display: flex;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

#__next {
  display: flex;
  flex-grow: 1;
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

@media (min-width: 500px) { .WindowSizeFilterSMax { display: none } }
@media (max-width: 501px) { .WindowSizeFilterMMin { display: none } }

.FixedBottom {
  pointer-events: none;
  z-index: 1000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.FixedBottom * {
  pointer-events: all;
}
`,
      }
    />
  </Next.Head>
}
