import ImageUploadService from "../../services/ImageUploadService";

export default function reducer(state = {
    toursInput: {
        name: "",
        description:"",
        difficulty: "",
        guideType: "",
        cost: 0,
        route:[],
        activityType:"",
        date:"",
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
    error: ''
}, action) {
    switch (action.type) {
        case ('EDIT_FETCH_TOUR_FULFILLED'): {
            console.log()
            return {...state, toursInput: {...state.toursInput, ...action.payload, date: new Date(action.payload.date),
                    difficulty: String(action.payload.difficulty), activityType: String(action.payload.type),
                    guideType: String(action.payload.guideType)}}
                    //guideType has to be fetched from user table -> see ankitas create tour version
        }
        case ('CREATE_TOURS_PENDING'): {
            return {...state, loading: true}
        }
        case ('CREATE_TOURS_FULFILLED'): {
            return {...state, loading: false, redirect: 'tours/detail/' + action.payload._id}
        }
        case ('CREATE_TOURS_REJECTED'): {
            return {...state, loading: false, error: action.payload}
        }
        case ('CREATE_TOURS_INPUTS_CHANGED'):{
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
    }

    return {...state};
};