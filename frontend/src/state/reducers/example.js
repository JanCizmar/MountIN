import ImageUploadService from "../../services/ImageUploadService"

export default function reducer(state = {
    imageUpload: {
        file: {},
        imagePreviewUrl: '',
        uploadedUrl: '',
        uploading: false,
        error: ''

    }
}, action) {
    switch (action.type) {
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
                    uploadedUrl: ImageUploadService.getImageURL(action.payload.sys_file_name),
                    uploading: false,
                    error: ''
                }
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