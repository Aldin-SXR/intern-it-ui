import React, { Component } from 'react';
import { Image, Menu, Container, Icon, Popup, Grid, Sidebar, Segment, Header, Responsive } from 'semantic-ui-react'
import '../css/App.css';

import Validator from "../utils/validationUtils";
import MenuSeparator from '../components/MenuSeparator';

import logo from "./../img/logo.png";

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "home",
            name: "Aldin Kovačević",
            visible: true,
            mobile: false
        }
    }

    /* Sidebar controls */
    toggleSidebar = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    componentWillReceiveProps = () => {
        this.handleComponentUpdate();
    }

    updateDimensions = () => {
        if (window.innerWidth <= 768) {
            this.setState({
                visible: false,
                mobile: true
            });
        } else {
            this.setState({
                visible: true,
                mobile: false
            });
        }
    }

    componentWillMount = () => {
        this.updateDimensions();
    }

    componentDidMount = () => {
        this.handleComponentUpdate();
        window.addEventListener("resize", this.updateDimensions);
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
                <Sidebar.Pushable style={{ transform: "none" }}>
                    <Responsive maxWidth={768}>
                        <Menu fixed="top" borderless style={{ zIndex: 200 }}>
                            <Menu.Item as="a" header onClick={this.toggleSidebar}>
                                <Icon name="sidebar" />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item active={activeItem === "profile"} name="profile" onClick={this.handleRouteChange}>
                                    <Icon name="user" />
                                    &nbsp; {this.state.name}
                                </Menu.Item>
                                <Menu.Item>
                                    <Icon name="power" />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <MenuSeparator app="intern" />
                    </Responsive>
                    <Responsive minWidth={768}>
                        <Menu fixed="top" stackable icon fluid style={{ zIndex: 200 }} borderless>
                            <Menu.Item onClick={this.toggleSidebar}>
                                <Icon name="sidebar" style={{ width: "7em" }} />
                            </Menu.Item>
                            <Menu.Item as="a" header>
                                <Image src={logo} size="mini" style={{ marginRight: '1em' }} />
                                Intern.IT | Internship made simple
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item active={activeItem === "profile"} name="profile" onClick={this.handleRouteChange}>
                                    <Icon name="user" />
                                    &nbsp; {this.state.name}
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <MenuSeparator app="intern" />
                    </Responsive>
                    <Sidebar
                        as={Menu}
                        animation="push"
                        icon="labeled"
                        vertical
                        visible={this.state.visible}
                        width="thin"
                        compact
                    >
                        <Responsive minWidth={768}>
                            {/* Placeholder segment */}
                            <Menu.Item>
                                <Grid>
                                    <Grid.Column only="computer tablet" style={{ height: '4.5em' }}></Grid.Column>
                                </Grid>
                            </Menu.Item>
                        </Responsive>
                        <Responsive maxWidth={768}>
                            {/* Placeholder segment */}
                            <Menu.Item>
                                <Grid>
                                    <Grid.Column only="mobile" style={{ height: '3.5em' }}></Grid.Column>
                                </Grid>
                            </Menu.Item>
                        </Responsive>
                        <Menu.Item as='a' >
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='suitcase' />
                            Job Offerings
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='tasks' />
                            Skill Center
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='sitemap' />
                            Best of the Best
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='user' />
                            Profile
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='power' />
                            Log Out
                        </Menu.Item>
                    </Sidebar>
                    {/* dimmed={this.state.mobile && this.state.visible} */}
                    <Sidebar.Pusher>
                        {/* Application content */}
                        {component}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default AdminApp;
