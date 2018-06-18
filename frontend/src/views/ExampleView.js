import React from 'react';
import ImageUpload from '../components/ImageUploader'
import ImageUploadService from "../services/ImageUploadService";

export class ExampleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUpload: {
                file: '',
                imagePreviewUrl: ''
            }
        };
    }

    onFileUploadSubmit = () => {
        ImageUploadService.uploadImage(this.state.imageUpload.file)
            .then(console.log)
            .catch(console.log)
    };


    render() {
        return (
            <ImageUpload {...this.state.imageUpload} onSubmit={this.onFileUploadSubmit.bind(this)}
                         onImageChange={(res) => this.setState({...this.state, imageUpload: res})}/>
        );
    }
}