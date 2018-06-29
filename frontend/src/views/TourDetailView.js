"use strict";

import React from 'react';
import {TourDetailPage} from "../components/Tours/TourDetailPage";
import UserService from "../services/UserService";
import * as actions from "../state/actions/tourDetail"
import connect from "react-redux/es/connect/connect";
import Loading from "../components/Loading";


class TourDetailPageView extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.getTourData(this.props.match.params.id));
    }

    render() {
        return (
            !this.props.state.data || this.props.state.loading && <Loading/> ||
            <TourDetailPage {...this.props.state.data}
                            userId={UserService.getCurrentUser() && UserService.getCurrentUser().id}/>
        );
    }
}

export default connect(store => {
    return {
        state: store.tourDetail
    }
})(TourDetailPageView);
