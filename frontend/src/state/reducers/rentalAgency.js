
let rentalState =
    {
        loading: true,
        data: [],

    };

export default function reducer(state = rentalState, action) {
    switch (action.type) {
        case ('FETCH_RENTAL_AGENCY_PENDING'): {
            return {...state, loading: true};
        }
        case ('FETCH_RENTAL_AGENCY_FULFILLED'): {
            return {
                ...state,
                loading: false,
                data: action.payload,

            };
        }
        case ('FETCH_RENTAL_AGENCY_REJECTED'): {
            return {...state, loading: false, error: action.payload};
        }

    }
    return {...state};
};
