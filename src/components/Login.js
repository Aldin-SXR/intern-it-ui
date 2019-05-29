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
            mode: "login",
            email: "",
            password: "",
            error: false,
            loading: false,
            error_message: "",
            register_state: {
                name: "",
                email_address: "",
                mobile_number: "",
                username: "",
                password: "",
                re_password: ""
            }
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

    handleRegisterSubmit = e => {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState(
                {
                    loading: false,
                    register_state: {
                        name: "",
                        email_address: "",
                        mobile_number: "",
                        username: "",
                        password: "",
                        re_password: ""
                    },
                    mode: "login"
                },
                () => {
                    Toast.make(
                        "success",
                        "Registered account!",
                        "Account created successfully!"
                    );
                }
            );
        }, 1500);
    };

    handleRegisterChange = (e, { name, value }) => {
        let register_state = JSON.parse(
            JSON.stringify(this.state.register_state)
        );
        register_state[name] = value;
        this.setState({
            register_state
        });
    };

    submitForm = () => {
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
                    {/* <Container> */}
                    <Menu.Item as="a" header>
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
                                {this.state.mode === "login" ? (
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
                                        <Message>
                                            New to us?{" "}
                                            <span
                                                style={{
                                                    color: "#0645AD",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => {
                                                    this.setMode("register");
                                                }}
                                            >
                                                Sign up
                                            </span>
                                        </Message>
                                    </div>
                                ) : (
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
                                            onSubmit={this.handleRegisterSubmit}
                                            loading={this.state.loading}
                                        >
                                            <Segment stacked>
                                                <Form.Input
                                                    fluid
                                                    icon="user"
                                                    iconPosition="left"
                                                    name="name"
                                                    placeholder="Name and surname"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="mail"
                                                    iconPosition="left"
                                                    name="email_address"
                                                    placeholder="Email address"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="phone"
                                                    iconPosition="left"
                                                    name="mobile_number"
                                                    placeholder="Mobile phone number"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="user secret"
                                                    iconPosition="left"
                                                    name="username"
                                                    placeholder="Username"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="lock"
                                                    iconPosition="left"
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="unlock"
                                                    iconPosition="left"
                                                    placeholder="Retype password"
                                                    type="password"
                                                    name="re_password"
                                                    onChange={
                                                        this
                                                            .handleRegisterChange
                                                    }
                                                />

                                                <Button
                                                    color="blue"
                                                    fluid
                                                    size="large"
                                                >
                                                    Register
                                                </Button>
                                            </Segment>
                                        </Form>
                                        <Message>
                                            Already have an account?{" "}
                                            <span
                                                style={{
                                                    color: "#0645AD",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => {
                                                    this.setMode("login");
                                                }}
                                            >
                                                Log in
                                            </span>
                                        </Message>
                                    </div>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
