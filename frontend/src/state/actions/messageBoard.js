import MessageService from "../../services/MessageService";


export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_ALL_MESSAGES = 'FETCH_ALL_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET';

export function sendMessage(messageData) {
    MessageService.sendMessage(messageData).then(() => {
        return {
            type: SEND_MESSAGE,
            message: messageData
        }
    });
}

export function fetchMessageHistory(tourId, timeout) {
    return {
        type: FETCH_ALL_MESSAGES,
        messages: MessageService.getMessageHistory(tourId, timeout).then(messages => {
            return messages
        })
    }
}

export function updateMessages(message) {
    return {
        type: UPDATE_MESSAGES,
        message: message
    }
}

export function connectToSocket(tourId, timeout) {
    return {
        type: CONNECT_TO_SOCKET,
        socket: MessageService.getSocket()
    }
}