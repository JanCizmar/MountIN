"use strict";

import React from 'react';
import {TourDetailPage} from "../components/Tours/TourDetailPage";
import withRouter from "react-router-dom/es/withRouter";
import UserService from "../services/UserService";

export const TourDetailPageView = withRouter(props => {
    return (
        <TourDetailPage tourId={props.match.params.id}
                        userId={UserService.getCurrentUser() && UserService.getCurrentUser().id}/>
    );
});
