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
    professional: false,
    mapCenter: [48.150040, 11.545055]
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case ('EDIT_FETCH_TOUR_FULFILLED'): {
            //console.log()
            return {...state, toursInput: {...state.toursInput, ...action.payload, date: new Date(action.payload.date),
                    difficulty: String(action.payload.difficulty), activityType: String(action.payload.type),
                    guideType: String(action.payload.guideType)}}
                    //guideType has to be fetched from user table -> see ankitas create tour version
        }
        case ('UPDATE_TOUR_PENDING'): {
            return {...state, loading: true}
        }
        case ('UPDATE_TOUR_FULFILLED'): {
            return {...state, loading: false, redirect: '/tours/detail/' + action.payload._id}
        }
        case ('UPDATE_TOUR_REJECTED'): {
            return {...state, loading: false, error: action.payload}
        }
        case ('EDIT_TOUR_INPUTS_CHANGED'): {
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
        case ('RESTORE_INITIAL_STATE'): {
            return defaultState;
        }
    }

    return {...state};
};