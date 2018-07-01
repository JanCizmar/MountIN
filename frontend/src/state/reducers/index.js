import {combineReducers} from "redux";
import tourList from "./tourList";
import createTour from "./createTour"
import messageBoard from "./messageBoard"
import userDetail from "./userDetail";
import tourDetail from "./tourDetail";
import tourEdit from "./tourEdit";
import userSignUp from "./userSignup";

export default combineReducers({
    tourList,
    createTour,
    messageBoard,
    userDetail,
    tourDetail,
    tourEdit,
    tourDetail,
    userSignUp
});