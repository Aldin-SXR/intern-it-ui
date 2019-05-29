import React, { Component } from "react";
import {
    Grid,
    Header,
    Icon,
    Statistic,
    Segment,
    Divider,
    Form,
    Dropdown,
    Button
} from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";

class BestOfTheBest extends Component {
    state = {
        professionOptions: [
            { key: "bs", value: "bs", text: "Business" },
            { key: "cs", value: "cs", text: "Computer Science" },
            { key: "ec", value: "ec", text: "Economics" },
            { key: "it", value: "it", text: "Information Technologies" },
            { key: "man", value: "man", text: "Management" }
        ],
        datesRange: "",
        profession: "it",
        pageSize: 5,
        mobile: false
    };

    handleDateRangeChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    handleProfessionChange = (e, { value }) =>
        this.setState({ profession: value });
    handlePageSizeChange = (e, { value }) => this.setState({ pageSize: value });

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

    render() {
        return (
            <div id="best-of-the-best">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">
                                <Icon name="sitemap" />
                                <Header.Content>
                                    Best of the Best
                                    <Header.Subheader>
                                        See how you rank among prospective
                                        employees.
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row columns="3">
                        <Grid.Column>
                            <Segment circular color="red">
                                <Statistic horizontal size="small">
                                    <Statistic.Value>
                                        <Icon name="trophy" color="black" />
                                        &nbsp;42
                                    </Statistic.Value>
                                    <Statistic.Label>
                                        Your overall ranking
                                    </Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment circular color="green">
                                <Statistic horizontal size="small">
                                    <Statistic.Value>
                                        <Icon name="trophy" color="black" />
                                        &nbsp;23
                                    </Statistic.Value>
                                    <Statistic.Label>
                                        Ranking by skill points
                                    </Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment circular color="blue">
                                <Statistic horizontal size="small">
                                    <Statistic.Value>
                                        <Icon name="trophy" color="black" />
                                        &nbsp;88
                                    </Statistic.Value>
                                    <Statistic.Label>
                                        Ranking by job offers
                                    </Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row columns="4" style={{ height: "20em" }}>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Area of expertise:</label>
                                    <Dropdown
                                        placeholder="Select an area"
                                        fluid
                                        search
                                        clearable
                                        selection
                                        value={this.state.profession}
                                        options={this.state.professionOptions}
                                        onChange={this.handleProfessionChange}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Date range:</label>
                                    <DatesRangeInput
                                        name="datesRange"
                                        placeholder="Start date - End date"
                                        value={this.state.datesRange}
                                        iconPosition="left"
                                        dateFormat="DD MMM YYYY"
                                        onChange={this.handleDateRangeChange}
                                        clearable
                                        closable
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column floated="right">
                            <Form>
                                <Form.Field>
                                    <label>Page size:</label>
                                    <Dropdown
                                        style={{
                                            width: !this.state.mobile
                                                ? "50%"
                                                : "100%"
                                        }}
                                        placeholder="Show..."
                                        selection
                                        compact
                                        value={this.state.pageSize}
                                        onChange={this.handlePageSizeChange}
                                        options={[
                                            { key: "5", value: 5, text: "5" },
                                            {
                                                key: "10",
                                                value: 10,
                                                text: "10"
                                            },
                                            {
                                                key: "15",
                                                value: 15,
                                                text: "15"
                                            },
                                            {
                                                key: "25",
                                                value: 25,
                                                text: "25"
                                            },
                                            { key: "50", value: 50, text: "50" }
                                        ]}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default BestOfTheBest;
