import React, { Component } from 'react'
import { Icon, Divider, Grid, Header } from 'semantic-ui-react';

class SkillCenter extends Component {
    render() {
        return (
            <div id="skill-center">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1'>
                                <Icon name='tasks' />
                                <Header.Content>
                                    Skill Center
                                    <Header.Subheader>Gain new valuable skills and increase your market value.</Header.Subheader>
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

export default SkillCenter;