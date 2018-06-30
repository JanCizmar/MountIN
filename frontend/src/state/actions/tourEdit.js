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
        type: 'CREATE_TOURS_INPUTS_CHANGED',
        payload: data
    }
}

export function updateTours(data = {}) {
    return {
        type: 'UPDATE_TOUR',
        payload: TourService.update(data)

        // type: 'CREATE_TOURS',
        // payload: TourService.update(tour).then(() => {
        //     this.props.history.push('/tours/detail/' + tour._id);
        // }).catch((e) => {
        //     console.error(e);
        //     this.setState({
        //         error: e
        //     });
        // })
      //old:
      //  TourService.createTour(data).then(payload => {
      //      return {data: payload}
       // })
    }
}