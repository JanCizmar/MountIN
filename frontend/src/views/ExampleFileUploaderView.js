import React from 'react';
import { render, } from 'react-dom';
import { createStore, combineReducers, } from 'redux';
import { Provider, } from 'react-redux';
import { reducer as formReducer, } from 'redux-form';

import FileUpload from '../components/FileUploader';

const reducer = combineReducers({
    form: formReducer,
});

function configureStore(initialState) {
    return createStore(reducer, initialState);
}

const store = configureStore({});
export class ExampleFileUploaderView extends React.Component {
    render(){return(

<Provider store={store}>
<FileUpload />
</Provider>
    )}
}
