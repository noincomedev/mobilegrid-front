import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { UserConsumer } from "../../../../App";

const useStyles = makeStyles(theme => ({
  logo: {
    flexGrow: 1,
    color: `${theme.palette.common.white} !important`,
    "&:link": {
      textDecoration: "none"
    }
  },
  loginButton: {
    color: theme.palette.common.white
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
    <UserConsumer>
      {({ handleLogin }) => (
        <Toolbar>
          <Typography
            variant="h6"
            classes={{
              h6: classNames(classes.logo, open && classes.drawerMargin)
            }}
            component={Link}
            to="/"
          >
            MobileGrid
          </Typography>
          <Button
            variant="text"
            classes={{ text: classes.loginButton }}
            onClick={event => handleLogin()}
          >
            Entrar
          </Button>
        </Toolbar>
      )}
    </UserConsumer>
  );
};
