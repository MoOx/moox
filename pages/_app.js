import React from "react";
import App from "next/app";
import { init } from "@socialgouv/matomo-next";

import "../styles.css";

class MyApp extends App {
  componentDidMount() {
    init({
      url: "https://a.moox.fr",
      jsTrackerFile: "m.js",
      phpTrackerFile: "m",
      siteId: 3,
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
