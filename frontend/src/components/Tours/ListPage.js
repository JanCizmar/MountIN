"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';

import List from "./List";
import {Filters} from "./Filters";
import {connect} from "react-redux";
import * as actions from '../../state/actions/tourList';
import ListMap from "./ListMap";
import {Row,Col,Button} from "react-bootstrap";

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
    }

    componentWillUnmount() {
        //this is going to clear list of tours, when user leave the list page
        this.props.dispatch(actions.clearTours());
    }

    loadMore()  {
        //this is going to load more results from backend
        this.props.dispatch(actions.fetchTours(this.props.state.filtersValue, this.props.state.tours.length))
    }
    showMap() {
        this.props.dispatch(actions.mapView())

    }
    showList() {
        this.props.dispatch(actions.listView())
    }

    showBoth() {
        this.props.dispatch(actions.bothView())
    }

    render() {
        return (
            <Page className="list-page">
                {this.props.state.mapView}
                <Row>
                <Filters value={this.props.state.filtersValue} onChange={this.onFilterChange}/>
                </Row>
                <Col sm={12} md={12} lg={12}>
                    <Col sm={3} md={3} lg={3}>
                    <Button className="view-button" type="button" onClick={this.showMap.bind(this)}>SHOW MAP VIEW
                    </Button>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                    <Button className="view-button" type="button" onClick={this.showList.bind(this)}>SHOW LIST VIEW
                    </Button>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                    <Button className="view-button" type="button" onClick={this.showBoth.bind(this)}>SHOW BOTH MAP AND LIST VIEW
                    </Button>
                    </Col>
                </Col>
                <Row>
                    {this.props.state.mapView &&
                    <Col className="no-padding" lg={12} md={12} sm={12} >
                        <div className="map-head">
                           {/* MAP VIEW */}
                        </div>
                        <ListMap tours={this.props.state.tours} onMarkerClick={this.onMarkerClick}
                                 openInfobox={this.props.state.openInfobox}/>
                    </Col>}
                    {this.props.state.listView &&
                    <Col className="no-padding" lg={12} md={12} sm={12}>
                        <div className="map-head">
                            {/*LIST VIEW*/}
                        </div>
                        <List tours={this.props.state.tours} loading={this.props.state.loading}
                              loadMore={this.loadMore.bind(this)} hasMore={this.props.state.hasMore}/>
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