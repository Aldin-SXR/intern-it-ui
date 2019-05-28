import React, { Component } from 'react'
import { Grid, Header, Icon, Divider } from 'semantic-ui-react';

class Profile extends Component {
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
                </Grid>
            </div>
        )
    }
}

export default Profile;