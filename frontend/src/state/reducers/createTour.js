import ImageUploadService from "../../services/ImageUploadService";

export default function reducer(state = {
    toursInput: {
        name: "",
        description:"",
        difficulty: 0,
        guideType: "",
        cost: 0,
        route:[],
        activityType: 0,
        date:"",
        changedInput: []
    },
    imageUpload: {
        file: {},
        imagePreviewUrl: '',
        uploadedUrl: '',
        uploading: false,
        error: ''

    }
}, action) {
    switch (action.type) {
        case ('CREATE_TOURS'):{
            return {...state, toursInput: action.payload}
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