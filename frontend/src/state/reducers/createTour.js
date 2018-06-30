import ImageUploadService from "../../services/ImageUploadService";

const defaultState = {
    toursInput: {
        name: "",
        description: "",
        difficulty: "",
        guideType: "",
        cost: 0,
        route: [],
        activityType: "",
        date: "",
        changedInput: []
    },
    imageUpload: {
        file: {},
        imagePreviewUrl: '',
        uploadedUrl: '',
        uploading: false,
        error: ''
    },
    loading: false,
    redirect: undefined,
    error: '',
    mapCenter: [48.150040, 11.545055]
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case ('CREATE_TOURS_PENDING'): {
            return {...state, loading: true}
        }
        case ('CREATE_TOURS_FULFILLED'): {
            return {...state, loading: false, redirect: 'tours/detail/' + action.payload._id}
        }
        case ('CREATE_TOURS_REJECTED'): {
            return {...state, loading: false, error: action.payload}
        }
        case ('CREATE_TOURS_INPUTS_CHANGED'): {
            return {...state, toursInput: action.payload}
        }
        case ('IMAGE_UPLOAD_CHANGED'): {
            return {
                ...state,
                imageUpload: {...state.imageUpload, ...action.payload, uploading: false, error: '', uploadedUrl: ''}
            };
        }
        case ('IMAGE_UPLOAD_FULFILLED'): {
            return {
                ...state,
                imageUpload: {
                    file: {},
                    imagePreviewUrl: '',
                    uploadedUrl: ImageUploadService.getImageURL(action.payload.large),
                    uploading: false,
                    error: ''
                },
                toursInput: {...state.toursInput, image: action.payload}
            };
        }
        case ('IMAGE_UPLOAD_PENDING'): {
            return {...state, imageUpload: {...state.imageUpload, uploading: true}};
        }
        case ('IMAGE_UPLOAD_REJECTED'): {
            return {...state, imageUpload: {...state.imageUpload, uploading: false, error: 'Something went wrong :('}};
        }
        case ('GET_CLIENT_LOCATION_FULFILLED'): {
            return {...state, mapCenter: [action.payload.location.lat, action.payload.location.lng]};
        }
        case ('RESTORE_INITIAL_STATE'):
            return defaultState;
    }

    return {...state};
};