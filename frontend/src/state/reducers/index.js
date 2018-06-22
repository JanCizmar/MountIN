import {combineReducers} from "redux";
import tourList from "./tourList";
import messageBoard from "./messageBoard";

export default combineReducers({
    tourList,
    messageBoard
});