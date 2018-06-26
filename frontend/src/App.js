"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import {LandingPageView} from "./views/LandingPageView";
import {CreateTourView} from "./views/CreateTourView";
import {ListPageView} from "./views/ListPageView";
import {UserDetailView} from "./views/UserDetailView";
import ExampleView from "./views/ExampleView";
import {MessageBoardView} from "./views/MessageBoardView"
import FileUploadExampleView from "./views/FileUploadExampleView";
import {TourDetailPageView} from "./views/TourDetailView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'MountIN',
            routes: [
                {component: MessageBoardView, path: '/messageBoard'},
                {component: UserLoginView, path: '/login'},
                {component: CreateTourView, path: '/createTour'},
                {component: UserSignupView, path: '/register'},
                {component: ListPageView, path: '/list'},
                {component: UserDetailView, path: '/profile'},
                {component: ExampleView, path: '/example'},
                {component: TourDetailPageView, path: '/tours/detail/:id'},
                {component: LandingPageView, path: '/'}

            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </div>
        );
    }
}

