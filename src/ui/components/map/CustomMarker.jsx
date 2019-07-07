import React, { Component, Fragment } from "react";
import { Marker } from "react-mapbox-gl";

import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../components/utils/Spinner";

const styles = theme => ({
  marker: {
    color: "green",
    minHeight: 25
  }
});

class CustomMarker extends Component {
  state = {
    hover: false,
    loading: false
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  requestBattery = () => {
    const { venue_id } = this.props.venue;
    this.toggleLoading();
    fetch(
      "https://61z05qvtmj.execute-api.us-east-1.amazonaws.com/prod/reservations",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "AppSyncOIDCKey"
          )}`
        },
        method: "POST",
        body: JSON.stringify({
          user_id: window.localStorage.getItem("AppSyncOIDCKey"),
          venue_id: venue_id
        })
      }
    )
      .then(response => {
        this.toggleLoading();
      })
      .then(() => this.toggleHover());
  };

  render() {
    const { venue, classes } = this.props;
    const { hover, loading } = this.state;
    return (
      <Fragment>
        <Marker
          coordinates={[venue.lat, venue.lng]}
          anchor="bottom"
          className={classes.marker}
          onClick={event => this.toggleHover()}
        >
          <i className="fas fa-battery-full fa-3x" />
        </Marker>
        <Dialog
          onClose={this.toggleHover}
          aria-labelledby="simple-dialog-title"
          open={hover}
        >
          <DialogTitle id="simple-dialog-title">{venue.venue_name}</DialogTitle>
          <DialogContent>
            <Grid container justify="center" direction="column">
              <Typography variant="subtitle1" color="inherit" paragraph>{`${
                venue.venue_address
              }`}</Typography>
              <Typography
                variant="subtitle2"
                color="inherit"
                paragraph
              >{`Baterias Disponibles:${venue.banks}`}</Typography>
              <Typography
                variant="subtitle2"
                color="inherit"
                paragraph
              >{`Slots Disponibles:${venue.slots}`}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={event => this.requestBattery()}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Reservar"}
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CustomMarker);
