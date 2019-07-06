import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles(theme => ({
  logo: {
    flexGrow: 1,
    color: `${theme.palette.common.black} !important`,
    "&:link": {
      textDecoration: "none"
    }
  },
  drawerMargin: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 200
    }
  }
}));

export default ({ onToggleDrawer, open, width }) => {
  const classes = useStyles();
  return (
    <Toolbar>
      <Typography
        variant="h6"
        classes={{ h6: classNames(classes.logo, open && classes.drawerMargin) }}
        component={Link}
        to="/dashboard"
      >
        MobileGrid
      </Typography>
      {isWidthUp(width, "sm") && (
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};
