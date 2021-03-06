import TourService from "../../services/TourService";
import LocationService from "../../services/LocationService";

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

export function toggleMapView() {
    return {
        type: 'MAP_VIEW_TOGGLE',
    }
}


export function toggleInfobox(id) {
    return {
        type: 'TOUR_LIST_TOGGLE_INFOBOX',
        payload: id
    }
}

export function scroll(y) {
    return {
        type: 'TOUR_LIST_SCROLL',
        payload: y
    }
}

export function tourSelect(id) {
    return {
        type: 'TOUR_LIST_TOUR_SELECTED',
        payload: id
    }
}

export function getLocation() {
    return {
        type: 'GET_LOCATION',
        payload: LocationService.getLocation()
    }


}
