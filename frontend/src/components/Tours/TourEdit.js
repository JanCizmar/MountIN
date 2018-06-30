import React from 'react';
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import {TourActivityType} from "./CreateTourInputs/TourActivityType";
import {TourDifficulty} from "./CreateTourInputs/TourDifficulty";
import {TourGuideType} from "./CreateTourInputs/TourGuideType";
import {TourPrice} from "./CreateTourInputs/TourPrice";
import {Map} from './../Map';
import {compose, withHandlers, lifecycle} from "recompose";
import PropTypes from 'prop-types';
import * as actions from "../../state/actions/tourEdit";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Page from '../Page';
import * as imageUploadActions from "../../state/actions/imageUpload";
import ImageUpload from "../ImageUpload";


export const TourEdit = compose(
    withHandlers(
        {
            onChange: props => property => val => {
                props.dispatch(actions.changeFilters({...props.state.toursInput, [property]: val, changedInput: props.state.toursInput.changedInput}));

            },
            submit: props => event=>{
                event.preventDefault();
                props.dispatch(actions.createTours(props.state.toursInput));
            },
            onFileUploadSubmit: props => () => {
                props.dispatch(imageUploadActions.uploadImage(props.state.imageUpload.file));
            }
        }
    ),
    lifecycle({
        componentDidMount() {
            //console.log(this.props.match.params.id)
            this.props.dispatch(actions.fetchTour(this.props.match.params.id))
            console.log(this.props)
            //actions.fetchTour(this.props.match.id).then(tour => {
            //    this.setState({ tour });
            //})
        }
    })
    )(props => {
    const getValidState = (inputName)=>
    {
        return getFormValidStates()[inputName];
    };

    //Form checking: TODO when time - change feedback: https://react-bootstrap.github.io/components/forms/
    const getFormValidStates = () =>
    {   console.log(props.state.toursInput.route);
        return {
            name: props.state.toursInput.name.length ? props.state.toursInput.name.length < 3 || props.state.toursInput.name.length > 100 ? 'error' : 'success' : null,
            description: props.state.toursInput.description.length ? props.state.toursInput.description.length < 10 ? 'error' : 'success' : null,
            date: props.state.toursInput.date ? 'success' : null,
            difficulty:  props.state.toursInput.difficulty ? props.state.toursInput.difficulty === "0" || props.state.toursInput.difficulty === "1" || props.state.toursInput.difficulty === "2" ? 'success' : 'error' : null,
            activityType:  props.state.toursInput.activityType ? props.state.toursInput.activityType.length<1  ? 'error' : 'success' : null,
            guideType: props.state.toursInput.guideType ?  props.state.toursInput.guideType === "1" || props.state.toursInput.guideType === "2"? 'success' : 'error' : null,
            route:  props.state.toursInput.route === undefined || props.state.toursInput.route.length === 0 ? 'error' : 'success'
        };
    };


    const isFormValid = () =>
    {   //console.log("form validity check")
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
                        <Col sm={12} md={4} lg={4}>
                            <TourActivityType
                                onChange={props.onChange('activityType')}
                                value={props.state.toursInput.activityType}/>
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <TourDifficulty
                                onChange={props.onChange('difficulty')}
                                value={props.state.toursInput.difficulty}/>
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <TourGuideType
                                onChange={props.onChange('guideType')}
                                value={props.state.toursInput.guideType}/>
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {props.state.toursInput.guideType == 1 &&
                            <div className="upload-head">Specify the Cost of the Tour </div>}
                        </Col>
                        <Col sm={12} md={9} lg={9}>
                            {props.state.toursInput.guideType == 1 &&
                            <TourPrice onChange={props.onChange('cost')}
                                       value={props.state.toursInput.cost}/>}

                            {props.state.toursInput.guideType == 2 &&
                            <TourPrice clname="hidden" onChange={props.onChange('cost')}
                                       value={props.state.toursInput.cost = 0}/>}
                        </Col>
                    </Row>
                    {console.log(props.state.toursInput.route)}
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <div className="upload-head">Upload an Image for the Tour</div>
                            <ImageUpload {...props.state.imageUpload} onSubmit={props.onFileUploadSubmit}
                                         onChange={(val) => props.dispatch(imageUploadActions.changeImage(val))}/>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <div className="route-head">Specify the Route for the Tour</div>
                            <Map waypoints={props.state.toursInput.route} draggable={false}
                                 //onDirectionsChanged={props.onChange('route')}/
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
TourEdit.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        activityType: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
        guideType: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        route:PropTypes.array.isRequired,

    })
};

export default connect(store => {
    return {
        state: store.tourEdit
    }
})(withRouter(TourEdit));


// "use strict";
//
// import React from 'react';
//
// //import {AlertMessage} from '../AlertMessage';
// //import Page from './Page';
// //import {Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
// //import UserService from "../../services/UserService";
// import TourService from "../../services/TourService";
// import * as imageUploadActions from "../../state/actions/imageUpload";
// import {compose, withHandlers} from "recompose";
// import * as actions from "../../state/actions/createTour";
// import {withRouter} from "react-router-dom";
// import {connect} from "react-redux";
//
// import PropTypes from 'prop-types';
// import Page from "../Page";
// import {Col, FormControl, FormGroup, Row} from "react-bootstrap";
// import DateTimePicker from 'react-datetime-picker';
// import {TourActivityType} from "./CreateTourInputs/TourActivityType";
// import {TourDifficulty} from "./CreateTourInputs/TourDifficulty";
// import {TourGuideType} from "./CreateTourInputs/TourGuideType";
// import ImageUpload from "../ImageUpload";
// import {Map} from "../Map";
// import Button from "react-bootstrap/es/Button";
//
//
//
//
// class TourEdit extends React.Component {
//     constructor(props) {
//         super(props);
//
//         TourEdit.propTypes = {
//             onChange: PropTypes.func,
//             value: PropTypes.shape({
//                 name: PropTypes.string.isRequired,
//                 description:PropTypes.string.isRequired,
//                 activityType: PropTypes.string.isRequired,
//                 difficulty: PropTypes.string.isRequired,
//                 guideType: PropTypes.string.isRequired,
//                 cost: PropTypes.number.isRequired,
//                 route:PropTypes.array.isRequired,
//
//             })
//         };
//
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleFormChange = this.handleFormChange.bind(this);
//
//
//     }
//
//     gettourdetails() {
//         TourService.getTourDetails(/*todo tour_id */).then((data) => {
//             this.setState({...this.state, ...data});
//         }).catch((e) => {
//             console.error(e);
//             this.setState({
//                 error: e
//             });
//         });
//     }
//
//     componentDidMount() {
//         this.gettourdetails();
//     }
//
//
//     handleFormChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value,
//             changed: true
//         });
//     }
//
//     handleSubmit(event) {
//         event.preventDefault();
//
//         let user = {
//             username: this.state.username,
//             email: this.state.email,
//             firstName: this.state.firstName,
//             surname: this.state.surname,
//             phone: this.state.phone,
//             professional: this.state.isInstructor
//         };
//
//         this.props.onSubmit(user);
//     }
//
//     getValidState(inputName) {
//         return this.getFormValidStates()[inputName];
//     }
//
//     getFormValidStates() {
//         return {
//             name: props.state.toursInput.name.length ? props.state.toursInput.name.length < 3 || props.state.toursInput.name.length > 100 ? 'error' : 'success' : null,
//             description: props.state.toursInput.description.length ? props.state.toursInput.description.length < 10 ? 'error' : 'success' : null,
//             date: props.state.toursInput.date ? 'success' : null,
//             difficulty:  props.state.toursInput.difficulty ? props.state.toursInput.difficulty === "0" || props.state.toursInput.difficulty === "1" || props.state.toursInput.difficulty === "2" ? 'success' : 'error' : null,
//             activityType:  props.state.toursInput.activityType ? props.state.toursInput.activityType.length<1  ? 'error' : 'success' : null,
//             guideType: props.state.toursInput.guideType ?  props.state.toursInput.guideType === "1" || props.state.toursInput.guideType === "2"? 'success' : 'error' : null,
//             route:  props.state.toursInput.route === undefined || props.state.toursInput.route.length === 0 ? 'error' : 'success'
//         };
//     }
//
//     isFormValid() {
//         for (let name of Object.keys(getFormValidStates())) {
//             // console.log(name+": "+getFormValidStates()[name]);
//             if (getFormValidStates()[name] === null) return false;
//             if (getFormValidStates()[name] === 'error') return false;
//         }
//         return true;}
//
//     getValidState(inputName) {
//          return getFormValidStates()[inputName];
//     };
//
//
//
//     render() {
//         return (        <Page className="tour-create">
//             <form onSubmit={this.handleSubmit} noValidate>
//                 <div className="filters-wrapper">
//                     <Row>
//                         <Col md={6} sm={6} lg={6}>
//                             <FormGroup
//                                 controlId="name"
//                                 validationState={this.getValidState('name')}
//                             >
//                                 <FormControl
//                                     name="name"
//                                     type="text"
//                                     value={props.state.toursInput.name}
//                                     placeholder="Name of the Tour"
//                                     onChange={event => props.onChange('name')(event.target.value)}
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={6} lg={6}>
//                             <FormGroup
//                                 controlId="date"
//                                 validationState={this.getValidState('date')}>
//                                 <DateTimePicker
//                                     onChange={props.onChange('date')}
//                                     value={props.state.toursInput.date}
//                                     placeholder="Date"
//                                     minDate={(new Date())}
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col md={12} sm={12} lg={12}>
//                             <FormGroup
//                                 controlId="description"
//                                 validationState={this.getValidState('description')}
//                             >
//                                 <FormControl
//                                     name="description"
//                                     type="text"
//                                     value={props.state.toursInput.description}
//                                     placeholder="Write a brief description of the tour"
//                                     onChange={event => props.onChange('description')(event.target.value)}
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col sm={12} md={4} lg={4}>
//                             <TourActivityType
//                                 onChange={props.onChange('activityType')}
//                                 value={props.state.toursInput.activityType}/>
//                         </Col>
//                         <Col sm={12} md={4} lg={4}>
//                             <TourDifficulty
//                                 onChange={props.onChange('difficulty')}
//                                 value={props.state.toursInput.difficulty}/>
//                         </Col>
//                         <Col sm={12} md={4} lg={4}>
//                             <TourGuideType
//                                 onChange={props.onChange('guideType')}
//                                 value={props.state.toursInput.guideType}/>
//                         </Col>
//                         <Col sm={12} md={3} lg={3}>
//                             {props.state.toursInput.guideType == 1 &&
//                             <div className="upload-head">Specify the Cost of the Tour </div>}
//                         </Col>
//                         <Col sm={12} md={9} lg={9}>
//                             {props.state.toursInput.guideType == 1 &&
//                             <TourPrice onChange={props.onChange('cost')}
//                                        value={props.state.toursInput.cost}/>}
//
//                             {props.state.toursInput.guideType == 2 &&
//                             <TourPrice clname="hidden" onChange={props.onChange('cost')}
//                                        value={props.state.toursInput.cost = 0}/>}
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col sm={12} md={4} lg={4}>
//                             <div className="upload-head">Upload an Image for the Tour</div>
//                             <ImageUpload {...props.state.imageUpload} onSubmit={props.onFileUploadSubmit}
//                                          onChange={(val) => props.dispatch(imageUploadActions.changeImage(val))}/>
//                         </Col>
//                         <Col sm={12} md={8} lg={8}>
//                             <div className="route-head">Specify the Route for the Tour</div>
//                             <Map waypoints={props.state.toursInput.route} draggable={true}
//                                  onDirectionsChanged={props.onChange('route')}/>
//                         </Col>
//                     </Row>
//
//                 </div>
//                 <Button className="create-tour-button" type="submit"
//                         disabled={!isFormValid()}
//                 >Create Tour</Button>
//                 <Col className="name" md={12} sm={12}>
//                 </Col>
//             </form>
//         </Page> )}
// }
//
// export default TourEdit;




////////////////////////
// import React from 'react';
// // import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
// // import DateTimePicker from 'react-datetime-picker';
// // import {TourActivityType} from "./CreateTourInputs/TourActivityType";
// // import {TourDifficulty} from "./CreateTourInputs/TourDifficulty";
// // import {TourGuideType} from "./CreateTourInputs/TourGuideType";
// // import {TourPrice} from "./CreateTourInputs/TourPrice";
// // import {Map} from './../Map';
// // import {compose, withHandlers} from "recompose";
// // import PropTypes from 'prop-types';
// // import * as actions from "../../state/actions/createTour";
// // import {withRouter} from "react-router-dom";
// // import {connect} from "react-redux";
// // import Page from '../Page';
// // import * as imageUploadActions from "../../state/actions/imageUpload";
// // import ImageUpload from "../ImageUpload";
// // import UserService from "../../services/UserService";
// //
// // export const TourEdit = compose(
// //     withHandlers(
// //         {
// //             onChange: props => property => val => {
// //                 props.dispatch(actions.changeFilters({...props.state.toursInput, [property]: val, changedInput: props.state.toursInput.changedInput}));
// //
// //             },
// //             submit: props => event=>{
// //                 event.preventDefault();
// //                 props.dispatch(actions.createTours(props.state.toursInput));
// //             },
// //             onFileUploadSubmit: props => () => {
// //                 props.dispatch(imageUploadActions.uploadImage(props.state.imageUpload.file));
// //             }
// //         }
// //     ))(props => {
// //     const getValidState = (inputName)=>
// //     {
// //         return getFormValidStates()[inputName];
// //     };
// //     //Form checking: TODO when time - change feedback: https://react-bootstrap.github.io/components/forms/
// //     const getFormValidStates = () =>
// //     {   console.log(props.state.toursInput.route);
// //         return {
// //             name: props.state.toursInput.name.length ? props.state.toursInput.name.length < 3 || props.state.toursInput.name.length > 100 ? 'error' : 'success' : null,
// //             description: props.state.toursInput.description.length ? props.state.toursInput.description.length < 10 ? 'error' : 'success' : null,
// //             date: props.state.toursInput.date ? 'success' : null,
// //             difficulty:  props.state.toursInput.difficulty ? props.state.toursInput.difficulty === "0" || props.state.toursInput.difficulty === "1" || props.state.toursInput.difficulty === "2" ? 'success' : 'error' : null,
// //             activityType:  props.state.toursInput.activityType ? props.state.toursInput.activityType.length<1  ? 'error' : 'success' : null,
// //             guideType: props.state.toursInput.guideType ?  props.state.toursInput.guideType === "1" || props.state.toursInput.guideType === "2"? 'success' : 'error' : null,
// //             route:  props.state.toursInput.route === undefined || props.state.toursInput.route.length === 0 ? 'error' : 'success'
// //         };
// //     };
// //
// //
// //     const isFormValid = () =>
// //     {   //console.log("form validity check")
// //         for (let name of Object.keys(getFormValidStates())) {
// //             // console.log(name+": "+getFormValidStates()[name]);
// //             if (getFormValidStates()[name] === null) return false;
// //             if (getFormValidStates()[name] === 'error') return false;
// //         }
// //         return true;
// //     };
// //
// //     return (
// //
// // });
// // TourEdit.propTypes = {
// //     onChange: PropTypes.func,
// //     value: PropTypes.shape({
// //         name: PropTypes.string.isRequired,
// //         description:PropTypes.string.isRequired,
// //         activityType: PropTypes.string.isRequired,
// //         difficulty: PropTypes.string.isRequired,
// //         guideType: PropTypes.string.isRequired,
// //         cost: PropTypes.number.isRequired,
// //         route:PropTypes.array.isRequired,
// //
// //     })
// // };
// //
// // export default connect(store => {
// //     return {
// //         state: store.createTour
// //     }
// // })(withRouter(TourEdit));