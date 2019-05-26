import React, { Component } from 'react'
import { Segment, Header, Image } from 'semantic-ui-react';

class Home extends Component {
    render() {
        return (
            <div id="home" style={{ height: "auto" }}>
                <Segment basic>
                    <Header as='h3'>Application Content</Header>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
            </div>
        )
    }
}

export default Home;