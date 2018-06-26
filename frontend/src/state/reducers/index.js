import {combineReducers} from "redux";
import tourList from "./tourList";
import example from "./example";
import messageBoard from "./messageBoard"
import fileUploadExample from "./fileUpload";

export default combineReducers({
    tourList,
    messageBoard,
    example
    example,
    fileUploadExample
});