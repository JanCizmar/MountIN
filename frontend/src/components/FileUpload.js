import React from 'react';
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import Loading from "./Loading";


export const FileUpload = (props) => {
    const handleFileChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            props.onChange({
                file: file,
            })
        };
        reader.readAsDataURL(file)
    };
    return (
        <div className="FileUpload">
            {props.uploading && <Loading/> ||
            <input className="fileInput"
                   type="file"
                   onChange={handleFileChange}/>}
            <Button onClick={props.onSubmit}>Upload Certificate</Button>
            {props.error !== '' && <p>{props.error}</p>}
            {props.success !== '' && <p>{props.success}</p>}
        </div>
    )
};

export default withRouter(FileUpload);

FileUpload.propTypes = {
    file: PropTypes.object,
    uploadedUrl: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    success: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired

};