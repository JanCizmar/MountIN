"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Col, form, FormGroup, Grid} from 'react-bootstrap'
import Page from './Page';
import {Location} from "./Tours/FilterInputs/Location";
import {connect} from "react-redux";
import * as actions from "../state/actions/tourList";


class LandingPage extends React.Component {

    onValueChange = (value) => {
        if (JSON.stringify(value.latLng) !== JSON.stringify(this.props.state.filtersValue.location.latLng)) {
            console.log('hafo');
            this.props.dispatch(actions.fetchTours({...this.props.state.filtersValue, location: value}));
            this.props.history.push('/list');
        }
        this.props.dispatch(actions.changeFilters({...this.props.state.filtersValue, location: value}));
    };

    componentDidMount() {
        this.props.dispatch(actions.getLocation());
    }

    render() {
        return (
            <Page className="landing-page">
                <Grid>
                    <div className="testt">
                        <form className="landing-form" onSubmit={this.handleSubmit}
                              onReset={() => this.props.history.goBack()}>
                            <FormGroup>
                                <Col xs={10} sm={10} md={8} lg={8} xsOffset={1} smOffset={1} mdOffset={2} lgOffset={2}>
                                    <Col xs={11} sm={11} md={11} lg={11}>
                                        <Location value={this.props.state.filtersValue.location}
                                                  onValueChange={this.onValueChange}/>
                                    </Col>

                                    <Col xs={1} sm={1} md={1} lg={1}>
                                        <Button className="searchButton" type="button"
                                                disabled={!this.props.state.filtersValue.location.latLng.lat}
                                                onClick={() => this.props.history.push('/list')}
                                        >
                                            <i className="search-glyphicon glyphicon glyphicon-search"/></Button>
                                    </Col>
                                </Col>
                            </FormGroup>
                        </form>
                    </div>
                </Grid>
            </Page>
        );
    }
}

export default withRouter(connect(store => {
    return {
        state: store.tourList
    }
})(LandingPage));
