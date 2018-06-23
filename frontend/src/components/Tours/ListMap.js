import React from 'react';
import {Marker} from "react-google-maps";

const {compose, withProps, lifecycle} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");


const ListMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiqph4VE1UPfoHwmBX7NYkFApXlngUVkI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
)(props => {
        return <GoogleMap
            defaultZoom={9}
            defaultCenter={new google.maps.LatLng(48.150040, 11.545055)}
        >
            <Markers {...props.tours}/>
        </GoogleMap>;
    }
);

export default ListMap;

/** @return mixed */
function Markers(props) {


    if (props.lat !== undefined && props.lng !== undefined) {
        return <Marker
            position={{lat: 12, lng: 15}}
        />
    }
    return null;
}