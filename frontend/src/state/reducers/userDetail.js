export default function reducer(state = {
    loading: true,
    data: undefined,
    error: ''
}, action) {
    switch (action.type) {
        case ('USER_DETAIL_FETCH_DATA_PENDING'): {
            return {...state, loading: true};
        }
        case ('USER_DETAIL_FETCH_DATA_FULFILLED'): {
            return {...state, loading: false, data: action.payload};
        }
        case ('USER_DETAIL_FETCH_DATA_REJECTED'): {
            return {...state, loading: false, error: action.payload};
        }
    }
    return {...state};
};