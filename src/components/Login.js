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
    Menu
} from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import Validator from "../utils/validationUtils";
import * as Toast from "../utils/toaster";

/* Import images */
import logo from "../img/logo.png";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
            loading: false,
            error_message: "",
            allowedUser: {
                username: "aldin@tribeos.io",
                password: "tribeOS2019testing"
            },
            // Error variables
            usernameError: false,
            passwordError: false
        };
    }

    setMode = mode => {
        this.setState({
            mode
        });
    };

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
        /** Validate fields */
        if (!Validator.validateField(this.state.email)) {
            Toast.make(
                "error",
                "Empty field",
                "Please enter your e-mail address."
            );
            this.setState({
                usernameError: true
            });
        } else {
            this.setState({
                usernameError: false
            });
        }
        
        if (!Validator.validateField(this.state.password)) {
            Toast.make(
                "error",
                "Empty field",
                "Please enter your password."
            );
            this.setState({
                passwordError: true
            });
        } else {
            this.setState({
                passwordError: false
            });
        }

        if (!Validator.validateField(this.state.email) || !Validator.validateField(this.state.password)) {
            return;
        }

        if (!Validator.validateEmail(this.state.email)) {
            Toast.make(
                "error",
                "Invalid e-mail",
                "Please enter a valid e-mail address."
            );
            this.setState({
                usernameError: true
            });
        } else {
            this.setState({
                usernameError: false
            });
        }

        if (!Validator.validateEmail(this.state.email)) {
            return;
        }
        
        if (this.state.email !== this.state.allowedUser.username) {
            Toast.make(
                "error",
                "Invalid email",
                "This email is not registered with our service."
            );
            return;
        }

        if (this.state.password !== this.state.allowedUser.password) {
            Toast.make(
                "error",
                "Invalid password",
                "The password you provided is incorrect. Please try again."
            );
            return;
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState(
                {
                    loading: false
                },
                () => {
                    this.props.history.push("/home");
                    Toast.make(
                        "success",
                        "Logged in!",
                        "Logged in successfully!"
                    );
                }
            );
        }, 1500);
    };

    render() {
        return (
            // eslint-disable-next-line
            <div id="login-form" id="landing_header">
                <div className="layer">
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
                        {/* <Container> */}
                        <Menu.Item as="a" header onClick={() => { this.props.history.push("/") }}>
                            <Image
                                src={logo}
                                style={{ marginRight: "0.5em", width: "3em" }}
                            />
                            Intern.IT | Internship made simple.
                        </Menu.Item>
                        {/* </Container> */}
                    </Menu>
                    <Grid
                        textAlign="center"
                        style={{ height: "100%" }}
                        verticalAlign="middle"
                    >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Card fluid>
                                <Card.Content>
                                    <div>
                                        <Header
                                            as="h2"
                                            color="black"
                                            textAlign="center"
                                        >
                                            <Image src={logo} />{" "}
                                            <span
                                                style={{
                                                    color: "#1878C2",
                                                    marginLeft: "1%"
                                                }}
                                            >
                                                Intern
                                            </span>
                                            .IT
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
                                                    error={this.state.usernameError}
                                                />
                                                <Form.Input
                                                    fluid
                                                    name="password"
                                                    icon="lock"
                                                    iconPosition="left"
                                                    placeholder="Password"
                                                    type="password"
                                                    onChange={this.handleChange}
                                                    error={this.state.passwordError}
                                                />
                                                <Button
                                                    color="blue"
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
                                                <p>
                                                    {this.state.error_message}
                                                </p>
                                            </Message>
                                        )}
                                        <Message color="blue">
                                            New to us?{" "}
                                            <span
                                                style={{
                                                    color: "#0645AD",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => {
                                                    this.props.history.push(
                                                        "/register"
                                                    );
                                                }}
                                            >
                                                Sign up
                                            </span>
                                        </Message>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Login;
