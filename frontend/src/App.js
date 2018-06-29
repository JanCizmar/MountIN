"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";
import {CreateRouteView} from "./views/CreateRouteView";
import {LandingPageView} from "./views/LandingPageView";
import {CreateTourView} from "./views/CreateTourView";
import {ListPageView} from "./views/ListPageView";
import UserDetailView from "./views/UserDetailView";
import ExampleView from "./views/ExampleView";
import TourDetailPageView from "./views/TourDetailView";
import {EditUserView} from "./views/EditUserView";

export default class App extends React.Component {
    routes = [
        {component: UserLoginView, path: '/login'},
        {component: CreateTourView, path: '/createTour'},
        {component: UserSignupView, path: '/register'},
        {component: ListPageView, path: '/list'},
        {component: EditUserView, path: '/editProfile'},
        {component: UserDetailView, path: '/profile'},
        {component: UserDetailView, path: '/profile/:id'},
        {component: ExampleView, path: '/example'},
        {component: TourDetailPageView, path: '/tours/detail/:id'},
        {component: LandingPageView, path: '/'}
    ];

    componentDidMount() {
        document.title = 'MountIn';
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </div>
        );
    }
}

