import TourService from "../../services/TourService";
import UserService from "../../services/UserService";

export function fetchTour(tour_id) {
    return {
        type: 'EDIT_FETCH_TOUR',
        payload: TourService.getTourDetails(tour_id)
    }
}

export function changeFilters(data) {
    return {
        type: 'EDIT_TOUR_INPUTS_CHANGED',
        payload: data
    }
}

export function editTour(data = {}) {
    return {
        type: 'UPDATE_TOUR',
        payload: TourService.update(data)
    }
}

export function restoreInitialState() {
    return {
        type: 'RESTORE_INITIAL_STATE'
    }
}