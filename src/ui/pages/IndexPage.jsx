import React from "react";

import { UserConsumer } from "../../App";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  logo: { maxWidth: "45%", color: theme.palette.primary.dark }
}));

export default () => {
  const classes = useStyles();
  return (
    <UserConsumer>
      {user => (
        <Grid container justify="center" style={{ marginTop: 64 }}>
          <img
            alt="logo"
            className={classes.logo}
            src="../Mobile Grid-logo.png"
          />
        </Grid>
      )}
    </UserConsumer>
  );
};
