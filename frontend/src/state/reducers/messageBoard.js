import {
    ADD_EMOJI,
    CLEAR_CURRENT_MESSAGE,
    CLEAR_MESSAGES,
    FETCH_HISTORY_ERROR,
    FETCH_HISTORY_REQUEST,
    FETCH_HISTORY_SUCCESS,
    RESET_SCROLL_DOWN,
    TOGGLE_EMOJI_PICKER,
    UPDATE_CURRENT_MESSAGE,
    UPDATE_MESSAGES
} from "../actions/messageBoard";
import {combineReducers} from "redux";

function messages(messages = [], action) {
    switch (action.type) {
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
    switch (action.type) {
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
    switch (action.type) {
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
    switch (action.type) {
        case TOGGLE_EMOJI_PICKER:
            return !showEmojiPicker;
        default:
            return showEmojiPicker;
    }
}

function scrollDown(scrollDown = false, action) {
    switch (action.type) {
        case FETCH_HISTORY_SUCCESS:
            return true;
        case UPDATE_MESSAGES:
            return action.message.userId === action.userId;
        case RESET_SCROLL_DOWN:
            return false;
        default:
            return scrollDown;
    }
}



export default combineReducers({
    messages,
    currentMessage,
    fetchState,
    showEmojiPicker,
    scrollDown
});


