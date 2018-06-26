import TourService from "../../services/TourService";

export function changeFilters(data) {
    return {
        type: 'FILTERS_CHANGED',
        payload: data
    }
}

export function fetchTours(data = {}, skip, timeout) {
    return {
        type: 'FETCH_TOURS',
        payload: TourService.getTours(data, skip, timeout).then(payload => {
            return {data: payload, skip}
        })
    }
}

export function clearTours() {
    return {
        type: 'CLEAR_TOURS',
    }
}

export function toggleInfobox(id) {
    return {
        type: 'TOUR_LIST_TOGGLE_INFOBOX',
        payload: id
    }
}

