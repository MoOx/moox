import React from "react";
import App from "next/app";
import { init } from "@socialgouv/matomo-next";

import "../styles.css";

if (typeof window === "undefined") {
  require("react-native").Dimensions.set({
    window: {
      width: 360,
      height: 640,
    },
    screen: {
      width: 360,
      height: 640,
    },
  });
}

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
