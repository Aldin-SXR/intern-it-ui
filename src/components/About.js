import React from "react";
import AboutImage from "../img/logo_transparent.png";
import { Container, Header, Grid, Image, Icon, Divider } from "semantic-ui-react";

const About = props => {
    return (
        <div>
            <Container fluid>
                <br />
                <br />
                <Grid stackable divided centered padded>
                    <Grid.Row>
                        <Grid.Column style={{ textAlign: "-webkit-center" }}>
                            <Header as='h1'>
                                <Icon name="info" />
                                <Header.Content>
                                    About Us
                                    <Header.Subheader>Get acquainted with our vision.</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row columns={2}>
                        <Grid.Column width={3}>
                            <Image src={AboutImage} size="large" centered />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h2">
                                A young team with a smart vision
                            </Header>
                            <p
                                style={{
                                    fontSize: "24px"
                                }}
                            >
                                tribeOS, the team behind Intern.IT, is founded
                                on inventiveness and creativity. We seek to
                                shape the world of tomorrow, today!
                            </p>
                            <Grid stackable columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column
                                        style={{
                                            width: "1px"
                                        }}
                                    />
                                    <Grid.Column width={15} textAlign="center">
                                        <Header as="h1">
                                            <i>
                                                "Creativity is just connecting
                                                things. When you ask creative
                                                people how they did something,
                                                they feel a little guilty
                                                because they didn't really do
                                                it, they just saw something. It
                                                seemed obvious to them after a
                                                while."
                                            </i>
                                        </Header>
                                        <p
                                            style={{
                                                fontSize: "24px"
                                            }}
                                        >
                                            - Steve Jobs
                                        </p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
};

export default About;
