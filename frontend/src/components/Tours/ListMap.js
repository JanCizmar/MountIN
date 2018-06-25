import React from 'react';
import {Marker} from "react-google-maps";
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import TourListItem from "./TourListItem";

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
            <Markers tours={props.tours}/>
        </GoogleMap>;
    }
);

export default ListMap;

/** @return array|null */
function Markers(props) {
    console.log(props);
    const markers = [];
    //if (props.lat !== undefined && props.lng !== undefined) {
    for (let tour of props.tours) {
        console.log(tour.route[0]);
        if (tour.route[0] && tour.route[0][0] && tour.route[0][0])
            markers.push(<Marker key={tour._id}
                                 position={{lat: tour.route[0][0], lng: tour.route[0][1]}}
            >
                <InfoBox style={{width: "100%"}}
                    //onCloseClick={props.onToggleOpen}
                         options={{closeBoxURL: ``, enableEventPropagation: true, border: '1px solid black'}}
                >
                    <div style={{backgroundColor: 'white', width: '100%'}}>
                        <TourListItem {...tour}/>


                    </div>
                </InfoBox>
            </Marker>);
    }
    return markers;

    //}
    //return null;
}