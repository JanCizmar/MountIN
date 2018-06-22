import ... from "../../services/...";

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_ALL_MESSAGES = 'FETCH_ALL_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export function sendMessage(messageData) {
    return {
        type: SEND_MESSAGE,
        messageData: messageData
    }
}

export function fetchHistory(tourId, timeout) {
    return {
        type: FETCH_ALL_MESSAGES
        messages:
    }
}

export function clearMessages