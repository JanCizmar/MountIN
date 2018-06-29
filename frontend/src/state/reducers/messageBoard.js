import {
    FETCH_HISTORY_SUCCESS, FETCH_HISTORY_REQUEST, UPDATE_MESSAGES, FETCH_HISTORY_ERROR, CLEAR_MESSAGES,
    UPDATE_CURRENT_MESSAGE, CLEAR_CURRENT_MESSAGE, TOGGLE_EMOJI_PICKER, ADD_EMOJI
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

function currentMessage(currentMessage = '', action) {
    switch(action.type) {
        case UPDATE_CURRENT_MESSAGE:
            return action.message;
        case CLEAR_CURRENT_MESSAGE:
            return '';
        case ADD_EMOJI:
            return currentMessage + action.emoji;
        default:
            return currentMessage;
    }
}

function showEmojiPicker(showEmojiPicker = false, action) {
    switch(action.type) {
        case TOGGLE_EMOJI_PICKER:
            return !showEmojiPicker;
        default:
            return showEmojiPicker;
    }
}

export default combineReducers({
    messages,
    currentMessage,
    fetchState,
    showEmojiPicker
});


