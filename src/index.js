import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import rootReducer from "./reducers/rootReducer";
import initialState from "./initialState";
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
