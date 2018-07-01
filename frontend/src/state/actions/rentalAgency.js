import RentalAgencyService from "../../services/RentalAgencyService";

export function fetchRentalAgencies() {
    return {
        type: 'FETCH_RENTAL_AGENCY',
        payload: RentalAgencyService.getRentalAgencies()
        }
}
