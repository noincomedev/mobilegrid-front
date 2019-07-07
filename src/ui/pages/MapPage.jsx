import React, { Component } from "react";
import classNames from "classnames";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

import Spinner from "../components/utils/Spinner";
import { withStyles } from "@material-ui/core/styles";

import CustomMarker from "../components/map/CustomMarker";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoibm9pbmNvbWVkZXYiLCJhIjoiY2pwanZxNTNvMGI2bTNxczlubTNpaHFycCJ9.pufBIhv7SUUHLSMXIyv3kQ"
});

const styles = theme => ({
  userPositionMarker: {
    color: theme.palette.primary.dark
  }
});

class MapPage extends Component {
  state = {
    loading: true,
    venues: []
  };

  componentDidMount() {
    fetch("https://61z05qvtmj.execute-api.us-east-1.amazonaws.com/prod/venues")
      .then(response => response.json())
      .then(data => this.setState({ venues: data }));
    this.toggleLoading();
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { classes } = this.props;
    const { venues, loading } = this.state;
    if (loading) return <Spinner />;
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100%"
        }}
        center={[-70.579, -33.4]}
        zoom={[13]}
      >
        <Marker coordinates={[-70.579, -33.4]} anchor="bottom">
          <i
            className={classNames(
              "fas fa-map-marker-alt fa-3x",
              classes.userPositionMarker
            )}
          />
        </Marker>
        {venues.map(venue => (
          <CustomMarker key={venue.venue_id} venue={venue} />
        ))}
      </Map>
    );
  }
}

export default withStyles(styles)(MapPage);
