import React from "react";
import { Button, Header, Icon, Modal, Grid, Image, TransitionablePortal } from "semantic-ui-react";
import * as Toast from "../utils/toaster";

const SkillDialog = ({ open, name, image, description, saveState }) => (
    <TransitionablePortal
        open={open}
        transition={{ animation: "scale", duration: 300 }}
    >
        <Modal open={open} closeOnDimmerClick={true} closeIcon onClose={() => saveState("open", false)}>
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
                <Button.Group>
                    <Button
                        onClick={() => {
                            saveState("open", false);
                        }}
                    >
                        Close
                    </Button>
                    <Button.Or />
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
                </Button.Group>
            </Modal.Actions>
        </Modal>
    </TransitionablePortal>
);

export default SkillDialog;
