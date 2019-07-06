import React from "react";

import { UserConsumer } from "../../../../App";

import PrivateDrawer from "./PrivateDrawerLayout";
import WithWidth from "../../../components/utils/WithWidth";

export default props => (
  <UserConsumer>
    {({ isAuthenticated }) =>
      isAuthenticated ? (
        <WithWidth>
          <PrivateDrawer {...props} />
        </WithWidth>
      ) : (
        <h1>PublicDrawer</h1>
      )
    }
  </UserConsumer>
);
