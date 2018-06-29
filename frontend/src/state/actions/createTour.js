import TourService from "../../services/TourService";

export function changeFilters(data) {
    return {
        type: 'CREATE_TOURS_INPUTS_CHANGED',
        payload: data
    }
}

export function createTours(data = {}) {
    return {
        type: 'CREATE_TOURS',
        payload: TourService.createTour(data).then(payload => {
            return {data: payload}
        })
    }
}