import React from 'react';
import ImageUpload  from '../components/ImageUploader'

export class ImageUploadView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ImageUpload />
        );
    }
}