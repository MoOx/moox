import * as React from "react";
import Head from "react-helmet";
import { StyleSheet } from "react-native";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  // if needed, you can know if you are in development or in static rendering
  // const isDev = process.env.PHENOMIC_ENV === "development"
  const { Main, State, Script, Style } = render(<App />);
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="utf-8" />
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        {helmet.base.toComponent()}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="manifest.json" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#0C0F1E" />
        <meta name="theme-color" content="#0C0F1E" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <style>
          {
            "@-ms-viewport { width: device-width } @viewport { width: device-width }"
          }
        </style>
        <Style />
        {StyleSheet.getStyleSheets().map(({ id, textContent }) => (
          <style
            key={id}
            id={id}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        ))}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};
