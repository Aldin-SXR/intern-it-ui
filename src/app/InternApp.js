import React, { Component } from "react";
import {
    Image,
    Menu,
    Icon,
    Grid,
    Sidebar,
    Responsive,
    Search,
    Label
} from "semantic-ui-react";
import "../css/App.css";
import _ from "lodash";
import faker from "faker";

import state from "../initialState";
import MenuSeparator from "../components/MenuSeparator";
import Formatter from "../utils/formatUtils";

import logo from "./../img/logo.png";
import offer1 from "../img/offers/offer1.jpg";
import offer2 from "../img/offers/offer2.jpg";
import offer3 from "../img/offers/offer3.jpg";
import offer4 from "../img/offers/offer4.jpg";
import offer5 from "../img/offers/offer5.jpg";
import offer6 from "../img/offers/offer6.jpg";
import offer7 from "../img/offers/offer7.jpg";

const initialState = { isLoading: false, results: [], value: "" };
let offerPics = [
    offer1, offer2, offer3, offer4,
    offer5, offer6, offer7
];

const getResults = () =>
    _.times(5, () => ({
        title: faker.name.jobTitle(),
        description: faker.company.companyName(),
        image: Formatter.shuffle(offerPics)[0],
        price: faker.finance.amount(900, 4000, 2, "$")
    }));

let source = {};
// eslint-disable-next-line
state.professionOptions.map(option => {
    source[`${option.text}`] = {
        name: option.text,
        results: getResults()
    };
});

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "home",
            name: "Aldin Kovačević",
            visible: true,
            mobile: false,
            isLoading: false,
            results: [],
            value: ""
        };
    }

    /* Sidebar controls */
    toggleSidebar = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    componentWillReceiveProps = () => {
        this.handleComponentUpdate();
    };

    updateDimensions = () => {
        if (window.innerWidth <= 768) {
            this.setState({
                visible: false,
                mobile: true
            });
        } else {
            this.setState({
                visible: true,
                mobile: false
            });
        }
    };

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentDidMount = () => {
        this.handleComponentUpdate();
        window.addEventListener("resize", this.updateDimensions);
    };

    handleComponentUpdate = () => {
        let item = this.props.history.location.pathname;
        switch (this.props.history.location.pathname) {
            case "/home":
                item = "home";
                break;
            case "/profile":
                item = "profile";
                break;
            case "/rankings":
                item = "rankings";
                break;
            case "/skills":
                item = "skills";
                break;
            case "/offerings":
                item = "offerings";
                break;
            default:
                item = "home";
        }
        /* Set active route and user name*/
        this.setState({
            activeItem: item
        });
    };

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        this.props.history.push("/offerings");
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), "i");
            const isMatch = result => re.test(result.title);

            const filteredResults = _.reduce(
                source,
                (memo, data, name) => {
                    const results = _.filter(data.results, isMatch);
                    if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

                    return memo;
                },
                {}
            );

            this.setState({
                isLoading: false,
                results: filteredResults
            });
        }, 300);
    };

    componentDidUpdate = prevProps => {};

    logOutIfInvalid = () => {};

    /* Log out */
    logOut = () => {
        localStorage.clear();
        this.props.history.push("/");
    };

    /* Menu route changes */
    handleRouteChange = name => {
        this.setState({
            activeItem: name,
            visible: this.state.mobile ? false : true
        });
        /* Switch to page */
        this.props.history.push(`/${name}`);
    };

    setUserName = () => {
        // let token = localStorage.getItem("loginToken");
        // return Validator.getUserName(token);
    };

    render() {
        const { component } = this.props;
        const { activeItem, isLoading, value, results } = this.state;
        return (
            <div className="App">
                <Sidebar.Pushable style={{ transform: "none" }}>
                    <Responsive maxWidth={768}>
                        <Menu
                            fixed="top"
                            borderless
                            style={{ zIndex: 200 }}
                            fluid
                        >
                            <Menu.Item
                                as="a"
                                header
                                onClick={this.toggleSidebar}
                            >
                                <Icon name="sidebar" />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item
                                    name="profile"
                                    onClick={() =>
                                        this.handleRouteChange("profile")
                                    }
                                >
                                    <Icon name="user" />
                                    &nbsp; {this.state.name}
                                    <Label basic color="red" size="small">
                                        350 SP
                                    </Label>
                                </Menu.Item>
                                <Menu.Item>
                                    <Icon name="power" />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <MenuSeparator app="intern" />
                    </Responsive>
                    <Responsive minWidth={768}>
                        <Menu
                            fixed="top"
                            stackable
                            icon
                            fluid
                            style={{ zIndex: 200 }}
                            borderless
                        >
                            <Menu.Item onClick={this.toggleSidebar}>
                                <Icon name="sidebar" style={{ width: "7em" }} />
                            </Menu.Item>
                            <Menu.Item as="a" header>
                                <Image
                                    src={logo}
                                    size="mini"
                                    style={{ marginRight: "1em" }}
                                />
                                Intern.IT | Internship made simple
                            </Menu.Item>
                            <Menu.Item>
                                <Search
                                    category
                                    input={{
                                        style: {
                                            width: "30em"
                                        }
                                    }}
                                    loading={isLoading}
                                    placeholder="Search for job offers..."
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(
                                        this.handleSearchChange,
                                        500,
                                        {
                                            leading: true
                                        }
                                    )}
                                    results={results}
                                    value={value}
                                    {...this.props}
                                />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item
                                    name="profile"
                                    onClick={() =>
                                        this.handleRouteChange("profile")
                                    }
                                >
                                    <Icon name="user" />
                                    &nbsp; {this.state.name}
                                </Menu.Item>
                                <Menu.Item>
                                    <Label
                                        basic
                                        color="red"
                                        size="large"
                                        title="My Skill Points"
                                    >
                                        350 SP
                                    </Label>
                                </Menu.Item>
                                <Menu.Item
                                    as="a"
                                    title="Log out"
                                    onClick={this.logOut}
                                >
                                    <Icon name="power off" />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <MenuSeparator app="intern" />
                    </Responsive>
                    <Sidebar
                        as={Menu}
                        animation="push"
                        icon="labeled"
                        vertical
                        visible={this.state.visible}
                        width="thin"
                        compact
                        pointing
                        style={{ overflow: "hidden", position: "fixed" }}
                    >
                        <Responsive minWidth={768}>
                            {/* Placeholder segment */}
                            <Menu.Item>
                                <Grid>
                                    <Grid.Column
                                        only="computer tablet"
                                        style={{ height: "4.7em" }}
                                    />
                                </Grid>
                            </Menu.Item>
                        </Responsive>
                        <Responsive maxWidth={768}>
                            {/* Placeholder segment */}
                            <Menu.Item>
                                <Grid>
                                    <Grid.Column
                                        only="mobile"
                                        style={{ height: "3.5em" }}
                                    />
                                </Grid>
                            </Menu.Item>
                        </Responsive>
                        <Menu.Item
                            as="a"
                            active={activeItem === "home"}
                            onClick={() => this.handleRouteChange("home")}
                        >
                            <Icon name="home" />
                            Dashboard
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            active={activeItem === "offerings"}
                            onClick={() => this.handleRouteChange("offerings")}
                        >
                            <Icon name="suitcase" />
                            Job Offerings
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            active={activeItem === "skills"}
                            onClick={() => this.handleRouteChange("skills")}
                        >
                            <Icon name="tasks" />
                            Skill Center
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            active={activeItem === "rankings"}
                            onClick={() => this.handleRouteChange("rankings")}
                        >
                            <Icon name="sitemap" />
                            Best of the Best
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            active={activeItem === "profile"}
                            onClick={() => this.handleRouteChange("profile")}
                        >
                            <Icon name="user" />
                            Profile
                        </Menu.Item>
                        <Menu.Item as="a" onClick={this.logOut}>
                            <Icon name="power" />
                            Log Out
                        </Menu.Item>
                    </Sidebar>
                    {/* dimmed={this.state.mobile && this.state.visible} */}
                    <Sidebar.Pusher>
                        {/* Application content */}
                        {component}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default AdminApp;
