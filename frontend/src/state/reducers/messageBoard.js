import {
    FETCH_HISTORY_SUCCESS, FETCH_HISTORY_REQUEST, UPDATE_MESSAGES, FETCH_HISTORY_ERROR, CLEAR_MESSAGES
} from "../actions/messageBoard";
import {combineReducers} from "redux";

function messages(messages = [], action) {
    switch(action.type) {
        case FETCH_HISTORY_SUCCESS:
            return action.messages;
        case UPDATE_MESSAGES:
            return [
                ...messages,
                action.message
            ];
        case CLEAR_MESSAGES:
            return [];
        default:
            return messages;
    }
}

function fetchState(fetchState = {}, action) {
    switch(action.type) {
        case FETCH_HISTORY_SUCCESS:
            return {
                isLoading: false,
                error: false,
            };
        case FETCH_HISTORY_ERROR:
            return {
                isLoading: false,
                error: true,
            };
        case FETCH_HISTORY_REQUEST:
            return {
                isLoading: true,
                error: null,
            };
        default:
            return fetchState;
    }
}

export default combineReducers({
    messages,
    fetchState
});


