import { Linking } from "react-native";

import { handleEvent } from "@phenomic/plugin-renderer-react/lib/components/Link.js";

const BASENAME = process.env.PHENOMIC_APP_BASENAME || "/";

export const origin = (
  url, // jsdom can return "null" string...
) =>
  (url.origin !== "null" && url.origin) || // // IE does not correctly handle origin, maybe Edge does...
  url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : "");
const isSameOrigin = url =>
  origin(url) === origin(window.location) &&
  url.pathname.indexOf(BASENAME) > -1;

export const handlePress = (props, router) => event => {
  handleEvent(props, router)(event);
  // fix for outgoing links
  if (!event.preventDefaulted && !isSameOrigin(event.currentTarget)) {
    const href = event.currentTarget.href;
    Linking.canOpenURL(href).then(supported => {
      if (supported) {
        Linking.openURL(href);
      } else {
        alert("Ouppps. Impossible d'ouvrir le lien!");
      }
    });
  }
};

export const hrefify = href =>
  href.indexOf("://") > -1
    ? href
    : href.charAt(0) === "/"
    ? BASENAME + href.slice(1)
    : href;
