"use strict";

import React from 'react';
import {Map} from './Map';
import {withRouter} from 'react-router-dom';

import Page from './Page';


class CreateTour extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            wpts: [
                //[48.156442, 11.619363],
                //[48.156542, 11.618363],
                //[48.156582, 11.618393]
            ],
        };

        this.handleOnDirectionsChanged = this.handleOnDirectionsChanged.bind(this)
    }

    handleOnDirectionsChanged(val) {
        console.log(val);
        this.setState({wpts: val});
    }

    render() {
        return (
            <Page>
                <Map waypoints={this.state.wpts} draggable={true} onDirectionsChanged={this.handleOnDirectionsChanged}/>
            </Page>
        );
    }
}

export default withRouter(CreateTour);