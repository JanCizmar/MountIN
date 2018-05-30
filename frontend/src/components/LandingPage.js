"use strict";

import React from 'react';
import { Card, Button, TextField } from 'react-md';
import { withRouter } from 'react-router-dom';

import Page from './Page';


const style = { maxWidth: 500 };


class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleSearchChanged = this.handleSearchChanged.bind(this);
    }

    handleSearchChanged(value){
        this.setState({...this.state, search: value});
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Search"
                            id="search"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.search}
                            onChange={this.handleSearchChanged}
                            errorText="Please set text"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.search === ''}
                                raised primary className="md-cell md-cell--2">Search</Button>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(LandingPage);