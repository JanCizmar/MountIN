import {combineReducers} from "redux";
import tourList from "./tourList";
import example from "./example";
import fileUploadExample from "./fileUpload";

export default combineReducers({
    tourList,
    example,
    fileUploadExample
});