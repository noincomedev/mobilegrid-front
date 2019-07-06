import React from "react";

import { UserConsumer } from "../../App";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

export default () => {
  const classes = useStyles();
  return (
    <UserConsumer>
      {user => (
        <Grid container justify="center" style={{ marginTop: 64 }}>
          <Typography variant="h1" color="primary">
            Index
          </Typography>
        </Grid>
      )}
    </UserConsumer>
  );
};
