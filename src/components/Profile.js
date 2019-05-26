import React, { Component } from 'react'

import { Grid, Card, Form, Input, Divider, Header, Icon, Button } from 'semantic-ui-react';

import Validator from "../utils/validationUtils";
import * as Toast from "../utils/toaster";
import * as Config from "../config";
import Axios from "../utils/Axios";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            rePassword: "",
            currentPassword: "",
            formLoading: false,
            passwordScore: null,
            // Error labels.
            newPasswordError: false,
            rePasswordError: false,
            currentPasswordError: false,
            // Visibility
            newPasswordVisible: false,
            rePasswordVisible: false,
            currentPasswordVisible: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value,
            [`${name}Error`]: false
        });
    }

    updatePassword = () => {
        /* Check for empty fields  */
        if (!Validator.validateField(this.state.newPassword) || !Validator.validateField(this.state.rePassword) || !Validator.validateField(this.state.currentPassword)) {
            Toast.make("error", "Cannot update password", <p>You did not properly fill in all the fields.</p>);
            this.setState({
                newPasswordError: !Validator.validateField(this.state.newPassword) ? true : false,
                rePasswordError: !Validator.validateField(this.state.rePassword) ? true : false,
                currentPasswordError: !Validator.validateField(this.state.currentPassword) ? true : false
            });
            return;
        }
        /* Check for match between new password(s) */
        if (this.state.newPassword !== this.state.rePassword) {
            Toast.make("error", "Cannot update password", <p>The entered passwords do not match.</p>);
            this.setState({
                // newPasswordError: true,
                rePasswordError: true,
            });
            return;
        }

        /* Send out API call */
        this.setState({
            formLoading: true
        })
        Axios.put(Config.BASE_URL + "/auth/password", {
            user_id: Validator.getUserID(localStorage.getItem("loginToken")),
            old_password: this.state.currentPassword,
            new_password: this.state.newPassword
        }).then(response => {
            Toast.make("success", "Updated password", response.data.message);
            this.resetForm();
        }).catch(error => {
            Toast.make("error", "Cannot update password", error.response.data.message);
        }).finally(() => {
            this.setState({
                formLoading: false
            });
        });
    }

    resetForm = () => {
        document.querySelector("form").reset();
        this.setState({
            newPassword: "",
            rePassword: "",
            currentPassword: "",
        });
    }

    showPassword = (name) => {
        console.log(name);
        this.setState({
            [`${name}Visible`]: true
        });
    }

    render() {
        return (
            <div id="profile">
                <Grid centered verticalAlign='middle'>
                    <Grid.Column mobile={15} tablet={15} computer={8}>
                        <Card fluid>
                            <Card.Content textAlign="center">
                                <Card.Header>My Profile</Card.Header>
                                <Card.Meta>Update profile details.</Card.Meta>
                            </Card.Content>
                            <Card.Content>
                                <Header icon textAlign="center">
                                    <Icon name="lock" circular/>
                                    <Header.Content>Change Password</Header.Content>
                                </Header>
                                <Form loading={this.state.formLoading} onSubmit={this.updatePassword}>
                                    <Form.Field error={this.state.currentPasswordError}>
                                        <label>Enter your current password:</label>
                                        <Input
                                            type={this.state.currentPasswordVisible ? "text" : "password"}
                                            placeholder="Current password"
                                            icon="lock"
                                            labelPosition="left"
                                            name="currentPassword"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Divider />
                                    <Form.Field error={this.state.newPasswordError}>
                                        <label>Enter your new password:</label>
                                        <Input
                                            type="password"
                                            placeholder="New password"
                                            icon="lock"
                                            labelPosition="left"
                                            name="newPassword"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field error={this.state.rePasswordError}>
                                        <label>Re-type your new password:</label>
                                        <Input
                                            type="password"
                                            placeholder="New password"
                                            icon="lock"
                                            labelPosition="left"
                                            name="rePassword"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form>
                            </Card.Content>
                            <Card.Content textAlign="center">
                                <Button positive onClick={this.updatePassword}>
                                    Update password
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Profile;