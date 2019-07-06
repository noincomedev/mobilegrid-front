import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import Map from "@material-ui/icons/Map";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";

import { UserConsumer } from "../../../../App";

import AdminDrawer from "../../../components/navigation/drawer/Admin";
import UserDrawer from "../../../components/navigation/drawer/User";

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  drawerHeadContainer: {
    minHeight: 64,
    borderBottom: `1px solid ${theme.palette.grey[400]}`
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: "100%",
    [theme.breakpoints.only("md")]: {
      backgroundColor: theme.palette.primary.dark
    }
  },
  contrastIcon: {
    [theme.breakpoints.up("md")]: {
      color: theme.palette.primary.light
    }
  },
  contrastItemText: {
    [theme.breakpoints.up("md")]: {
      color: theme.palette.common.white
    }
  },
  miniDrawerPaper: {
    width: 60,
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth
    },
    background: theme.palette.primary.dark,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  openDrawer: {
    zIndex: 1500
  }
}));

export default props => {
  const classes = useStyles();
  const { open, width, onToggleDrawer } = props;
  const theme = useTheme();
  const getDrawerType = () => {
    switch (width) {
      case "xs":
        return "temporary";
      case "sm":
        return "temporary";
      default:
        return "permanent";
    }
  };
  return (
    <UserConsumer>
      {({ isAuthenticated, user }) => {
        return (
          <Drawer
            variant={getDrawerType()}
            open={open}
            anchor={isWidthDown("sm", width) ? "right" : "left"}
            onClose={onToggleDrawer}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !open && classes.miniDrawerPaper,
                open && classes.openDrawer
              )
            }}
            onMouseEnter={width === "md" ? onToggleDrawer : () => {}}
            onMouseLeave={width === "md" ? onToggleDrawer : () => {}}
          >
            <Grid
              container
              justify="flex-end"
              classes={{ container: classes.drawerHeadContainer }}
            >
              {isWidthDown("sm", width) && (
                <IconButton
                  onClick={onToggleDrawer}
                  classes={{ root: classes.iconButton }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronLeft />
                  ) : (
                    <ChevronRight />
                  )}
                </IconButton>
              )}
            </Grid>
            <List classes={{ root: classes.list }}>
              <ListItem button divider dense component={Link} to="/dashboard">
                <ListItemIcon
                  classes={{
                    root: classNames(
                      classes.icon,
                      isWidthUp("md", width) && classes.contrastIcon
                    )
                  }}
                >
                  <Dashboard />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: classNames(
                      classes.icon,
                      isWidthUp("md", width) && classes.contrastItemText
                    )
                  }}
                  primary="Dashboard"
                />
              </ListItem>
              <ListItem button divider dense component={Link} to="/map">
                <ListItemIcon
                  classes={{
                    root: classNames(
                      classes.icon,
                      isWidthUp("md", width) && classes.contrastIcon
                    )
                  }}
                >
                  <Map />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: classNames(
                      classes.icon,
                      isWidthUp("md", width) && classes.contrastItemText
                    )
                  }}
                  primary="Map"
                />
              </ListItem>
            </List>
            {user ? <AdminDrawer {...props} /> : <UserDrawer {...props} />}
          </Drawer>
        );
      }}
    </UserConsumer>
  );
};
