import * as React from "react";
import PropTypes from "prop-types";

import HeaderLarge from "./HeaderLarge.bs.js";

function HeaderLargeWithRouter(props, context) {
  return (
    <HeaderLarge
      currentLocation={(context.router || {}).location || { pathname: "" }}
    />
  );
}

HeaderLargeWithRouter.contextTypes = {
  router: PropTypes.object.isRequired,
};

HeaderLargeWithRouter.displayName = "HeaderLargeWithRouter";

export default HeaderLargeWithRouter;
