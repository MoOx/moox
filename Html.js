// @flow

import * as React from "react";
import { Helmet } from "react-helmet";
import { AppRegistry } from "react-native-web";

const Html = ({ App, render }: PhenomicHtmlPropsType) => {
  AppRegistry.registerComponent("App", () => App);
  const app = AppRegistry.getApplication("App");
  const { Main, State, Script, Style } = render(app.element);
  const head = Helmet.renderStatic();
  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        {head.meta.toComponent()}
        {head.title.toComponent()}
        {head.base.toComponent()}
        {app.getStyleElement()}
        <Style />
        {head.link.toComponent()}
        {head.style.toComponent()}
        {head.script.toComponent()}
        {head.noscript.toComponent()}
      </head>
      <body {...head.bodyAttributes.toComponent()}>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};

export default Html;
