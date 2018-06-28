import TourService from "../../services/TourService";

export function getTourData(id) {
    return {
        type: 'TOUR_DETAIL_FETCH_DATA',
        payload: TourService.getTourDetails(id)

    }
}
