import React from "react";
import { Redirect } from "react-router-dom";

import Spinner from "../components/utils/Spinner";

import { UserConsumer } from "../../App";

export default () => (
  <UserConsumer>
    {({ isAuthenticated }) => {
      if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
      }
      return <Spinner />;
    }}
  </UserConsumer>
);
