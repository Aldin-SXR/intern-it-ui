import React, { Component } from 'react'
import { Grid, Header, Icon, Divider, Segment, Card, Image, Statistic, Item, Input, List } from 'semantic-ui-react';

import faker from "faker";

class Profile extends Component {
    state = {
        name: "Aldin Kovačević",
        occupation: "Undergraduate Student",
        bio: "A student at International Burch University, Department of Information Technologies, hard-working, meticulous, highly motivated and willing to learn and adapt to new technologies. Primary areas of interest include embedded systems, machine learning and data science, PHP and Python programming. I am proficient in C and C++ programming and have experience with graphic design software (Adobe Photoshop and InDesign) - all self-taught.",
        image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        joined: new Date().toDateString(),
        address: "Safvet-bega Bašagića br. 1, 76101 Brčko",
        phone: "+387603383856"
    }

    render() {
        return (
            <div id="profile">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1'>
                                <Icon name='user' />
                                <Header.Content>
                                    Profile
                                    <Header.Subheader>View and edit your personal information.</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row>
                        <Grid columns={3} divided stackable>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Segment>
                                        <Grid stackable columns={2}>
                                            <Grid.Column>
                                                <Card>
                                                    <Image src={this.state.image} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>{this.state.name}</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>{this.state.occupation}</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                            {this.state.bio}
                                                        </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='user' />
                                                            Joined: {this.state.joined}
                                                        </a>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                            <Grid.Column >
                                                <Header as='h2'>
                                                    <Icon name='trophy' />
                                                    <Header.Content>
                                                        SKILL POINTS
                                                        <Header.Subheader>350 skill points</Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                                <Divider></Divider>
                                                <Header as="h4" style={{ marginBottom: '2em' }}>
                                                    <Icon name="info" />
                                                    <Header.Content>
                                                        Additional information
                                                        {/* <Header.Subheader>350 skill points</Header.Subheader> */}
                                                    </Header.Content>
                                                </Header>
                                                <Grid.Row style={{ marginBottom: '1em' }}>
                                                    <Grid.Column>
                                                        <Header as="h5">
                                                            <Icon name="address book" />
                                                            <Header.Content>
                                                                Address:
                                                            <Header.Subheader>{this.state.address}</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row style={{ marginBottom: '1em' }}>
                                                    <Grid.Column>
                                                        <Header as="h5">
                                                            <Icon name="address book" />
                                                            <Header.Content>
                                                                Phone number:
                                                            <Header.Subheader>{this.state.phone}</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                {/* <Statistic size="small" color="blue">
                                                    <Statistic.Value>
                                                        <Icon name="trophy"></Icon>
                                                        &nbsp;350
                                                     </Statistic.Value>
                                                    <Statistic.Label style={{ marginTop: '1em' }}>Total Skill Points</Statistic.Label>
                                                </Statistic> */}
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>1</Segment>
                                    <Segment>2</Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>1</Segment>
                                    <Segment>2</Segment>
                                    <Segment>3</Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Profile;