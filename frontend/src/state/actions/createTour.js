import TourService from "../../services/TourService";
import UserService from "../../services/UserService";
import LocationService from "../../services/LocationService";

export function changeFilters(data) {
    return {
        type: 'CREATE_TOURS_INPUTS_CHANGED',
        payload: data
    }
}

export function isProfessional() {
    return {
        type: 'USER_PROFESSIONAL',
        payload: UserService.getUserDetails(UserService.getCurrentUser().id)
    }
}


export function createTours(data = {}) {
    return {
        type: 'CREATE_TOURS',
        payload: TourService.createTour(data)
    }
}


export function getClientLocation() {
    return {
        type: 'GET_CLIENT_LOCATION',
        payload: LocationService.getLocation()
    }
}

export function restoreInitialState() {
    return {
        type: 'RESTORE_INITIAL_STATE'
    }
}