import React from 'react';
import Page from './Page';
import {withRouter} from "react-router-dom";
import { Button } from 'react-bootstrap'

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.props.onImageChange({
                file: file,
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.props;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);

        }
        return (
            <Page>
                <div className="previewComponent">
                    <form onSubmit={(e)=> {return this._handleSubmit(e);}}>
                        <input className="fileInput"
                               type="file"
                               accept="image/!*"
                               onChange={(e)=>this._handleImageChange(e)} />
                        <div className="imgPreview">
                            {$imagePreview}
                         </div>
                        <Button className="submitButton" type="button" onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
                    </form>
                </div>
            </Page>
        )
    }
}

export default withRouter(ImageUpload);