import React, { Component, Fragment } from "react";
import { Marker } from "react-mapbox-gl";

import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  marker: {
    color: "green",
    minHeight: 25
  }
});

class CustomMarker extends Component {
  state = {
    hover: false
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    const { venue, classes } = this.props;
    const { hover } = this.state;
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
              >{`Slots Disponibles:${venue.banks}`}</Typography>
              <Button variant="outlined" color="secondary">
                Reservar
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CustomMarker);
