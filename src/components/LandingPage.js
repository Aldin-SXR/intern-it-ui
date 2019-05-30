import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Input,
    TransitionablePortal,
    Modal
} from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import AvatarStudent from "../img/avatar_student-min.jpeg";
import AvatarCompany from "../img/avatar_company-min.jpeg";
import DescriptionImage from "../img/landing_desc.jpg";
import Contact from "./Contact";
import About from "./About";

import * as Toast from "../utils/toaster";
import Validator from "../utils/validationUtils";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile, setActive }) => (
    <Container text>
        <Header
            as="h1"
            content="Intern.IT"
            inverted
            style={{
                fontSize: mobile ? "2em" : "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em"
            }}
        />
        <Header
            as="h2"
            content="Internship made simple."
            inverted
            style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em"
            }}
        />
        <Button
            primary
            size="huge"
            onClick={() => {
                setActive("about");
            }}
        >
            <Icon name="graduation cap" />
            Learn More
        </Button>
    </Container>
);

const HomepageFooting = ({ mobile }) => (
    <Container text>
        <Header
            as="h1"
            content="SIGN UP NOW"
            inverted
            style={{
                fontSize: mobile ? "2em" : "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em"
            }}
        />
        <Header
            as="h2"
            content="Are you a prospective intern or a company HR representative looking for valuable employees?"
            style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em"
            }}
            inverted
        />
        <Button.Group size="huge">
            <Button
                color="teal"
                onClick={() => {
                    window.location.replace(
                        window.location.origin + "/#/register?=intern"
                    );
                }}
            >
                <Icon name="briefcase" />
                Intern
            </Button>
            <Button.Or />
            <Button
                color="blue"
                primary
                onClick={() => {
                    window.location.replace(
                        window.location.origin + "/#/register?=company"
                    );
                }}
            >
                <Icon name="building" />
                Company
            </Button>
        </Button.Group>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
};

class DesktopContainer extends Component {
    state = {
        fixed: null,
        active: "home"
    };

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    redirectTo(route) {
        window.location.replace(window.location.origin + "/#" + route);
    }

    setActive = state => {
        this.setState({ active: state });
    };

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Responsive
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign="center"
                        style={{
                            minHeight: this.state.active === "home" ? 700 : 60,
                            padding:
                                this.state.active === "home" ? "1em 0em" : null
                        }}
                        vertical
                        id={
                            this.state.active === "home"
                                ? "landing_header"
                                : null
                        }
                    >
                        <div className="layer">
                            <Menu
                                fixed={fixed ? "top" : null}
                                inverted={!fixed}
                                pointing={!fixed}
                                secondary={!fixed}
                                size="large"
                            >
                                <Container>
                                    <Menu.Item
                                        as="a"
                                        active={this.state.active === "home"}
                                        onClick={() => {
                                            this.setActive("home");
                                        }}
                                    >
                                        Home
                                    </Menu.Item>
                                    <Menu.Item
                                        as="a"
                                        active={this.state.active === "contact"}
                                        onClick={() => {
                                            this.setActive("contact");
                                        }}
                                    >
                                        Contact
                                    </Menu.Item>
                                    <Menu.Item
                                        as="a"
                                        name="about"
                                        active={this.state.active === "about"}
                                        onClick={() => {
                                            this.setActive("about");
                                        }}
                                    >
                                        About
                                    </Menu.Item>
                                    <Menu.Item position="right">
                                        <Button
                                            as="a"
                                            inverted={!fixed}
                                            onClick={() => {
                                                this.redirectTo("/login");
                                            }}
                                        >
                                            Log in
                                        </Button>
                                        <Button
                                            as="a"
                                            inverted={!fixed}
                                            primary={fixed}
                                            style={{ marginLeft: "0.5em" }}
                                            onClick={() => {
                                                this.redirectTo("/register");
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Menu.Item>
                                </Container>
                            </Menu>
                            {this.state.active === "home" && (
                                <HomepageHeading setActive={this.setActive} />
                            )}
                        </div>
                    </Segment>
                </Visibility>
                {this.state.active === "home" ? (
                    children
                ) : (
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            {this.state.active === "contact" ? (
                                <Contact />
                            ) : (
                                    <About />
                                )}
                        </div>
                    )}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
};

class MobileContainer extends Component {
    state = {
        sidebarOpened: null,
        active: "home"
    };

    redirectTo(route) {
        window.location.replace(window.location.origin + "/#" + route);
    }

    setActive = state => {
        this.setState({ active: state, sidebarOpened: false });
    };

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation="push"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item
                        as="a"
                        active={this.state.active === "home"}
                        onClick={() => {
                            this.setActive("home");
                        }}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        active={this.state.active === "contact"}
                        onClick={() => {
                            this.setActive("contact");
                        }}
                    >
                        Contact
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        active={this.state.active === "about"}
                        onClick={() => {
                            this.setActive("about");
                        }}
                    >
                        About
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        onClick={() => {
                            this.redirectTo("/login");
                        }}
                    >
                        Log in
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        onClick={() => {
                            this.redirectTo("/register");
                        }}
                    >
                        Sign Up
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{
                            minHeight: this.state.active === "home" ? 350 : 60,
                            padding: "1em 0em"
                        }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size="large">
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Button
                                        as="a"
                                        inverted
                                        onClick={() => {
                                            this.redirectTo("/login");
                                        }}
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        as="a"
                                        inverted
                                        style={{ marginLeft: "0.5em" }}
                                        onClick={() => {
                                            this.redirectTo("/register");
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        {this.state.active === "home" && (
                            <HomepageHeading mobile />
                        )}
                    </Segment>

                    {this.state.active === "home" ? (
                        children
                    ) : (
                            <div>
                                <br />
                                <br />
                                <br />
                                <br />
                                {this.state.active === "contact" ? (
                                    <Contact />
                                ) : (
                                        <About />
                                    )}
                            </div>
                        )}
                </Sidebar.Pusher>
            </Responsive>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node
};

class LandingPage extends Component {
    state = {
        subscribeIsOpen: false,
        formLoading: false,
        email: "",
        emailError: false
    }

    openModal = (name) => {

        if (name === "subscribe") {
            if (!Validator.validateField(this.state.email)) {
                Toast.make(
                    "error",
                    "Empty field",
                    "Please enter your e-mail address."
                );
                this.setState({
                    emailError: true
                })
                return;
            } else {
                this.setState({
                    emailError: false
                })
            }

            if (!Validator.validateEmail(this.state.email)) {
                Toast.make(
                    "error",
                    "Invalid email",
                    "Please enter a valid e-mail address."
                );
                this.setState({
                    emailError: true
                })
                return;
            } else {
                this.setState({
                    emailError: false
                })
            }
        }

        this.setState({
            [`${name}IsOpen`]: true
        });
    }

    closeModal = (name) => {
        this.setState({
            [`${name}IsOpen`]: false,
        });
    }

    subscribeToNewsletter = () => {
        this.setState({
            formLoading: true
        });

        setTimeout(() => {
            this.setState({
                formLoading: false,
                subscribeIsOpen: false
            });
            Toast.make("success", "Successful subscription", "You have successfully subscribed to our newsletter.")
        }, 1000);
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <ResponsiveContainer>
                <SemanticToastContainer position="top-right" />
                <Segment style={{ padding: "8em 0em" }} vertical>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as="h3" style={{ fontSize: "2em" }}>
                                    Intuitive Internship Search
                            </Header>
                                <p style={{ fontSize: "1.33em" }}>
                                    Want a job? You need experience? Want experience?
                                    You need a job. Intern.IT looks to break that cycle
                                    with a revolutionary product created to connect
                                    Companies and Interns through a tested and approved
                                    system
                            </p>
                            </Grid.Column>
                            <Grid.Column floated="right" width={6}>
                                <Image
                                    bordered
                                    rounded
                                    size="large"
                                    src={DescriptionImage}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{ padding: "0em" }} vertical>
                    <Grid celled="internally" columns="equal" stackable>
                        <Grid.Row textAlign="center">
                            <Grid.Column
                                style={{ paddingBottom: "5em", paddingTop: "5em" }}
                            >
                                <Header as="h3" style={{ fontSize: "2em" }}>
                                    "Intern.IT helped me find an internship only one
                                    month after completing my studies. With the
                                    experience gathered there, I managed to find a job
                                    immediately."
                            </Header>
                                <p style={{ fontSize: "1.33em" }}>
                                    <Image avatar src={AvatarStudent} />
                                    <b>Coleen Anderson</b> Software Developer, Mistral
                            </p>
                            </Grid.Column>
                            <Grid.Column
                                style={{ paddingBottom: "5em", paddingTop: "5em" }}
                            >
                                <Header as="h3" style={{ fontSize: "2em" }}>
                                    "Our company managed to find and train over a dozen
                                    of students into competent and professional
                                    individuals using Intern.IT. They are an immensely
                                    valuable part of our operations."
                            </Header>
                                <p style={{ fontSize: "1.33em" }}>
                                    <Image avatar src={AvatarCompany} />
                                    <b>Grant Garcia</b> Chief Technical Officer,
                                    Klika.ba
                            </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment
                    textAlign="center"
                    style={{
                        minHeight: 700,
                        padding: "1em 0em"
                    }}
                    vertical
                    inverted
                    id="landing_footing"
                >
                    <div className="layer">
                        <HomepageFooting />
                    </div>
                </Segment>

                <Segment inverted vertical style={{ padding: "5em 0em" }}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as="h4" content="About" />
                                    <List link inverted>
                                        <List.Item as="a">About</List.Item>
                                        <List.Item as="a">Contact Us</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as="h4" content="Location" />
                                    <List link inverted>
                                        <List.Item as="a">
                                            International Burch University
                                    </List.Item>
                                        <List.Item as="a">
                                            Francuske Revolucije bb
                                    </List.Item>
                                        <List.Item as="a">71240 Ilidža</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7} floated="right">
                                    <Header as="h4" inverted>
                                        Stay in Touch! Join our Newsletter.
                                </Header>
                                    <Input
                                        action={{
                                            color: "blue",
                                            labelPosition: "right",
                                            icon: "mail",
                                            content: "Subscribe",
                                            onClick: () => this.openModal("subscribe")
                                        }}
                                        placeholder="Enter Email Address"
                                        onChange={this.handleChange}
                                        name="email"
                                        size="large"
                                        error={this.state.emailError}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                {/* Modals */}
                <TransitionablePortal
                    open={this.state.subscribeIsOpen}
                    transition={{ animation: "scale", duration: 300 }}
                >
                    <Modal
                        closeIcon
                        size="small"
                        onClose={() => this.closeModal("subscribe")}
                        open={this.state.subscribeIsOpen}
                    >
                        <Header icon="check square outline" content="Subscribe to the newsletter" />
                        <Modal.Content>
                            <p>Are you sure you want to subscribe to our weekly newsletter?</p>
                            <p>You can cancel your subscription at any time by clicking the "Unsubscribe" button in any mail message you receive.</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button.Group>
                                <Button onClick={() => this.closeModal("subscribe")}>Cancel</Button>
                                <Button.Or />
                                <Button positive loading={this.state.formLoading} onClick={this.subscribeToNewsletter}>Subscribe</Button>
                            </Button.Group>
                        </Modal.Actions>
                    </Modal>
                </TransitionablePortal>
            </ResponsiveContainer>
        );
    }
}

export default LandingPage;
