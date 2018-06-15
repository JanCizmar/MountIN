import React from 'react';
import Page from './Page';
import {withRouter} from "react-router-dom";
import { Button } from 'react-bootstrap'

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO:  upload it and return its id, from database, where the filename (name of real file saved in the filesystem - not database) should be stored.->use this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl}/>;
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <Page>
                <div className="previewComponent">
                    <form onSubmit={(e)=> {
                        return this._handleSubmit(e);
                    }}>
                        <input className="fileInput"
                               type="file"
                               accept="image/*"
                               onChange={(e)=>this._handleImageChange(e)} />
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                        <Button className="submitButton"
                                type="submit"
                                onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
                    </form>

                </div>
            </Page>
        )
    }
}

export default withRouter(ImageUpload);