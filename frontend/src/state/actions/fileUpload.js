import FileUploadService from "../../services/FileUploadService";

export function uploadFile(file) {
    return {
        type: 'FILE_UPLOAD',
        payload: FileUploadService.uploadFile(file)
    }
}

export function changeFile(value) {
    return {
        type: 'FILE_UPLOAD_CHANGED',
        payload: value
    }
}