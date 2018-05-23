import "./rnw-art-fix.js";
import * as React from "react";
import { AppRegistry } from "react-native-web";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import { withPhenomicApi } from "@phenomic/preset-react-app/lib/es6/src/phenomicPresetReactApp.js";
import MatomoTracker from "matomo-tracker";

import * as RouteHome from "./lib/es6/src/components/RouteHome";
import * as RoutePost from "./lib/es6/src/components/RoutePost";
import * as RouteTalks from "./lib/es6/src/components/RouteTalks";
import * as RouteTalk from "./lib/es6/src/components/RouteTalk";
import RouteContact from "./lib/es6/src/components/RouteContact";

import "./defaults.css";
import "./highlights-theme.css";

let onUpdate = () => console.info("onUpdate", window.location.href);
if (process.env.NODE_ENV === "production") {
  const matomo = new MatomoTracker(3, "https://a.moox.fr/p", true);
  onUpdate = () => matomo.track(window.location.href);
}

const routes = () => (
  <Router history={browserHistory} onUpdate={onUpdate}>
    <Route
      path="/"
      component={withPhenomicApi(RouteHome.jsComponent, RouteHome.queries)}
    />
    <Route
      path="/after/:after"
      component={withPhenomicApi(RouteHome.jsComponent, RouteHome.queries)}
    />
    <Route
      path="/blog/*"
      component={withPhenomicApi(RoutePost.jsComponent, RoutePost.queries)}
    />
    <Route
      path="/talks"
      component={withPhenomicApi(RouteTalks.jsComponent, RouteTalks.queries)}
    />
    <Route
      path="/talks/after/:after"
      component={withPhenomicApi(RouteTalks.jsComponent, RouteTalks.queries)}
    />
    <Route
      path="/talk/*"
      component={withPhenomicApi(RouteTalk.jsComponent, RouteTalk.queries)}
    />
    <Route path="/contact/" component={RouteContact} />
  </Router>
);

const render = (rootComponent, rootTag) => {
  AppRegistry.registerComponent("App", () => () => rootComponent);
  AppRegistry.runApplication("App", { rootTag });
};

export default createApp(routes, render);

if (module.hot) {
  module.hot.accept(() => renderApp(routes, render));
}
