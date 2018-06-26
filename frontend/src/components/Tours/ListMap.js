import React from 'react';
import {Marker} from "react-google-maps";
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import TourListItem from "./TourListItem";

const {compose, withProps} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
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
            <Markers tours={props.tours} onMarkerClick={props.onMarkerClick} openInfobox={props.openInfobox}/>
        </GoogleMap>;
    }
);

export default ListMap;

/** @return array|null */
function Markers(props) {
    console.log(props);
    const markers = [];
    for (let tour of props.tours) {
        if (tour.route[0] && tour.route[0][0] && tour.route[0][0])
            markers.push(
                <Marker key={tour._id}
                        position={{lat: tour.route[0][0], lng: tour.route[0][1]}}
                        onClick={() => props.onMarkerClick(tour._id)}>

                    {props.openInfobox === tour._id &&
                    <InfoBox options={{closeBoxURL: ``, enableEventPropagation: true}}>

                        <div style={{backgroundColor: 'white', width: '250px', height: "300px"}}>
                            <TourListItem {...tour} xs={12} md={12} sm={12} lg={12}/>
                        </div>

                    </InfoBox>}
                </Marker>);
    }
    return markers;

    //}
    //return null;
}

