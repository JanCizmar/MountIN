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

    componentDidMount() {
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue, 0, 0));
    }

    componentWillUnmount() {
        this.props.dispatch(actions.clearTours());
    }

    loadMore() {
        console.log('load more');
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue, this.props.state.tours.length))
    }

    render() {
        return (
            <Page>
                <Filters value={this.props.state.filtersValue} onChange={this.onFilterChange}/>
                <List tours={this.props.state.tours} loading={this.props.state.loading}
                      loadMore={this.loadMore.bind(this)} hasMore={this.props.state.hasMore}/>
            </Page>);
    }
}

export default connect(store => {
    return {
        state: store.tourList
    }
})(withRouter(ListPage));