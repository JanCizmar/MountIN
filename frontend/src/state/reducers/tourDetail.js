import UserService from "../../services/UserService";

export default function reducer(state = {
    loading: true,
    data: undefined,
    error: '',
    joined: false,
    showJoinDialog: false,
    showLeaveDialog: false
}, action) {
    switch (action.type) {
        case ('TOUR_DETAIL_FETCH_DATA_PENDING'): {
            return {...state, loading: true};
        }
        case ('TOUR_DETAIL_FETCH_DATA_FULFILLED'): {

            let joined = !!action.payload.participants.find(participant => participant._id === UserService.getCurrentUser().id);
            return {...state, loading: false, data: action.payload, joined};
        }
        case ('TOUR_DETAIL_FETCH_DATA_REJECTED'): {
            return {...state, loading: false, error: action.payload};
        }
        case ('TOUR_JOIN_TOGGLE'): {
            return {...state, showJoinDialog: !state.joined, showLeaveDialog: state.joined};
        }
        case ('TOUR_JOIN_CLOSE_MODAL'): {
            return {...state, showJoinDialog: false, showLeaveDialog: false};
        }
        case ('TOUR_JOIN_TOGGLE_CONFIRMED_FULFILLED'): {
            let joined = !!action.payload.participants.find(participant => participant._id === UserService.getCurrentUser().id);
            return {...state, showJoinDialog: false, showLeaveDialog: false, data: action.payload, joined};
        }
        case ('TOUR_JOIN_TOGGLE_CONFIRMED_REJECTED'): {
            return {...state, error: action.payload};
        }

    }
    return {...state};
};