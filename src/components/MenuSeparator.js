import React from 'react'
import { Grid } from 'semantic-ui-react';

const MenuSeparator = (props) => {
    return (
        <Grid>
            <Grid.Column style={{ marginTop: "7em" }} only="computer tablet"></Grid.Column>
            <Grid.Column style={{ marginTop: props.app === "admin" ? "17em" : "11em" }} only="mobile"></Grid.Column>
        </Grid>
    )
}

export default MenuSeparator;