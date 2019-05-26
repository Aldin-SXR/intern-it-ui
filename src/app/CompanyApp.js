import React, { Component } from 'react';
import {Image, Menu, Container, Popup, Icon } from 'semantic-ui-react'

import Validator from "../utils/validationUtils";
import MenuSeparator from '../components/MenuSeparator';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "overview",
            name: ""
        }
    }

    componentWillReceiveProps = () => {
        this.handleComponentUpdate();
    }
    
    componentDidMount = () => {
        this.handleComponentUpdate();
    }

    handleComponentUpdate = () => {
        // let item;
        // switch (this.props.history.location.pathname) {
        //     case '/':
        //         item = 'overview'
        //         break;
        //     case '/profile':
        //         item = 'profile';
        //         break;
        //     default: 
        //         item = 'overview'
        // }
        // /* Set active route and user name*/
        // this.setState({
        //     activeItem: item,
        //     name: this.setUserName()
        // });
        // this.logOutIfInvalid();
    }

    componentDidUpdate = (prevProps) => {

    }

    logOutIfInvalid = () => {

    }

    /* Log out */
    logOut = () => {
        // localStorage.removeItem("loginToken");
        // this.props.history.push('/login');
    }

    /* Menu route changes */
    handleRouteChange = (e, { name }) => {
        // this.setState({
        //     activeItem: name
        // });
        // /* Switch to page */
        // switch(e.target.text) {
        //     case "Overview":
        //         this.props.history.push("/");
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
                <MenuSeparator app="company"/>
                { component }
            </div>
        );
    }
}

export default App;
