import FileUploadService from "../../services/FileUploadService"

export default function reducer(state = {
    fileUpload: {
        file: {},
        uploadedUrl: '',
        uploading: false,
        success: '',
        error: ''

    }
}, action) {
    switch (action.type) {
        case ('FILE_UPLOAD_CHANGED'): {
            return {
                ...state,
                fileUpload: {...state.fileUpload, ...action.payload, uploading: false, error: '', uploadedUrl: ''}
            };
        }
        case ('FILE_UPLOAD_FULFILLED'): {
            return {
                ...state,
                fileUpload: {
                    file: {},
                    uploadedUrl: FileUploadService.getFileURL(action.payload.sys_file_name),
                    uploading: false,
                    success: 'File was uploaded successfully!',
                    error: ''
                }
            };
        }
        case ('FILE_UPLOAD_PENDING'): {
            return {...state, fileUpload: {...state.fileUpload, uploading: true, success: ''}};
        }
        case ('FILE_UPLOAD_REJECTED'): {
            return {
                ...state,
                fileUpload: {...state.fileUpload, uploading: false, success: '', error: 'Something went wrong :('}
            };
        }
    }
    return {...state};
};