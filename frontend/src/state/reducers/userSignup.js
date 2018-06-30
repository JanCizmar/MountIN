export default function reducer(state = {
    certificateUpload: {
        file: {},
        uploadedUrl: '',
        uploading: false,
        error: '',
        success: '',
    }
}, action) {
    switch (action.type) {
        case ('FILE_UPLOAD_CHANGED'): {
            return {...state, certificateUpload: {...state.certificateUpload, file: action.payload.file}}
        }
        case ('FILE_UPLOAD_PENDING'): {
            return {...state, certificateUpload: {...state.certificateUpload, uploading: true}}
        }
        case ('FILE_UPLOAD_FULFILLED'): {
            return {
                ...state,
                certificateUpload: {...state.certificateUpload, uploading: false, uploadedUrl: action.payload}
            }
        }
        case ('FILE_UPLOAD_REJECTED'): {
            return {...state, certificateUpload: {...state.certificateUpload, uploading: false, error: action.payload}}
        }
    }

    return {...state};
};