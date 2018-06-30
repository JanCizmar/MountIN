import React from 'react';
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import {TourActivityType} from "./CreateTourInputs/TourActivityType";
import {TourDifficulty} from "./CreateTourInputs/TourDifficulty";
import {TourPrice} from "./CreateTourInputs/TourPrice";
import {Map} from './../Map';
import {compose, lifecycle, withHandlers} from "recompose";
import PropTypes from 'prop-types';
import * as actions from "../../state/actions/createTour";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Page from '../Page';
import * as imageUploadActions from "../../state/actions/imageUpload";
import ImageUpload from "../ImageUpload";
import UserService from "../../services/UserService";


export const CreateTour = compose(
    withHandlers(
        {
            onChange: props => property => val => {
                props.dispatch(actions.changeFilters({
                    ...props.state.toursInput,
                    [property]: val,
                    changedInput: props.state.toursInput.changedInput
                }));

            },
            submit: props => event => {
                event.preventDefault();
                props.dispatch(actions.createTours(props.state.toursInput));
            },
            onFileUploadSubmit: props => () => {
                props.dispatch(imageUploadActions.uploadImage(props.state.imageUpload.file));
            }
        }
    ),
    lifecycle(
        {
            componentDidMount(){
                let id=UserService.getCurrentUser().id;
                this.props.dispatch(actions.getClientLocation());
                this.props.dispatch(actions.isProfessional(id))
            },
            componentWillUnmount() {
                this.props.dispatch(actions.restoreInitialState());
            }
        }
    ))(props => {

    if (props.state.redirect !== undefined) {
        props.history.push(props.state.redirect);
    }


    if (UserService.getCurrentUser().id === undefined) {
        props.history.push('login');
    }

    const getValidState = (inputName) => {
        return getFormValidStates()[inputName];
    };
    //Form checking: TODO when time - change feedback: https://react-bootstrap.github.io/components/forms/
    const getFormValidStates = () => {
        //console.log(props.state.toursInput.route);
        return {
            name: props.state.toursInput.name.length ? props.state.toursInput.name.length < 3 || props.state.toursInput.name.length > 100 ? 'error' : 'success' : null,
            description: props.state.toursInput.description.length ? props.state.toursInput.description.length < 10 ? 'error' : 'success' : null,
            date: props.state.toursInput.date ? 'success' : null,
            difficulty: props.state.toursInput.difficulty ? props.state.toursInput.difficulty === "0" || props.state.toursInput.difficulty === "1" || props.state.toursInput.difficulty === "2" ? 'success' : 'error' : null,
            activityType: props.state.toursInput.activityType ? props.state.toursInput.activityType.length < 1 ? 'error' : 'success' : null,
           // guideType: props.state.toursInput.guideType ? props.state.toursInput.guideType === "1" || props.state.toursInput.guideType === "2" ? 'success' : 'error' : null,
            route: props.state.toursInput.route === undefined || props.state.toursInput.route.length === 0 ? 'error' : 'success'
        };
    };

    const isFormValid = () => {   //console.log("form validity check")
        for (let name of Object.keys(getFormValidStates())) {
            // console.log(name+": "+getFormValidStates()[name]);
            if (getFormValidStates()[name] === null) return false;
            if (getFormValidStates()[name] === 'error') return false;
        }
        return true;
    };

    return (
        <Page className="tour-create">
            <form onSubmit={props.submit} noValidate>
                <div className="filters-wrapper">
                    <Row>
                        <Col md={6} sm={6} lg={6}>
                            <FormGroup
                                controlId="name"
                                validationState={getValidState('name')}
                            >
                                <FormControl
                                    name="name"
                                    type="text"
                                    value={props.state.toursInput.name}
                                    placeholder="Name of the Tour"
                                    onChange={event => props.onChange('name')(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={6} lg={6}>
                            <FormGroup
                                controlId="date"
                                validationState={getValidState('date')}>
                                <DateTimePicker
                                    onChange={props.onChange('date')}
                                    value={props.state.toursInput.date}
                                    placeholder="Date"
                                    minDate={(new Date())}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12} sm={12} lg={12}>
                            <FormGroup
                                controlId="description"
                                validationState={getValidState('description')}
                            >
                                <FormControl
                                    name="description"
                                    type="text"
                                    value={props.state.toursInput.description}
                                    placeholder="Write a brief description of the tour"
                                    onChange={event => props.onChange('description')(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <TourActivityType
                                onChange={props.onChange('activityType')}
                                value={props.state.toursInput.activityType}/>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <TourDifficulty
                                onChange={props.onChange('difficulty')}
                                value={props.state.toursInput.difficulty}/>
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {props.state.professional &&
                            <div className="upload-head">Specify the Cost of the Tour </div>}
                        </Col>
                        <Col sm={12} md={9} lg={9}>
                            {props.state.professional &&
                            <TourPrice onChange={props.onChange('cost')}
                                       value={props.state.toursInput.cost}/>}

                            {!props.state.professional &&
                            <TourPrice  clname='hidden' onChange={props.onChange('cost')}
                                       value={props.state.toursInput.cost = 0}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <div className="upload-head">Upload an Image for the Tour</div>
                            <ImageUpload {...props.state.imageUpload} onSubmit={props.onFileUploadSubmit}
                                         onChange={(val) => props.dispatch(imageUploadActions.changeImage(val))}/>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <div className="route-head">Specify the Route for the Tour</div>
                            <Map waypoints={props.state.toursInput.route} draggable={true}
                                 onDirectionsChanged={props.onChange('route')}
                                 center={props.state.mapCenter}
                            />
                        </Col>
                    </Row>

                </div>
                <Button className="create-tour-button" type="submit"
                        disabled={!isFormValid()}
                >Create Tour</Button>
                <Col className="name" md={12} sm={12}>
                </Col>
            </form>
        </Page>)
});
CreateTour.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        activityType: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
        guideType: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        route: PropTypes.array.isRequired,

    })
};

export default connect(store => {
    return {
        state: store.createTour
    }
})(withRouter(CreateTour));