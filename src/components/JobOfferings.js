import React, { Component } from 'react'
import { Grid, Header, Icon, Divider } from 'semantic-ui-react';

class Offerings extends Component {
    render() {
        return (
            <div id="job-offerings">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1'>
                                <Icon name='suitcase' />
                                <Header.Content>
                                    Job Offerings
                                    <Header.Subheader>Find great internships and valuable opportunities.</Header.Subheader>
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

export default Offerings;
