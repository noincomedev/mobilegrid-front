import React from "react";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

import PrivateToolbar from "../../components/navigation/toolbar/Private";
import PublicToolbar from "../../components/navigation/toolbar/Public";
import WithWidth from "../../components/utils/WithWidth";

import { UserConsumer } from "../../../App";

import Drawer from "./drawer/DrawerLayout";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default ({ handleToggleDrawer, open }) => {
  const classes = useStyles();
  return (
    <UserConsumer>
      {({ isAuthenticated }) => (
        <nav className={classes.root}>
          <AppBar color="primary" position="fixed" className={classes.appBar}>
            {isAuthenticated ? (
              <WithWidth>
                <PrivateToolbar
                  open={open}
                  onToggleDrawer={handleToggleDrawer}
                />
              </WithWidth>
            ) : (
              <PublicToolbar />
            )}
          </AppBar>
          <Drawer open={open} onToggleDrawer={handleToggleDrawer} />
        </nav>
      )}
    </UserConsumer>
  );
};
