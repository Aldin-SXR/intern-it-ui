import React from "react";
import { Button, Header, Icon, Modal, Grid, Image } from "semantic-ui-react";
import * as Toast from "../utils/toaster";

const SkillDialog = ({ open, name, image, description, saveState }) => (
    <Modal open={open} closeOnDimmerClick={true}>
        <Header icon="book" content={"Enroll into course ".concat(name)} />
        <Modal.Content>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Image src={image} size="large" centered />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h2">{name}</Header>
                        <p
                            style={{
                                fontSize: "24px"
                            }}
                        >
                            {description}
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Modal.Content>
        <Modal.Actions>
            <Button
                color="green"
                onClick={() => {
                    Toast.make(
                        "success",
                        "Enrollment successful!",
                        "Enrolled into ".concat(name)
                    );
                }}
            >
                <Icon name="checkmark" /> Enroll
            </Button>
            <Button
                color="blue"
                onClick={() => {
                    saveState("open", false);
                }}
            >
                <Icon name="checkmark" /> Close
            </Button>
        </Modal.Actions>
    </Modal>
);

export default SkillDialog;
