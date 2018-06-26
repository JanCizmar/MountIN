export default function reducer(state = {
    loading: true,
    tours: [],
    hasMore: true,
    filtersValue: {
        location: {
            name: "",
            latLng: {}
        },
        activityTypes: [],
        difficulties: [],
        guideTypes: [],
        price: [0, 500]
    },
    openInfobox: undefined
}, action) {
    switch (action.type) {
        case ('FILTERS_CHANGED'): {
            return {...state, filtersValue: action.payload};
        }
        case ('FETCH_TOURS_FULFILLED'): {
            let tours = state.tours;
            tours = action.payload.skip > 0 ? tours.concat(action.payload.data) : action.payload.data;
            return {...state, tours: tours, loading: false, hasMore: action.payload.data.length > 0};
        }
        case ('FETCH_TOURS_PENDING'): {
            return {...state, loading: true};
        }
        case ('CLEAR_TOURS'): {
            return {...state, tours: []};
        }
        case ('TOUR_LIST_TOGGLE_INFOBOX'): {
            return {...state, openInfobox: state.openInfobox === action.payload ? undefined : action.payload};
        }
    }
    return {...state};
};