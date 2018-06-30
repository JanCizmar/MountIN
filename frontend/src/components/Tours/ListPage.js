"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';

import List from "./List";
import {Filters} from "./Filters";
import {connect} from "react-redux";
import * as actions from '../../state/actions/tourList';
import ListMap from "./ListMap";
import {Button, Col, Row} from "react-bootstrap";

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

    onMarkerClick = (tourId) => {
        this.props.dispatch(actions.toggleInfobox(tourId));
    };

    componentDidMount() {
        //Fetch some tours on beginning
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue, 0, 0));

        let that = this;
        window.addEventListener("scroll", function () {
            that.props.dispatch(actions.scroll(this.scrollY));
        });
    }

    componentWillUnmount() {
        //this is going to clear list of tours, when user leave the list page
        this.props.dispatch(actions.clearTours());
    }

    loadMore() {
        //this is going to load more results from backend
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue, this.props.state.tours.length))
    }

    showMap() {
        this.props.dispatch(actions.toggleMapView())
    }

    onTourClick(id) {
        this.props.dispatch(actions.tourSelect(id))
    }

    render() {
        return (
            <Page className="list-page">
                <Row>
                    <Filters value={this.props.state.filtersValue} onChange={this.onFilterChange}/>
                </Row>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <Button className="view-button" type="button" onClick={this.showMap.bind(this)}>
                            {this.props.state.mapView && 'HIDE' || 'SHOW'} MAP
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={["list-wrapper", this.props.state.mapView && 'small-hidden']}
                         lg={this.props.state.mapView ? 6 : 12}
                         md={this.props.state.mapView ? 6 : 12} sm={12}>
                        <List tours={this.props.state.tours} loading={this.props.state.loading}
                              loadMore={this.loadMore.bind(this)} hasMore={this.props.state.hasMore}
                              mapView={this.props.state.mapView} onTourClick={this.onTourClick.bind(this)}/>
                    </Col>

                    {this.props.state.mapView &&
                    <Col lg={6} md={6} sm={12}
                         className={['map-wrapper', this.props.state.scrollY > 209 && 'scrolled']}>
                        <ListMap tours={this.props.state.tours} onMarkerClick={this.onMarkerClick}
                                 openInfobox={this.props.state.openInfobox} mapCenter={this.props.state.mapCenter}
                                 zoom={this.props.state.zoom}/>
                    </Col>}
                </Row>
            </Page>);
    }
}

export default connect(store => {
    return {
        state: store.tourList
    }
})(withRouter(ListPage));