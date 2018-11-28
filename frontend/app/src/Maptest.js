/*global google*/

import React from "react";
import { withRouter } from 'react-router';
import App from './App';
import {sendFormInformation} from './App';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");



  
const MapWithADirectionsRenderer = compose(
  withProps({
	googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8pxsl2jFQSwshMT2I5Weue8CKLgxalY8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap)((props) =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(47.0824, 2.3985)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} origin={props.origin} destination={props.destination} />}
  </GoogleMap>
)
export default MapWithADirectionsRenderer
