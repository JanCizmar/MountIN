import React, { Component,ReactPropTypes } from 'react';

import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone';


const FILE_FIELD_NAME = 'file';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </div>
    );
}

class FileUpload extends Component {

    static propTypes = {
        multiple:false // can be changed to true to include multiple
    };

    onSubmit(data) {
        var body = new FormData();
        Object.keys(data).forEach(( key ) => {
            body.append(key, data[ key ]);
        });

        console.info('POST', body, data);
        console.info('This is expected to fail:');
        fetch('' /*add the post url-loader*/, {
            method: 'POST',
            body: body,
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        const {
            handleSubmit,
            reset,
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <label htmlFor={FILE_FIELD_NAME}>Upload your Certificate</label>
                    <Field
                        name={FILE_FIELD_NAME}
                        component={renderDropzoneInput}
                    />
                </div>
                <div>
                    <button type="submit">
                        Upload
                    </button>
                    <button onClick={reset}>
                        Remove File
                    </button>
                </div>
            </form>
        );
    }
}


export default reduxForm({
    form: 'simple',
})(FileUpload);