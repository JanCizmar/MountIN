import React from 'react';
import {withHandlers, withState} from "recompose";
import {Marker} from "react-google-maps";

const {compose, withProps, lifecycle} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");


export const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiqph4VE1UPfoHwmBX7NYkFApXlngUVkI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
    withState('directions', 'setDirections', undefined),
    withState('marker', 'setMarker', [undefined, undefined]),
    withHandlers(
        {
            waypointsChanged: props => () => {
                if (props.waypoints.length > 1) {
                    const DirectionsService = new google.maps.DirectionsService();

                    let way = {};

                    function getGoogleLatLng(wpt) {
                        return new google.maps.LatLng(wpt[0], wpt[1]);
                    }

                    //coping the array to not affect that by shift and pop
                    let wpts = props.waypoints.slice();

                    //change the waypoints array to be object coompatible with google API
                    if (wpts !== undefined) {
                        //set the start of route
                        way.origin = getGoogleLatLng(wpts.shift());
                        //set the destination
                        way.destination = getGoogleLatLng(wpts.pop());
                        //add the waypoints
                        way.waypoints = [];
                        for (let waypt of wpts) {
                            way.waypoints.push({
                                location: getGoogleLatLng(waypt),
                                stopover: false
                            });
                        }
                        //set the travel mode
                        way.travelMode = google.maps.TravelMode.WALKING;

                    }
                    //get the actual route, to be drawed on the map
                    DirectionsService.route(way, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            console.log(result);
                            props.setDirections(result);
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
            }
        }
    ),
    lifecycle({
        componentDidMount() {
            this.props.waypointsChanged();
        }
    }),
)(props => {
        let dirRen;

        function handleOnClick(val) {
            if (props.waypoints.length < 2) {
                props.waypoints.push([val.latLng.lat(), val.latLng.lng()]);
                props.waypointsChanged();
                props.setMarker([undefined, undefined]);

            }
            if (props.waypoints.length === 1) {
                props.setMarker([val.latLng.lat(), val.latLng.lng()]);
            }
        }

        function directionsChangedHandler() {
            if (typeof props.onDirectionsChanged === 'function') {


                function getLocation(loc) {
                    if (typeof loc.lat === 'function') {
                        return [loc.lat(), loc.lng()]
                    }
                    return [loc.location.lat(), loc.location.lng()];
                }

                let way = dirRen.getDirections().request;
                let waypts = [];
                waypts.push(getLocation(way.origin));
                for (let wpt of way.waypoints) {
                    waypts.push(getLocation(wpt.location));
                }
                waypts.push(getLocation(way.destination));
                props.onDirectionsChanged(waypts);
            }
        }

        return <GoogleMap
            defaultZoom={9}
            defaultCenter={new google.maps.LatLng(48.150040, 11.545055)}
            onRightClick={handleOnClick}
        >

            {props.directions &&
            <DirectionsRenderer onDirectionsChanged={directionsChangedHandler} ref={(ref) => dirRen = ref}
                                options={{draggable: props.draggable !== undefined ? props.draggable : false}}
                                directions={props.directions}/>}
            <FirstMarker lat={props.marker[0]} lng={props.marker[1]}/>
        </GoogleMap>;
    }
);

/** @return mixed */
function FirstMarker(props) {
    if (props.lat !== undefined && props.lng !== undefined) {
        return <Marker
            position={{...props}}
        />
    }
    return null;
}