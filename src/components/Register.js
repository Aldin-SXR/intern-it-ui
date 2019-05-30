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

class Register extends Component {
    constructor(props) {
        super(props);

        let mode = "company";

        if (props.location.search.split("=")[1]) {
            mode = props.location.search.split("=")[1];
        }

        this.state = {
            name: "",
            email_address: "",
            mobile_number: "",
            mode,
            username: "",
            password: "",
            re_password: "",
            loading: false,
            // Error variables:
            error: {
                name: false,
                email_address: false,
                mobile_number: false,
                username: false,
                password: false,
                re_password: false
            }
        };
        this.initialState = this.state;
    }

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
        let error_state = JSON.parse(JSON.stringify(this.state.error));
        /** Validate fields */

        let keys = Object.keys(error_state).filter(
            item => item !== "email_address"
        );

        keys.forEach(item => {
            if (!Validator.validateField(this.state[item])) {
                Toast.make("error", "Empty field", "Please enter a value.");
                error_state[item] = true;
                this.setState({
                    error: error_state
                });
            } else {
                this.setState({
                    error: error_state
                });
            }
        });

        if (!Validator.validateField(this.state.email_address)) {
            Toast.make(
                "error",
                "Empty field",
                "Please enter your e-mail address."
            );
            error_state["email_address"] = true;
            this.setState({
                error: error_state
            });
        } else {
            this.setState({
                error: error_state
            });
        }

        if (!Validator.validateEmail(this.state.email_address)) {
            Toast.make(
                "error",
                "Invalid e-mail",
                "Please enter a valid e-mail address."
            );
            error_state["email_address"] = true;
            this.setState({
                error: error_state
            });
        } else {
            this.setState({
                error: error_state
            });
        }

        if (
            !Validator.validateEmail(this.state.email_address) ||
            !Validator.validateField(this.state.password) ||
            !Validator.validateField(this.state.re_password) ||
            !Validator.validateField(this.state.name) ||
            !Validator.validateField(this.state.mobile_number) ||
            !Validator.validateField(this.state.username)
        ) {
            return;
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState(this.initialState, () => {
                Toast.make(
                    "success",
                    "Registered account!",
                    "Account created successfully!"
                );
                this.props.history.push("/login");
            });
        }, 1500);
    };

    handleRegisterChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        const options = [
            { key: "intern", text: "Intern", value: "intern" },
            { key: "company", text: "Company", value: "company" }
        ];

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
                        <Menu.Item
                            as="a"
                            header
                            onClick={() => {
                                this.props.history.push("/");
                            }}
                        >
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
                                                    error={
                                                        this.state.error.name
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
                                                    error={
                                                        this.state.error
                                                            .email_address
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
                                                    error={
                                                        this.state.error
                                                            .mobile_number
                                                    }
                                                />
                                                <Form.Dropdown
                                                    fluid
                                                    name="mode"
                                                    placeholder="Company or Intern?"
                                                    selection
                                                    options={options}
                                                    value={this.state.mode}
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
                                                    error={
                                                        this.state.error
                                                            .username
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
                                                    error={
                                                        this.state.error
                                                            .password
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
                                                    error={
                                                        this.state.error
                                                            .re_password
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
                                                    this.props.history.push(
                                                        "/login"
                                                    );
                                                }}
                                            >
                                                Log in
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

export default Register;
