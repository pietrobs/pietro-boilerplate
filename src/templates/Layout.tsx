import React, { Suspense } from "react";
import PropTypes from "prop-types";

import InitialLoading from "components/InitialLoading";

const Layout: React.FC = ({ children }) => (
  <Suspense fallback={<InitialLoading />}>
    <div className="App">{children}</div>
  </Suspense>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
