import ImageUploadService from "../../services/ImageUploadService";

export function uploadImage(file) {
    return {
        type: 'IMAGE_UPLOAD',
        payload: ImageUploadService.uploadImage(file)
    }
}

export function changeImage(value) {
    return {
        type: 'IMAGE_UPLOAD_CHANGED',
        payload: value
    }
}