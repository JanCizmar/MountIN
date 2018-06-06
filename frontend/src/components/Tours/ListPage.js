"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';
import Filters from "./Filters";
import List from "./List";
import TourService from "../../services/TourService";

class ListPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tours: []
        };
    }

    componentDidMount() {
        TourService.getTours().then((data) => {
                this.setState({...this.state, tours: data, loading: false});
            }
        )
    }


    render() {
        return (
            <Page>
                <Filters/>
                <List tours={this.state.tours} loading={this.state.loading}/>
            </Page>
        );
    }
}

export default withRouter(ListPage);