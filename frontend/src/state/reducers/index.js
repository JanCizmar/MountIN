import {combineReducers} from "redux";
import tourList from "./tourList";
import createTour from "./createTour"
import example from "./example";
import fileUploadExample from "./fileUpload";

export default combineReducers({
    tourList,
    createTour,
    example,
    fileUploadExample
});