import React, { Component } from "react";
import {
    Grid,
    Header,
    Icon,
    Divider,
    Segment,
    Card,
    Image,
    Input,
    Button,
    Label,
    TransitionablePortal,
    Modal,
    Form,
    Dropdown,
    TextArea
} from "semantic-ui-react";

import * as Toast from "../utils/toaster";
import Validator from "../utils/validationUtils";

class Profile extends Component {
    state = {
        name: "Aldin Kovačević",
        occupation: "Undergraduate Student",
        bio:
            "A student at International Burch University, Department of Information Technologies, hard-working, meticulous, highly motivated and willing to learn and adapt to new technologies. Primary areas of interest include embedded systems, machine learning and data science, PHP and Python programming. I am proficient in C and C++ programming and have experience with graphic design software (Adobe Photoshop and InDesign) - all self-taught.",
        image: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
        joined: new Date().toDateString(),
        address: "Safvet-bega Bašagića br. 1, 76101 Brčko",
        phone: "+387603383856",
        skills: [
            { name: "PHP", level: "Advanced" },
            { name: "JavaScript", level: "Beginner" },
            { name: "Blockchain Development", level: "Intermediate" },
            { name: "NodeJS", level: "Beginner" }
        ],
        formLoading: false,
        removeSkillIsOpen: false,
        addSkillIsOpen: false,
        editSkillIsOpen: false,
        updateProfileIsOpen: false,
        // skills
        skillOptions: [
            { key: "c++", value: "C++", text: "C++" },
            { key: "c#", value: "C#", text: "C#" },
            { key: "linux", value: "Linux", text: "Linux" },
            {
                key: "net",
                value: "Network Management",
                text: "Network Management"
            },
            { key: "java", value: "Java", text: "Java" }
        ],
        skillOption: "",
        skillError: false,
        // proficiencies
        proficencyOptions: [
            { key: "b", value: "Beginner", text: "Beginner" },
            { key: "i", value: "Intermediate", text: "Intermediate" },
            { key: "a", value: "Advanced", text: "Advanced" }
        ],
        proficencyOption: "",
        proficencyError: false,
        initialUser: {
            name: "Aldin Kovačević",
            occupation: "Undergraduate Student",
            bio:
                "A student at International Burch University, Department of Information Technologies, hard-working, meticulous, highly motivated and willing to learn and adapt to new technologies. Primary areas of interest include embedded systems, machine learning and data science, PHP and Python programming. I am proficient in C and C++ programming and have experience with graphic design software (Adobe Photoshop and InDesign) - all self-taught.",
            image:
                "https://react.semantic-ui.com/images/avatar/large/matthew.png",
            joined: new Date().toDateString(),
            address: "Safvet-bega Bašagića br. 1, 76101 Brčko",
            phone: "+387603383856"
        },
        nameError: false,
        occupationError: false,
        addressError: false,
        phoneError: false,
        bioError: false,
        successfulUpdate: false,
        mobile: false
    };

    updateDimensions = () => {
        if (window.innerWidth <= 768) {
            this.setState({
                mobile: true
            });
        } else {
            this.setState({
                mobile: false
            });
        }
    };

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
    };

    closeModal = name => {
        this.setState({
            [`${name}IsOpen`]: false
        });

        /* Handle Profile modal */
        if (name === "updateProfile" && !this.state.successfulUpdate) {
            this.setState(this.state.initialUser);
        }
    };

    handleSkillChange = (e, { value }) => this.setState({ skillOption: value });

    handleproficencyChange = (e, { value }) =>
        this.setState({ proficencyOption: value });

    addSkill = () => {
        /** Validations */
        if (!Validator.validateField(this.state.skillOption)) {
            Toast.make(
                "error",
                "Empty field",
                "Please select a skill from the dropdown."
            );
            this.setState({
                skillError: true
            });
        } else {
            this.setState({
                skillError: false
            });
        }

        if (!Validator.validateField(this.state.proficencyOption)) {
            Toast.make(
                "error",
                "Empty field",
                "Please select a proficiency level."
            );
            this.setState({
                proficencyError: true
            });
        } else {
            this.setState({
                skillError: false
            });
        }

        if (
            !Validator.validateField(this.state.skillOption) ||
            !Validator.validateField(this.state.proficencyOption)
        ) {
            return;
        }

        this.setState({
            formLoading: true
        });

        setTimeout(() => {
            this.setState({
                skills: [
                    ...this.state.skills,
                    {
                        name: this.state.skillOption,
                        level: this.state.proficencyOption
                    }
                ],
                formLoading: false,
                addSkillIsOpen: false
            });
            Toast.make(
                "success",
                "Successful insertion",
                "A skill was successfully added."
            );
        }, 1000);
    };

    removeSkill = () => {
        let n = JSON.parse(JSON.stringify(this.state.skills));
        n.splice(0, 1);

        this.setState({
            formLoading: true
        });

        setTimeout(() => {
            this.setState({
                skills: n,
                formLoading: false,
                removeSkillIsOpen: false
            });
            Toast.make(
                "success",
                "Successful removal",
                "Skill was successfully removed."
            );
        }, 1000);
    };

    handleAddition = (e, { value }) => {
        this.setState({
            skillOptions: [{ text: value, value }, ...this.state.skillOptions]
        });
    };

    updateProfile = () => {
        /** Validate */
        if (!Validator.validateField(this.state.name)) {
            Toast.make("error", "Empty field", "Please enter your name.");
            this.setState({
                nameError: true
            });
        } else {
            this.setState({
                nameError: false
            });
        }

        if (!Validator.validateField(this.state.occupation)) {
            Toast.make("error", "Empty field", "Please enter your occupation.");
            this.setState({
                occupationError: true
            });
        } else {
            this.setState({
                occupationError: false
            });
        }

        if (!Validator.validateField(this.state.address)) {
            Toast.make("error", "Empty field", "Please enter your address.");
            this.setState({
                addressError: true
            });
        } else {
            this.setState({
                addressError: false
            });
        }

        if (!Validator.validateField(this.state.phone)) {
            Toast.make(
                "error",
                "Empty field",
                "Please enter your phone number."
            );
            this.setState({
                phoneError: true
            });
        } else {
            this.setState({
                phoneError: false
            });
        }

        if (!Validator.validateField(this.state.bio)) {
            Toast.make(
                "error",
                "Empty field",
                "Please fill in a short biography."
            );
            this.setState({
                bioError: true
            });
        } else {
            this.setState({
                bioError: false
            });
        }

        if (
            !Validator.validateField(this.state.name) ||
            !Validator.validateField(this.state.occupation) ||
            !Validator.validateField(this.state.address) ||
            !Validator.validateField(this.state.phone) ||
            !Validator.validateField(this.state.bio)
        ) {
            return;
        }

        this.setState({
            successfulUpdate: false,
            formLoading: true
        });

        setTimeout(() => {
            this.setState({
                formLoading: false,
                updateProfileIsOpen: false,
                successfulUpdate: true
            });
            Toast.make(
                "success",
                "Successful update",
                "Your profile was successfully updated."
            );
        }, 1000);
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    openModal = name => {
        this.setState({
            [`${name}IsOpen`]: true
        });
    };

    render() {
        return (
            <div id="profile">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">
                                <Icon name="user" />
                                <Header.Content>
                                    Profile
                                    <Header.Subheader>
                                        View and edit your personal information.
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row>
                        <Grid columns={3} divided stackable>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Segment
                                        style={
                                            this.state.mobile
                                                ? { marginLeft: "2em" }
                                                : null
                                        }
                                    >
                                        <Grid stackable columns={2}>
                                            <Grid.Column>
                                                <Card fluid>
                                                    <Image
                                                        src={this.state.image}
                                                        wrapped
                                                        ui={false}
                                                    />
                                                    <Card.Content>
                                                        <Card.Header>
                                                            {this.state.name}
                                                        </Card.Header>
                                                        <Card.Meta>
                                                            <span className="date">
                                                                {
                                                                    this.state
                                                                        .occupation
                                                                }
                                                            </span>
                                                        </Card.Meta>
                                                        {/* style={{ textAlign: "justify" }} */}
                                                        <Card.Description>
                                                            {this.state.bio}
                                                        </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        {/* eslint-disable-next-line*/}
                                                        <a href="#">
                                                            <Icon name="user" />
                                                            Joined:{" "}
                                                            {this.state.joined}
                                                        </a>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as="h2">
                                                    <Icon name="trophy" />
                                                    <Header.Content>
                                                        SKILL POINTS
                                                        <Header.Subheader>
                                                            350 skill points
                                                        </Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Button
                                                            as="div"
                                                            labelPosition="right"
                                                            onClick={() => {
                                                                this.openModal(
                                                                    "addSkill"
                                                                );
                                                            }}
                                                        >
                                                            <Button color="blue">
                                                                <Icon name="plus" />
                                                                Add a new skill
                                                            </Button>
                                                            <Label
                                                                as="a"
                                                                basic
                                                                color="blue"
                                                                pointing="left"
                                                                title="Current skills"
                                                            >
                                                                {
                                                                    this.state
                                                                        .skills
                                                                        .length
                                                                }
                                                            </Label>
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Divider />
                                                <Header
                                                    as="h4"
                                                    style={{
                                                        marginBottom: "2em"
                                                    }}
                                                >
                                                    <Icon name="info" />
                                                    <Header.Content>
                                                        Additional information
                                                        {/* <Header.Subheader>350 skill points</Header.Subheader> */}
                                                    </Header.Content>
                                                </Header>
                                                <Grid.Row
                                                    style={{
                                                        marginBottom: "1em"
                                                    }}
                                                >
                                                    <Grid.Column>
                                                        <Header as="h5">
                                                            <Icon name="address book" />
                                                            <Header.Content>
                                                                Address:
                                                                <Header.Subheader>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .address
                                                                    }
                                                                </Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row
                                                    style={{
                                                        marginBottom: "1em"
                                                    }}
                                                >
                                                    <Grid.Column>
                                                        <Header as="h5">
                                                            <Icon name="phone" />
                                                            <Header.Content>
                                                                Phone number:
                                                                <Header.Subheader>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .phone
                                                                    }
                                                                </Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                {/* <Divider /> */}
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Button
                                                            icon
                                                            onClick={() => {
                                                                this.openModal(
                                                                    "updateProfile"
                                                                );
                                                            }}
                                                            color="teal"
                                                            labelPosition="left"
                                                        >
                                                            <Icon name="edit" />
                                                            Update profile
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column computer="9" tablet="9">
                                    <Segment
                                        style={
                                            this.state.mobile
                                                ? { marginLeft: "2em" }
                                                : null
                                        }
                                    >
                                        <Grid>
                                            <Grid.Row columns="1">
                                                <Grid.Column>
                                                    <Header as="h2">
                                                        <Icon name="lab" />
                                                        <Header.Content>
                                                            NOTABLE SKILLS
                                                            <Header.Subheader>
                                                                Your most
                                                                prominent
                                                                skills.
                                                            </Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Divider />
                                        <Card.Group
                                            stackable
                                            style={
                                                this.state.mobile
                                                    ? { marginTop: "2em" }
                                                    : null
                                            }
                                        >
                                            {this.state.skills.map(
                                                (skill, i) => (
                                                    <Card key={i}>
                                                        <Card.Content>
                                                            <Image
                                                                as={Icon}
                                                                floated="right"
                                                                size="mini"
                                                                name="star"
                                                            />
                                                            <Card.Header>
                                                                {skill.name}
                                                            </Card.Header>
                                                            <Card.Meta>
                                                                Proficiency
                                                                level:{" "}
                                                                {skill.level}
                                                            </Card.Meta>
                                                        </Card.Content>
                                                        <Card.Content extra>
                                                            <Button.Group fluid>
                                                                <Button color="teal">
                                                                    Edit
                                                                </Button>
                                                                <Button.Or />
                                                                <Button
                                                                    color="red"
                                                                    onClick={() => {
                                                                        this.openModal(
                                                                            "removeSkill"
                                                                        );
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Button.Group>
                                                        </Card.Content>
                                                    </Card>
                                                )
                                            )}
                                        </Card.Group>
                                    </Segment>
                                    {/* <Segment>2</Segment> */}
                                </Grid.Column>
                            </Grid.Row>
                            {/* Modals */}
                            {/* Delete skill */}
                            <TransitionablePortal
                                open={this.state.removeSkillIsOpen}
                                transition={{
                                    animation: "scale",
                                    duration: 300
                                }}
                            >
                                <Modal
                                    closeIcon
                                    size="small"
                                    onClose={() =>
                                        this.closeModal("removeSkill")
                                    }
                                    open={this.state.removeSkillIsOpen}
                                >
                                    <Header
                                        icon="trash"
                                        content="Remove skill"
                                    />
                                    <Modal.Content>
                                        Are you sure you want to remove this
                                        skill?
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button.Group>
                                            <Button
                                                onClick={() =>
                                                    this.closeModal(
                                                        "removeSkill"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button.Or />
                                            <Button
                                                negative
                                                loading={this.state.formLoading}
                                                onClick={this.removeSkill}
                                            >
                                                Remove
                                            </Button>
                                        </Button.Group>
                                    </Modal.Actions>
                                </Modal>
                            </TransitionablePortal>
                            {/* Add skill */}
                            <TransitionablePortal
                                open={this.state.addSkillIsOpen}
                                transition={{
                                    animation: "scale",
                                    duration: 300
                                }}
                            >
                                <Modal
                                    closeIcon
                                    size="small"
                                    onClose={() => this.closeModal("addSkill")}
                                    open={this.state.addSkillIsOpen}
                                >
                                    <Header icon="plus" content="Add a skill" />
                                    <Modal.Content>
                                        <Form loading={this.state.formLoading}>
                                            <Form.Field>
                                                <label>Skill</label>
                                                <Dropdown
                                                    placeholder="Select a skill"
                                                    fluid
                                                    search
                                                    clearable
                                                    selection
                                                    error={
                                                        this.state.skillError
                                                    }
                                                    allowAdditions
                                                    onAddItem={
                                                        this.handleAddition
                                                    }
                                                    value={
                                                        this.state.skillOption
                                                    }
                                                    options={
                                                        this.state.skillOptions
                                                    }
                                                    onChange={
                                                        this.handleSkillChange
                                                    }
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Proficiency level</label>
                                                <Dropdown
                                                    placeholder="Select a proficiency level"
                                                    fluid
                                                    selection
                                                    error={
                                                        this.state
                                                            .proficencyError
                                                    }
                                                    value={
                                                        this.state
                                                            .proficencyOption
                                                    }
                                                    options={
                                                        this.state
                                                            .proficencyOptions
                                                    }
                                                    onChange={
                                                        this
                                                            .handleproficencyChange
                                                    }
                                                />
                                            </Form.Field>
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button.Group>
                                            <Button
                                                onClick={() =>
                                                    this.closeModal("addSkill")
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button.Or />
                                            <Button
                                                positive
                                                loading={this.state.formLoading}
                                                onClick={this.addSkill}
                                            >
                                                Add
                                            </Button>
                                        </Button.Group>
                                    </Modal.Actions>
                                </Modal>
                            </TransitionablePortal>
                            {/* Update profile */}
                            <TransitionablePortal
                                open={this.state.updateProfileIsOpen}
                                transition={{
                                    animation: "scale",
                                    duration: 300
                                }}
                            >
                                <Modal
                                    closeIcon
                                    size="small"
                                    onClose={() =>
                                        this.closeModal("updateProfile")
                                    }
                                    open={this.state.updateProfileIsOpen}
                                >
                                    <Header
                                        icon="edit"
                                        content="Update profile details"
                                    />
                                    <Modal.Content>
                                        <Form loading={this.state.formLoading}>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Name:</label>
                                                    <Input
                                                        type="string"
                                                        icon="user"
                                                        placeholder="Name"
                                                        name="name"
                                                        value={this.state.name}
                                                        fluid
                                                        error={
                                                            this.state.nameError
                                                        }
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Occupation:</label>
                                                    <Input
                                                        type="string"
                                                        icon="building"
                                                        placeholder="Occupation"
                                                        name="occupation"
                                                        value={
                                                            this.state
                                                                .occupation
                                                        }
                                                        fluid
                                                        error={
                                                            this.state
                                                                .occupationError
                                                        }
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>
                                                        Primary address:
                                                    </label>
                                                    <Input
                                                        type="string"
                                                        icon="address book"
                                                        placeholder="Address"
                                                        name="address"
                                                        value={
                                                            this.state.address
                                                        }
                                                        fluid
                                                        error={
                                                            this.state
                                                                .addressError
                                                        }
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Phone number:</label>
                                                    <Input
                                                        type="phone"
                                                        icon="phone"
                                                        placeholder="Phone number"
                                                        name="phone"
                                                        value={this.state.phone}
                                                        fluid
                                                        error={
                                                            this.state
                                                                .phoneError
                                                        }
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group>
                                                <TextArea
                                                    placeholder="Short biography"
                                                    name="bio"
                                                    rows={5}
                                                    value={this.state.bio}
                                                    fluid
                                                    error={this.state.bioError}
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button.Group>
                                            <Button
                                                onClick={() =>
                                                    this.closeModal(
                                                        "updateProfile"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button.Or />
                                            <Button
                                                positive
                                                loading={this.state.formLoading}
                                                onClick={this.updateProfile}
                                            >
                                                Update
                                            </Button>
                                        </Button.Group>
                                    </Modal.Actions>
                                </Modal>
                            </TransitionablePortal>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Profile;
