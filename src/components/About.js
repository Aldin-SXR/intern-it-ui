import React from "react";
import AboutImage from "../img/logo_transparent.png";
import { Container, Header, Grid, Image } from "semantic-ui-react";

const About = props => {
    return (
        <div>
            <Container fluid>
                <Header as="h1" color="black" textAlign="center">
                    About Us
                </Header>
                <br />
                <br />
                <Grid stackable columns={2} divided centered>
                    <Grid.Row>
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
                                    <Grid.Column width={15}>
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
