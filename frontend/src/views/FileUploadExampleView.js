import React from 'react';
import FileUpload from '../components/FileUpload'
import {connect} from "react-redux";
import * as fileUploadActions from '../state/actions/fileUpload';
import Page from "../components/Page";
import Grid from "react-bootstrap/es/Grid";
import fileUploadExample from "../state/reducers/fileUpload";


const FileUploadExampleView = (props) => {
    const onFileUploadSubmit = () => {
        props.dispatch(fileUploadActions.uploadFile(props.state.fileUpload.file));
    };

    return (
        <Page>
            <Grid>
                <FileUpload {...props.state.fileUpload} onSubmit={onFileUploadSubmit}
                             onChange={(val) => props.dispatch(fileUploadActions.changeFile(val))}/>
            </Grid>
        </Page>
    );
};

export default connect(store => {
    return {
        state: store.fileUploadExample
    }
})(FileUploadExampleView);