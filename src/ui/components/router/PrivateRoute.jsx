import React, { Fragment } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Redirect, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { UserConsumer } from "../../../App";

import Navigation from "../../layouts/navigation/NavigationLayout";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flex: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 64,
    [theme.breakpoints.down("xs")]: {
      marginTop: 56,
      marginLeft: 0
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 60
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 220
    }
  },
  drawerPadding: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 200
    }
  }
}));

function PrivateRoute({ exact, path, component, title }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false
  });
  const { open } = state;
  const toggleDrawer = () => setState(({ open }) => ({ open: !open }));
  return (
    <UserConsumer>
      {({ isAuthenticated }) => (
        <Route
          exact={exact}
          path={path}
          render={props => {
            if (isAuthenticated)
              return (
                <Fragment>
                  <Helmet>
                    <title>{`MobileGrid | ${title}`}</title>
                  </Helmet>
                  <Navigation handleToggleDrawer={toggleDrawer} open={open} />
                  <main
                    className={classNames(
                      classes.main,
                      open && classes.drawerPadding
                    )}
                  >
                    {React.createElement(component)}
                  </main>
                </Fragment>
              );
            return <Redirect to="/login" />;
          }}
        />
      )}
    </UserConsumer>
  );
}

export default PrivateRoute;
