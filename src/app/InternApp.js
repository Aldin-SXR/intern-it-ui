import React, { Component } from 'react';
import { Image, Menu, Container, Icon, Popup, Grid } from 'semantic-ui-react'

import Validator from "../utils/validationUtils";
import MenuSeparator from '../components/MenuSeparator';

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // activeItem: "home",
            // name: ""
        }
    }

    componentWillReceiveProps = () => {
        this.handleComponentUpdate();
    }

    componentDidMount = () => {
        this.handleComponentUpdate();
    }

    handleComponentUpdate = () => {

    }

    componentDidUpdate = (prevProps) => {

    }

    logOutIfInvalid = () => {

    }

    /* Log out */
    logOut = () => {

    }

    /* Menu route changes */
    handleRouteChange = (e, { name }) => {
        this.setState({
            activeItem: name
        });
        // /* Switch to page */
        // switch (e.target.text) {
        //     case "Home":
        //         this.props.history.push("/");
        //         break;
        //     case "Issue Tokens":
        //         this.props.history.push("/tokens");
        //         break;
        //     case "Investors":
        //         this.props.history.push("/investors");
        //         break;
        //     case "Profile":
        //     case this.state.name:
        //         this.props.history.push("/profile");
        //         break;
        //     default:
        //         this.props.history.push("/");
        // }
    }

    setUserName = () => {
        // let token = localStorage.getItem("loginToken");
        // return Validator.getUserName(token);
    }

    render() {
        const { component } = this.props;
        const { activeItem } = this.state;
        return (
            <div className="App">
                
                <MenuSeparator app="intern"/>
                {component}
            </div>
        );
    }
}

export default AdminApp;
