import {combineReducers} from "redux";
import tourList from "./tourList";
import messageBoard from "./messageBoard"
import userDetail from "./userDetail";
import tourDetail from "./tourDetail";

export default combineReducers({
    tourList,
    messageBoard,
    userDetail,
    tourDetail
});