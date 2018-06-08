"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';

import List from "./List";
import TourService from "../../services/TourService";
import {Filters} from "./Filters";

class ListPage extends React.Component {

    onFilterChange = value => {
        //save the json string of the previous filtes value avoiding affect of loactionName
        let prevValue = JSON.stringify({...this.state.filtersValue, locationName: ""});
        this.setState((prevState) => {
            return {...prevState, filtersValue: value}
        });
        //get string of new value
        let newValue = JSON.stringify({...value, locationName: ""});
        //if they are different, load data
        if (prevValue !== newValue) {
            this.loadData();
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tours: [],
            filtersValue: {
                locationName: "",
                locationLatLng: [],
                activityTypes: [],
                difficulties: [],
                guideTypes: [],
                price: [0, 100]
            }
        };
    }

    loadData() {
        this.setState((prevState) => {
            return {...prevState, loading: true}
        });
        TourService.getTours().then((data) => {
                this.setState((prevState) => {
                    return {...prevState, tours: data, loading: false}
                });
            }
        )
    }

    componentDidMount() {
        this.loadData()
    }


    render() {
        return (
            <Page>
                <Filters value={this.state.filtersValue} onChange={this.onFilterChange}/>
                <List tours={this.state.tours} loading={this.state.loading}/>
            </Page>);
    }
}

export default withRouter(ListPage);