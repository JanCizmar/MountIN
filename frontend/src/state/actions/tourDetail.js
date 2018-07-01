import TourService from "../../services/TourService";

export function getTourData(id) {
    return {
        type: 'TOUR_DETAIL_FETCH_DATA',
        payload: TourService.getTourDetails(id)
    }
}

export function joinTourToggle() {
    return {
        type: 'TOUR_JOIN_TOGGLE',
    }
}

export function joinToggleConfirmed(id, state) {
    return {
        type: 'TOUR_JOIN_TOGGLE_CONFIRMED',
        payload: TourService.joinTourToggle(id, state)
    }
}


export function closeModal() {
    return {
        type: 'TOUR_JOIN_CLOSE_MODAL',
    }
}

export function deleteTourToggle() {
    return {
        type: 'TOUR_DELETE_TOGGLE',
    }
}

export function deleteToggleConfirmed(id) {
    return {
        type: 'TOUR_DELETE_TOGGLE_CONFIRMED',
        payload: TourService.deleteTour(id)
    }
}


export function closeDeleteTourModal() {
    return {
        type: 'TOUR_DELETE_CLOSE_MODAL',
    }
}
export function clearState() {
    return{
        type: 'TOUR_DETAIL_CLEAR_STATE'
    }
}