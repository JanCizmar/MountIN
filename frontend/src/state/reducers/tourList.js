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
    openInfobox: undefined,
    mapView: true,
    scrollY: 0,
    mapCenter: [48.150040, 11.545055],
    zoom: 9
}, action) {
    switch (action.type) {
        case ('FILTERS_CHANGED'): {
            let mapCenter = state.mapCenter;
            if (JSON.stringify(action.payload.location.latLng) !== JSON.stringify(state.filtersValue.location.latLng))
                mapCenter = [action.payload.location.latLng.lat, action.payload.location.latLng.lng];

            return {...state, filtersValue: action.payload, mapCenter};
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
        case ('MAP_VIEW_TOGGLE'): {
            return {...state, mapView: !state.mapView};
        }
        case ('TOUR_LIST_SCROLL'): {
            return {...state, scrollY: action.payload};
        }
        case ('TOUR_LIST_TOUR_SELECTED'): {
            let selectedTour = state.tours.find(tour => tour._id === action.payload);
            return {...state, mapCenter: selectedTour.route[0], zoom: 9, openInfobox: action.payload};
        }
        case ('GET_LOCATION_FULFILLED'): {
            return {
                ...state,
                filtersValue: {
                    ...state.filtersValue,
                    location: {name: action.payload.address, latLng: action.payload.location}
                }
            };
        }
    }
    return {...state};
};