import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Card,
    Menu,
    Container
} from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import Axios from "axios";

import Validator from "../utils/validationUtils";
import * as Toast from "../utils/toaster";

/* Import images */
import tribeosLogo from "../img/tribeos_logo.png";
import tribeosTextLogo from "../img/tribeOS.svg";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            loading: false,
            error_message: ""
        };
    }

    componentWillMount = () => {
        if (Validator.tokenIsValid(localStorage.getItem("loginToken"))) {
            Toast.make(
                "info",
                "Already logged in",
                <p>You are already logged in.</p>
            );
            this.props.history.push("/");
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.submitForm();
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    submitForm = () => {
        //     /* Check for empty fields */
        //     if (this.state.email === "" || this.state.password === "") {
        //         this.setState({
        //             error: true,
        //             error_message: "You did not properly fill out login details."
        //         });
        //         return;
        //     }
        //     /* Send out a request */
        //     this.setState({
        //         loading: true
        //     });
        //     Axios.post(Config.BASE_URL + "/auth/login", {
        //         email_address: this.state.email,
        //         password: this.state.password
        //     })
        //         .then(response => {
        //             this.setState({
        //                 error: false,
        //                 loading: false
        //             });
        //             localStorage.setItem(
        //                 "loginToken",
        //                 response.data.data.access_token
        //             );
        //             document.querySelector("form").reset();
        //             Toast.make(
        //                 "success",
        //                 "Logged in",
        //                 <p>You have been successfully logged in.</p>
        //             );
        //             this.props.history.push("/");
        //         })
        //         .catch(error => {
        //             this.setState({
        //                 error: true,
        //                 error_message: error.response.data.message,
        //                 loading: false
        //             });
        //         });
    };

    render() {
        return (
            <div id="login-form" style={{ backgroundColor: "#F6F6F9" }}>
                <style>
                    {`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}
                </style>
                <SemanticToastContainer position="top-right" />
                <Menu fixed="top" stackable>
                    <Container>
                        <Menu.Item as="a" header>
                            <Image
                                src={tribeosTextLogo}
                                style={{ marginRight: "1.5em", width: "10em" }}
                            />
                            Investor Portal
                        </Menu.Item>
                        <Menu.Item>
                            The Fairest, Most Profitable Advertising Marketplace
                            Ever
                        </Menu.Item>
                    </Container>
                </Menu>
                <Grid
                    textAlign="center"
                    style={{ height: "100%" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Card fluid>
                            <Card.Content>
                                <Header
                                    as="h2"
                                    color="black"
                                    textAlign="center"
                                >
                                    <Image src={tribeosLogo} />{" "}
                                    <span
                                        style={{
                                            color: "#EC8D00",
                                            marginLeft: "1%"
                                        }}
                                    >
                                        tribe
                                    </span>
                                    OS Investor Portal
                                </Header>
                                <Form
                                    size="large"
                                    onSubmit={this.handleSubmit}
                                    loading={this.state.loading}
                                >
                                    <Segment>
                                        <Form.Input
                                            fluid
                                            icon="user"
                                            name="email"
                                            iconPosition="left"
                                            placeholder="E-mail address"
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            fluid
                                            name="password"
                                            icon="lock"
                                            iconPosition="left"
                                            placeholder="Password"
                                            type="password"
                                            onChange={this.handleChange}
                                        />
                                        <Button
                                            color="orange"
                                            fluid
                                            size="large"
                                        >
                                            Login
                                        </Button>
                                    </Segment>
                                </Form>
                                {this.state.error && (
                                    <Message negative>
                                        <Message.Header>
                                            Could not log you in.
                                        </Message.Header>
                                        <p>{this.state.error_message}</p>
                                    </Message>
                                )}
                                <Message>
                                    New to us?{" "}
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://tribeos.io/investors/"
                                    >
                                        Find out more
                                    </a>
                                </Message>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
