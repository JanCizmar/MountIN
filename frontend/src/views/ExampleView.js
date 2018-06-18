import React from 'react';
import ImageUpload from '../components/ImageUpload'
import {connect} from "react-redux";
import * as imageUploadActions from '../state/actions/imageUpload';
import Page from "../components/Page";
import Grid from "react-bootstrap/es/Grid";


const ExampleView = (props) => {
    const onFileUploadSubmit = () => {
        props.dispatch(imageUploadActions.uploadImage(props.state.imageUpload.file));
    };

    return (
        <Page>
            <Grid>
                <ImageUpload {...props.state.imageUpload} onSubmit={onFileUploadSubmit}
                             onChange={(val) => props.dispatch(imageUploadActions.changeImage(val))}/>
            </Grid>
        </Page>
    );
};

export default connect(store => {
    return {
        state: store.example
    }
})(ExampleView);