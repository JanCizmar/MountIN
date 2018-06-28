"use strict";

import React from 'react';
import {TourDetailPage} from "../components/Tours/TourDetailPage";
import UserService from "../services/UserService";
import TourService from "../services/TourService";



export class TourDetailPageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                participants: [], //comment: is that the correct way?
                route: []
            }};
    }

    gettourdetails() {
            TourService.getTourDetails(this.props.match.params.id).then((data) => {
                this.setState({...this.state, value: data});
            }).catch((e) => {
                console.error(e);
                this.setState({
                    error: e
                });
            });
        }


    componentDidMount(){
        this.gettourdetails();
    }

    render() {
        return (
            <TourDetailPage {...this.state.value} tourId={this.props.match.params.id}
                            userId={UserService.getCurrentUser() && UserService.getCurrentUser().id}
            />
        );
    }

}

