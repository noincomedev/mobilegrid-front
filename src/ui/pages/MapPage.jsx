import React from "react";
import gql from "graphql-tag";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Query } from "react-apollo";

import Icon from "@material-ui/core/Icon";
import Place from "@material-ui/icons/Place";
import BatteryChargingFull from "@material-ui/icons/BatteryChargingFull";

import Spinner from "../components/utils/Spinner";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoibm9pbmNvbWVkZXYiLCJhIjoiY2pwanZxNTNvMGI2bTNxczlubTNpaHFycCJ9.pufBIhv7SUUHLSMXIyv3kQ"
});

const GET_NEAR_VENUES = gql`
  query nearVenues {
    nearVenues {
      id
      name
      address {
        street
        number
      }
      location {
        lat
        lng
      }
    }
  }
`;

const FAKE_VENUES = [
  {
    id: "1234",
    name: "OXXO",
    address: { street: "calle", number: 1324 },
    location: { lat: -70.57, lng: -33.3899 }
  },
  {
    id: "1235",
    name: "OXXO",
    address: { street: "calle", number: 1324 },
    location: { lat: -70.57, lng: -33.4195 }
  },
  {
    id: "1236",
    name: "OXXO",
    address: { street: "calle", number: 1324 },
    location: { lat: -70.568, lng: -33.40775 }
  }
];

export default () => (
  <Query query={GET_NEAR_VENUES}>
    {({ error, loading, data }) => {
      if (loading) return <Spinner />;
      return (
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          center={[-70.57, -33.4]}
          zoom={[13]}
        >
          <Marker coordinates={[-70.57, -33.4]} anchor="bottom">
            <Place />
          </Marker>
          {FAKE_VENUES.map(venue => (
            <Marker
              coordinates={[venue.location.lat, venue.location.lng]}
              anchor="bottom"
              key={venue.id}
              style={{ color: "green", height: "4vh" }}
            >
              <Icon fontSize="large">
                <BatteryChargingFull />
              </Icon>
            </Marker>
          ))}
        </Map>
      );
    }}
  </Query>
);
