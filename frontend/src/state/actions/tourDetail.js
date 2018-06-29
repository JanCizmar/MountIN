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

export function joinConfirmed(id) {
    return {
        type: 'TOUR_JOIN_CONFIRMED',
        payload: TourService.joinTourToggle(id)
    }
}

export function closeModal() {
    return {
        type: 'TOUR_JOIN_CLOSE_MODAL',
    }
}
