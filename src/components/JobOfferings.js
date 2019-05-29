import React, { Component } from 'react'
import { Grid, Header, Icon, Divider, Dropdown, Form, Label, Segment, Card, Image, Button } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Slider } from "react-semantic-ui-range";

import _ from "lodash";
import Formatter from "../utils/formatUtils";

import faker from "faker";
import offer1 from "../img/offers/offer1.jpg";
import offer2 from "../img/offers/offer2.jpg";
import offer3 from "../img/offers/offer3.jpg";
import offer4 from "../img/offers/offer4.jpg";
import offer5 from "../img/offers/offer5.jpg";
import offer6 from "../img/offers/offer6.jpg";
import offer7 from "../img/offers/offer7.jpg";


class Offerings extends Component {

    state = {
        professionOptions: [
            { key: "bs", value: "bs", text: "Business" },
            { key: "cs", value: "cs", text: "Computer Science" },
            { key: "ec", value: "ec", text: "Economics" },
            { key: "it", value: "it", text: "Information Technologies" },
            { key: "man", value: "man", text: "Management" }
        ],
        positionOptions: [
            { key: "backend", value: "Backend Developer", text: "Backend Developer" },
            { key: "frontend", value: "Frontend Developer", text: "Frontend Developer" },
            { key: "network", value: "Network Engineer", text: "Network Engineer" },
            { key: "devops", value: "DevOps", text: "DevOps" },
        ],
        datesRange: "",
        profession: "it",
        position: "",
        pageSize: 5,
        skillPoints: [0, 0],
        mobile: false,
        loadingSegment: false,
        sliderSettings: {
            start: [0, 0],
            min: 0,
            max: 500,
            step: 1,
            onChange: value => {
                this.setState({
                    skillPoints: value, loadingSegment: true
                });
                setTimeout(() => {
                    this.setState({
                        loadingSegment: false
                    });
                }, 500);
            }
        },
        offerPics: [
            offer1, offer2, offer3, offer4,
            offer5, offer6, offer7
        ]
    };

    handleDateRangeChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };


    produceJobOffers = () => {
        let offers = [];
        let pics = Formatter.shuffle(this.state.offerPics);
        for (let i = 0; i < this.state.pageSize; i++) {
            offers[i] = {
                image: pics[i % 5],
                job: faker.name.jobTitle(),
                company: faker.company.companyName(),
                salary: faker.commerce.price(900, 4000),
                skillPoints: faker.random.number({
                    min: this.state.skillPoints[0] === 0 && this.state.skillPoints[1] === 0 ? 0 : this.state.skillPoints[0],
                    max: this.state.skillPoints[0] === 0 && this.state.skillPoints[1] === 0 ? 500 : this.state.skillPoints[1]
                 })
            }
        }
        return offers;
    }

    handleProfessionChange = (e, { value }) => {
        this.setState({ profession: value, loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

    handlePositionChange = (e, { value }) => {
        this.setState({ position: value, loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

    handlePageSizeChange = (e, { value }) => { 
        this.setState({ pageSize: value, loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

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
        this.setState({ loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    };

    render() {
        return (
            <div id="job-offerings">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1'>
                                <Icon name='suitcase' />
                                <Header.Content>
                                    Job Offerings
                                    <Header.Subheader>Find great internships and valuable opportunities.</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row columns="4">
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Area of expertise:</label>
                                    <Dropdown
                                        placeholder="Select an area of expertise"
                                        fluid
                                        search
                                        clearable
                                        selection
                                        value={this.state.profession}
                                        options={this.state.professionOptions}
                                        onChange={
                                            _.debounce(
                                                this.handleProfessionChange,
                                                500,
                                                { leading: true }
                                            )
                                        }
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Desired position:</label>
                                    <Dropdown
                                        placeholder="Select a position "
                                        fluid
                                        search
                                        clearable
                                        selection
                                        value={this.state.position}
                                        options={this.state.positionOptions}
                                        onChange={
                                            _.debounce(
                                                this.handlePositionChange, 500,
                                                { leading: true }
                                            )
                                        }
                                    />
                                    {/* <DatesRangeInput
                                        name="datesRange"
                                        dateFormat="DD MMM YYYY"
                                        placeholder="Start date - End date"
                                        value={this.state.datesRange}
                                        iconPosition="left"
                                        onChange={this.handleDateRangeChange}
                                        clearable
                                        closable
                                    /> */}
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Skill Points:</label>
                                    <Slider multiple value={this.state.skillPoints} color="red" settings={this.state.sliderSettings} />
                                    <div style={{ marginTop: '1em' }}>
                                        <Label as='a' basic color='teal'>
                                            {this.state.skillPoints[0]}
                                        </Label>
                                        &nbsp; - &nbsp;
                                        <Label as='a' basic color='red'>
                                            {this.state.skillPoints[1]}
                                        </Label>
                                    </div>
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
                                                ? "45%"
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
                    <Grid.Row>
                        <Grid.Column tablet="14" computer="14">
                            <Segment loading={this.state.loadingSegment}>
                                <Card.Group stackable centered>
                                    {
                                        this.produceJobOffers().map(offer => (
                                            <Card>
                                                <Image src={offer.image} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header>{offer.job}</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>{offer.company}</span>
                                                    </Card.Meta>
                                                </Card.Content>
                                                <Card.Content>
                                                    <Grid columns="2" stackable>
                                                        <Grid.Row>
                                                            <Grid.Column floated="left">
                                                                <Label as="a" title="Salary" basic color="green" size="big">${offer.salary}</Label>
                                                            </Grid.Column>
                                                            <Grid.Column floated="right" textAlign="right">
                                                                <Label as="a" title="Skill Points" basic color="red" size="big">{offer.skillPoints} SP</Label>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>

                                                </Card.Content>
                                                <Card.Content extra textAlign="center">
                                                    <Button.Group>
                                                        <Button color="teal">
                                                            More info
                                                        </Button>
                                                        <Button.Or />
                                                        <Button color="blue">
                                                            Apply
                                                        </Button>
                                                    </Button.Group>
                                                </Card.Content>
                                            </Card>
                                        ))
                                    }
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Offerings;
