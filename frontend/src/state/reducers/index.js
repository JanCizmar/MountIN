import {combineReducers} from "redux";
import tourList from "./tourList";
import example from "./example";
import messageBoard from "./messageBoard"

export default combineReducers({
    tourList,
    messageBoard,
    example
});