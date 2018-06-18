"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';
import { form,Button,Grid,FormControl,FormGroup,Col } from 'react-bootstrap'
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

    getValidationState() {
        const length = this.state.search.length;
        if (length == 0) return 'error';
        return null;
    }


    render() {
        return (
            <Page className="landing-page">
                <Grid>
                    <div className="testt">
                    <form className="landing-form" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <FormGroup
                            validationState={this.getValidationState()}
                        >
                            <Col xs={10} sm={10} md={8} lg={8} xsOffset={1} smOffset={1} mdOffset={2} lgOffset={2}>
                                <Col xs={11}  sm={11} md={11} lg={11} >
                                    <FormControl
                                        type="text"
                                        placeholder="Enter a location to begin your adventure"
                                        id="search"
                                        onChange={this.handleSearchChanged}
                                    />
                                </Col>

                                <Col xs={1}  sm={1} md={1} lg={1}>
                                    <Button className="searchButton" type="submit"
                                            disabled={this.state.search === ''}><i
                                        className="search-glyphicon glyphicon glyphicon-search"></i></Button>
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

export default withRouter(LandingPage);

