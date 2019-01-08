import * as React from "react";
import PropTypes from "prop-types";

import AppMenu from "./AppMenu.bs.js";

function AppMenuWithRouter(props, context) {
  return (
    <AppMenu
      currentLocation={(context.router || {}).location || { pathname: "" }}
    />
  );
}

AppMenuWithRouter.contextTypes = {
  router: PropTypes.object.isRequired,
};

AppMenuWithRouter.displayName = "AppMenuWithRouter";

export default AppMenuWithRouter;
