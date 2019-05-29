import React, { Component } from "react";
import {
    Grid,
    Form,
    Segment,
    Button,
    Container,
    Header,
    Icon,
    Divider
} from "semantic-ui-react";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import * as Toast from "../utils/toaster";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SemanticToastContainer } from "react-semantic-toasts";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: [43.8186281, 18.3098813],
            formData: {
                name: "",
                phone_number: "",
                email_address: "",
                message: ""
            },
            loading: false
        };
        this.initialState = this.state;
    }

    handleChange = (e, { name, value }) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[name] = value;

        this.setState({
            formData
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState(
            {
                loading: true
            },
            () => {
                setTimeout(() => {
                    this.setState(this.initialState, () => {
                        Toast.make(
                            "success",
                            "Message sent!",
                            <p>Your message has been delivered.</p>
                        );
                    });
                }, 1500);
            }
        );
    };

    render() {
        const { position } = this.state;

        return (
            <div>
                <Container fluid>
                    <SemanticToastContainer position="top-right" />
                    <Grid stackable divided padded>
                        <Grid.Row>
                            <Grid.Column style={{ textAlign: "-webkit-center" }}>
                                <Header as='h1'>
                                    <Icon name="comment alternate outline" />
                                    <Header.Content>
                                        Contact Us
                                    <Header.Subheader>Get in touch with our team.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Map
                                    style={{
                                        height: "550px",
                                        width: "auto"
                                    }}
                                    center={position}
                                    zoom={13}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                            Francuske Revolucije BB.
                                            <br />
                                            Floor -1.
                                        </Popup>
                                    </Marker>
                                </Map>
                            </Grid.Column>
                            <Grid.Column>
                                <Form
                                    size="large"
                                    onSubmit={this.handleSubmit}
                                    loading={this.state.loading}
                                >
                                    <Segment>
                                        <Header
                                            as="h2"
                                            color="black"
                                            textAlign="center"
                                        >
                                            Send us a message!
                                        </Header>
                                        <Form.Input
                                            fluid
                                            icon="user"
                                            name="name"
                                            iconPosition="left"
                                            placeholder="Full name"
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            fluid
                                            icon="phone"
                                            name="phone_number"
                                            iconPosition="left"
                                            placeholder="Phone number"
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            fluid
                                            icon="mail"
                                            name="email_address"
                                            iconPosition="left"
                                            placeholder="E-mail Address"
                                            onChange={this.handleChange}
                                        />
                                        <Form.TextArea
                                            name="message"
                                            rows={5}
                                            placeholder="Message"
                                            onChange={this.handleChange}
                                        />
                                        <Button color="blue" fluid size="large">
                                            SUBMIT
                                        </Button>
                                    </Segment>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Contact;
