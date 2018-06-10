import {applyMiddleware, compose, createStore} from 'redux'
import promise from 'redux-promise-middleware';
import thunk from "redux-thunk";
import reducer from './reducers'


const middleware = applyMiddleware(promise(), thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(middleware));