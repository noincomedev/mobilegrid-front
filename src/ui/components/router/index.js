import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Index from "../../pages/IndexPage";

import { UserConsumer } from "../../../App";

export default () => (
  <UserConsumer>
    {({ isAuthenticated }) => (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    )}
  </UserConsumer>
);
