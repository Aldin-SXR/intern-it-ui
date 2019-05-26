import React from 'react'
import { Grid } from 'semantic-ui-react';

const MenuSeparator = (props) => {
    return (
        <Grid>
            <Grid.Column style={{ marginTop: "3em" }} only="computer tablet"></Grid.Column>
            <Grid.Column style={{ marginTop: props.app === "company" ? "17em" : "1em" }} only="mobile"></Grid.Column>
        </Grid>
    )
}

export default MenuSeparator;