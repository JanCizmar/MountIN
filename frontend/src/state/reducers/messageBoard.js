import {
    SEND_MESSAGE, UPDATE_MESSAGES, FETCH_ALL_MESSAGES, CONNECT_TO_SOCKET
} from "../actions/messageBoard";
import {combineReducers} from "redux";

function messages(messages = [], action) {
    switch(action.type) {
        case FETCH_ALL_MESSAGES:
            return action.messages;
        case SEND_MESSAGE:
           return [
               ...messages,
               action.message
           ];
        case UPDATE_MESSAGES:
            return [
                ...messages,
                action.message
            ];
        default:
            return messages;
    }
}

function socket(socket = null, action) {
    switch(action.type) {
        case CONNECT_TO_SOCKET:
            return action.socket;
        default:
            return socket;
    }
}

export default messageBoard = combineReducers({
    messages,
    socket
});
