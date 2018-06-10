"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';

import List from "./List";
import {Filters} from "./Filters";
import {connect} from "react-redux";
import * as actions from '../../state/actions/tourList';

class ListPage extends React.Component {

    onFilterChange = value => {
        let prevValue = JSON.stringify({
            ...this.props.state.filtersValue,
            location: {...this.props.state.filtersValue.location, name: ""}
        });
        this.props.dispatch(actions.changeFilters(value));
        //get string of new value
        let newValue = JSON.stringify({...value, location: {...value.location, name: ""}});
        //if they are different, load data
        if (prevValue !== newValue) {
            this.props.dispatch(actions.fetchTours(value));
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue));
    }

    render() {
        return (
            <Page>
                <Filters value={this.props.state.filtersValue} onChange={this.onFilterChange}/>
                <List tours={this.props.state.tours} loading={this.props.state.loading}/>
            </Page>);
    }
}

export default connect(store => {
    return {
        state: store.tourList
    }
})(withRouter(ListPage));