import React from 'react';
import {Marker} from "react-google-maps";
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import TourListItem from "./TourListItem";
import withRouter from "react-router-dom/es/withRouter";

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
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
)(props => {
        return <GoogleMap
            zoom={props.zoom}
            center={new google.maps.LatLng(props.mapCenter[0], props.mapCenter[1])}
        >
            <Markers tours={props.tours} onMarkerClick={props.onMarkerClick} openInfobox={props.openInfobox}/>
        </GoogleMap>;
    }
);

export default ListMap;

/** @return array|null */
const Markers = withRouter((props) => {
        const markers = [];
        for (let tour of props.tours) {
            if (tour.route[0] && tour.route[0][0] && tour.route[0][0])
                markers.push(
                    <Marker key={tour._id}
                            position={{lat: tour.route[0][0], lng: tour.route[0][1]}}
                            onClick={() => props.onMarkerClick(tour._id)}>

                        {props.openInfobox === tour._id &&
                        <InfoBox options={{closeBoxURL: ``, enableEventPropagation: true}}>

                            <div style={{backgroundColor: 'white', width: '250px'}}>
                                <TourListItem {...tour} xs={12} md={12} sm={12} lg={12}
                                              onClick={() => props.history.push('/tours/detail/' + tour._id)}/>
                            </div>

                        </InfoBox>}
                    </Marker>);
        }
        return markers;

        //}
        //return null;
    }
);

