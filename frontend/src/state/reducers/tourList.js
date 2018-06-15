export default function reducer(state = {
    loading: true,
    tours: [],
    filtersValue: {
        location: {
            name: "",
            latLng: {}
        },
        activityTypes: [],
        difficulties: [],
        guideTypes: [],
        price: [0, 500]
    }
}, action) {
    switch (action.type) {
        case ('FILTERS_CHANGED'): {
            return {...state, filtersValue: action.payload};
        }
        case ('FETCH_TOURS_FULFILLED'): {
            return {...state, tours: action.payload, loading: false};
        }
        case ('FETCH_TOURS_PENDING'): {
            return {...state, loading: true};
        }
    }

    return {...state};
};