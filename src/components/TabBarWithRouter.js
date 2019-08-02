import * as React from "react";
import PropTypes from "prop-types";

import TabBarMenu from "react-multiversal/src/TabBar.bs.js";

function TabBarMenuWithRouter(props, context) {
  return (
    <TabBarMenu
      {...props}
      currentLocation={(context.router || {}).location || { pathname: "" }}
    />
  );
}

TabBarMenuWithRouter.contextTypes = {
  router: PropTypes.object.isRequired,
};

TabBarMenuWithRouter.displayName = "TabBarMenuWithRouter";

export default TabBarMenuWithRouter;
