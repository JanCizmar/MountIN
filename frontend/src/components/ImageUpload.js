import React from 'react';
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import Loading from "./Loading";


export const ImageUpload = (props) => {
    const handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            props.onChange({
                file: file,
                imagePreviewUrl: reader.result
            })
        };
        reader.readAsDataURL(file)
    };

    let imagePreview = props.imagePreviewUrl ? <img className="img-tour" src={props.imagePreviewUrl}/> :
        <div className="previewText">Please select an Image for Preview</div>;

    return (
        props.uploadedUrl !== '' ? <img style={{width: '100%'}} src={props.uploadedUrl} alt="Uploaded image"/> :
            <div className="imageUpload">
                {props.uploading && <Loading/> ||
                <input className="fileInput"
                       type="file"
                       accept="image/x-png,image/gif,image/jpeg"
                       onChange={handleImageChange}/>}
                <div className="imgPreview">
                    {imagePreview}
                </div>
                <Button className="imageUploadButton" onClick={props.onSubmit}>Upload Image</Button>
                {props.error !== '' && <p>{props.error}</p>}
            </div>
    )
};

export default withRouter(ImageUpload);

ImageUpload.propTypes = {
    file: PropTypes.object,
    imagePreviewUrl: PropTypes.string,
    uploadedUrl: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired

};