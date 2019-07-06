import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import PublicRoute from "./PublicRoute";

import Callback from "../../pages/CallbackPage";
import Index from "../../pages/IndexPage";

import { UserConsumer } from "../../../App";

export default () => (
  <UserConsumer>
    {({ isAuthenticated }) => (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              isAuthenticated ? (
                <Redirect to="/dashboard" />
              ) : (
                <PublicRoute component={Index} path="/" title="Index" />
              )
            }
          />
          <PublicRoute path="/callback" component={Callback} />
        </Switch>
      </BrowserRouter>
    )}
  </UserConsumer>
);
