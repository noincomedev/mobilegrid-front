import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Callback from "../../pages/CallbackPage";
import Dashboard from "../../pages/DashboardPage";
import Index from "../../pages/IndexPage";
import Map from "../../pages/MapPage";

import { UserConsumer } from "../../../App";

export default () => (
  <UserConsumer>
    {({ isAuthenticated, user }) => (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return isAuthenticated ? (
                <Redirect to="/map" />
              ) : (
                <PublicRoute component={Index} path="/" title="Index" />
              );
            }}
          />
          <PublicRoute path="/callback" component={Callback} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            title="Dashboard"
          />
          <PrivateRoute exact path="/map" component={Map} title="Map" />
        </Switch>
      </BrowserRouter>
    )}
  </UserConsumer>
);
