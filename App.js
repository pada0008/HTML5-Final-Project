import React, { Component } from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./app/reducers";
import Main from "./app/Main";
import thunk from "redux-thunk";

let initialState = {
    data: [],
    clickItem: null,
    clickFetching: false,
    clickBack: false,
    backToList: false,
    fetchData: false
};

let store = createStore(reducers, initialState, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}

