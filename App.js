import * as React from "react";
import { AppRegistry } from "react-native-web";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import { withPhenomicApi } from "@phenomic/preset-react-app/src/phenomicPresetReactApp.bs.js";
import MatomoTracker from "matomo-tracker";

import * as RouteHome from "./src/components/RouteHome.bs.js";
import * as RouteBlog from "./src/components/RouteBlog.bs.js";
import * as RoutePost from "./src/components/RoutePost.bs.js";
import * as RouteTalks from "./src/components/RouteTalks.bs.js";
import * as RouteTalk from "./src/components/RouteTalk.bs.js";
import RouteContact from "./src/components/RouteContact.bs.js";
import * as RouteError from "./src/components/RouteError.bs.js";

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
      path="/blog/"
      component={withPhenomicApi(RouteBlog.jsComponent, RouteBlog.queries)}
    />
    <Route
      path="/blog/after/:after"
      component={withPhenomicApi(RouteBlog.jsComponent, RouteBlog.queries)}
    />
    <Route
      path="/blog/*"
      component={withPhenomicApi(RoutePost.jsComponent, RoutePost.queries)}
    />
    <Route
      path="/talks/"
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
    <Route
      path="404.html"
      component={withPhenomicApi(RouteError.jsComponent, RouteError.queries)}
    />
    <Route
      path="*"
      component={withPhenomicApi(RouteError.jsComponent, RouteError.queries)}
    />
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

// it's that easy to have for initial loading ?
// will have to double check in prod (static)
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    require("@phenomic/plugin-renderer-react/lib/components/Link.hash.js").default(
      window.location.hash,
    );
  });
}
