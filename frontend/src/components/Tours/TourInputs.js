import React from 'react';
import {Col, FormGroup, Row,Button,  ControlLabel, FormControl} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import {TourActivityType} from "./CreateTourInputs/TourActivityType";
import {TourDifficulty} from "./CreateTourInputs/TourDifficulty";
import {TourGuideType} from "./CreateTourInputs/TourGuideType";
import {TourPrice} from "./CreateTourInputs/TourPrice";
import {Map} from './../Map';
import {compose, withHandlers} from "recompose";
import PropTypes from 'prop-types';
import * as actions from "../../state/actions/createTour";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Page from '../Page';



export const CreateTour = compose(
    withHandlers(
        {
            onChange: props => property => val => {
                props.dispatch(actions.changeFilters({...props.state.toursInput, [property]: val, changedInput: props.state.toursInput.changedInput}));

            },
            getValidState: props => property => {
                {
                    if (!props.state.toursInput.changedInput.includes(property)) return null;

                    switch (property) {
                        case "name":
                            if(!props.state.toursInput[property].length)
                                return "error";
                            break;


                        case "description": {
                            if(!props.state.toursInput[property].length)
                                return "error";
                            break;
                        }
                        case "date": {
                            if(!props.state.toursInput[property].length)
                                return "error";
                            break;
                        }
                        case "activityType": {
                            if(!props.state.toursInput[property].length)
                                return "error";
                            break;
                        }
                        case "difficulty":{
                            if(!props.state.toursInput[property].length)
                                return "error";
                            break;
                        }
                        case "guideType": {
                            if(!props.state.toursInput[property].length)
                                return "error";

                        }
                    }
                }
            },

            submit: props => event=>{
                event.preventDefault();
                props.dispatch(actions.createTours(props.state.toursInput));
            }
         }
    ))(props =>
    <Page>
        <form onSubmit={props.submit}>
            <div className="filters-wrapper">
                <Row>
                    <Col md={6} sm={6}>
                        <FormGroup
                            controlId="name"
                            validationState={props.getValidState('name')}
                        >
                            <ControlLabel>Name of the Tour</ControlLabel>
                            <FormControl
                                name="name"
                                type="text"
                                value={props.state.toursInput.name}
                                placeholder="Name of the Tour"
                                onChange={event => props.onChange('name')(event.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6}>
                        <FormGroup
                            controlId="description"
                            validationState={props.getValidState('description')}
                        >
                            <ControlLabel>Description of the Tour</ControlLabel>
                            <FormControl
                                name="description"
                                type="text"
                                value={props.state.toursInput.description}
                                placeholder="Write a brief description of the tour"
                                onChange={event => props.onChange('description')(event.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3} sm={6}>
                       {/* <FormGroup
                            controlId="date"
                            validationState={props.getValidState('date')}>
                            <DatePicker
                                onChange={props.onChange('date')}
                                value={props.state.toursInput.date}
                                placeholder="Date"
                                showTimeSelect
                            />
                        </FormGroup>*/}
                    </Col>
                    <Col md={3} sm={6}>
                        <FormGroup
                            controlId="date"
                            validationState={props.getValidState('date')}>
                            <DateTimePicker
                                onChange={props.onChange('date')}
                                value={props.state.toursInput.date}
                                placeholder="Date"
                                minDate={new Date()}
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={3}>
                        <TourActivityType  validationState={props.getValidState('activityType')}
                                           onChange={props.onChange('activityType')}
                                           value={props.state.toursInput.activityType}/>
                    </Col>
                    <Col md={3}>
                        <TourDifficulty  validationState={props.getValidState('difficulty')}
                                        onChange={props.onChange('difficulty')}
                                        value={props.state.toursInput.difficulty}/>
                    </Col>
                    <Col md={3}>
                        <TourGuideType   validationState={props.getValidState('guideType')}
                                        onChange={props.onChange('guideType')}
                                        value={props.state.toursInput.guideType}/>
                    </Col>
                    <Col md={3}>
                        {props.state.toursInput.guideType===1 &&
                        <TourPrice onChange={props.onChange('price')}
                                   value={props.state.toursInput.price}/>}
                    </Col>
                    <Col md={3}>
                        {props.state.toursInput.guideType===2 &&
                        <TourPrice clname="hidden" onChange={props.onChange('price')}
                                   value={props.state.toursInput.price=0}/>}
                    </Col>
                </Row>
                <Row>
                    <Map waypoints={props.state.toursInput.route} draggable={true} onDirectionsChanged={props.onChange('route')}/>
                </Row>

            </div>
            <Button className="create-tour-button" id="submit" type="submit"
                    disabled={props.getValidState()}
            >Register</Button>
            <Col className="name" md={12} sm={12}>
            </Col>
        </form>
    </Page>
);
//#todo: include route, name of tour="",description="",image="", difficulty, type, cost, creator
CreateTour.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        activityType: PropTypes.number.isRequired,
        difficulty: PropTypes.number.isRequired,
        guideType: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        route:PropTypes.array.isRequired,

    })
};

export default connect(store => {
    return {
        state: store.createTour
    }
})(withRouter(CreateTour));