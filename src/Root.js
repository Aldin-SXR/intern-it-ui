import React, { Component } from 'react'
import { Provider } from "react-redux";
import Routes from "./routes/Routes";

class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}

export default Root;