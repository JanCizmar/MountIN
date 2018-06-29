import {combineReducers} from "redux";
import tourList from "./tourList";
import createTour from "./createTour"
import messageBoard from "./messageBoard"
import userDetail from "./userDetail";
import tourDetail from "./tourDetail";

export default combineReducers({
    tourList,
    createTour,
    messageBoard,
    userDetail,
    tourDetail
});