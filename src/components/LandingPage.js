import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Button,
    Container,
    Divider,
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
    Input
} from "semantic-ui-react";
import AvatarStudent from "../img/avatar_student-min.jpeg";
import AvatarCompany from "../img/avatar_company-min.jpeg";
import DescriptionImage from "../img/landing_desc.jpg";

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
const HomepageHeading = ({ mobile }) => (
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
        <Button primary size="huge">
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
        <Button.Group>
            <Button color="teal" size="huge">
                <Icon name="briefcase" />
                Intern
            </Button>
            <Button.Or />
            <Button color="blue" primary size="huge">
                <Icon name="building" />
                Company
            </Button>
        </Button.Group>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    redirectTo(route) {
        window.location.replace(window.location.origin + "/#" + route);
    }

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
                            minHeight: 700,
                            padding: "1em 0em"
                        }}
                        vertical
                        id="landing_header"
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
                                    <Menu.Item as="a" active>
                                        Home
                                    </Menu.Item>
                                    <Menu.Item as="a">Contact</Menu.Item>
                                    <Menu.Item as="a">About</Menu.Item>
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
                                        >
                                            Sign Up
                                        </Button>
                                    </Menu.Item>
                                </Container>
                            </Menu>
                            <HomepageHeading />
                        </div>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
};

class MobileContainer extends Component {
    state = {};

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
                    <Menu.Item as="a" active>
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">Contact</Menu.Item>
                    <Menu.Item as="a">About</Menu.Item>
                    <Menu.Item
                        as="a"
                        onClick={() => {
                            this.redirectTo("/login");
                        }}
                    >
                        Log in
                    </Menu.Item>
                    <Menu.Item as="a">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: 350, padding: "1em 0em" }}
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
                                    >
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
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

const LandingPage = () => (
    <ResponsiveContainer>
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
                                    content: "Subscribe"
                                }}
                                placeholder="Enter Email Address"
                                size="large"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>
);

export default LandingPage;
