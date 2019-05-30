import React, { Component } from 'react'
import { Grid, Header, Icon, Divider, Dropdown, Form, Label, Segment, Card, Image, Button, Pagination, TransitionablePortal, Modal, Tab } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Slider } from "react-semantic-ui-range";
import * as Toast from "../utils/toaster";

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
        ],
        applyForOfferIsOpen: false,
        formLoading: false,
        // Specific offer
        appliedCompany: "",
        appliedJob: "",
        appliedSkillPoints: 0,
        jobOffers: [ ],
        successfulApplication: ""
    };

    handleDateRangeChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    openModal = (name) => {
        this.setState({
            [`${name}IsOpen`]: true
        });
    }

    closeModal = (name) => {
        this.setState({
            [`${name}IsOpen`]: false,
        });
    }

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
        this.setState({ profession: value, loadingSegment: true, jobOffers: this.produceJobOffers() });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

    handlePageChange = () => {
        this.setState({ loadingSegment: true, jobOffers: this.produceJobOffers() });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

    handlePositionChange = (e, { value }) => {
        this.setState({ position: value, loadingSegment: true, jobOffers: this.produceJobOffers() });
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
                jobOffers: this.produceJobOffers(),
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
        this.setState({ jobOffers: this.produceJobOffers(), loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    };

    applyForOfferModal = (company, job, skillPoints) => {
        this.openModal("applyForOffer");
        this.setState({
            appliedCompany: company,
            appliedJob: job,
            appliedSkillPoints: skillPoints
        });
    }

    applyForOffer = () => {
        /* Check for skill points */
        if (this.state.appliedSkillPoints > 350) {
            Toast.make("error", "Insufficient skill points", "You do not have enough skill points to apply for this position.")
            return;
        }

        this.setState({
            formLoading: true
        });

        setTimeout(() => {
            this.setState({
                formLoading: false,
                applyForOfferIsOpen: false,
                successfulApplication: this.state.appliedJob
            });
            Toast.make("success", "Successful application", "You have successfully applied for a job position.")
        }, 1000);
    }

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
                                        onChange={this.handleProfessionChange}
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
                                        onChange={this.handlePositionChange}
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
                                <Form.Field                                         
                                    style={{
                                            width: !this.state.mobile
                                                ? "40%"
                                                : "100%"
                                        }}>
                                    <label>Page size:</label>
                                    <Dropdown
                                        placeholder="Show..."
                                        selection
                                        compact
                                        fluid
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
                            <Segment basic loading={this.state.loadingSegment} >
                                <Card.Group stackable centered>
                                    {
                                        this.state.jobOffers.map((offer, i) => (
                                            <Card key={i}>
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
                                                            <Grid.Column floated="left" textAlign={this.state.mobile ? "center" : "left"}>
                                                                <Label as="a" title="Salary" basic color="green" size="big">${offer.salary}</Label>
                                                            </Grid.Column>
                                                            <Grid.Column floated="right" textAlign={this.state.mobile ? "center" : "right"}>
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
                                                        <Button color="blue" 
                                                            onClick={() => this.applyForOfferModal(offer.company, offer.job, offer.skillPoints)}
                                                            disabled={this.state.successfulApplication === offer.job}
                                                        >
                                                            { this.state.successfulApplication ? "Applied" : "Apply" }
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
                    <Grid.Row>
                        <Grid.Column computer="14" tablet="14" style={ this.state.mobile ? { textAlign: "-webkit-center" } : null }>
                            <Pagination
                                style={ this.state.mobile ? null : { float: "right" }}
                                boundaryRange={1}
                                defaultActivePage={1}
                                ellipsisItem={'...'}
                                firstItem={null}
                                onPageChange={this.handlePageChange}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={10}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* Modals */}
                {/* Apply for an offer */}
                <TransitionablePortal
                    open={this.state.applyForOfferIsOpen}
                    transition={{ animation: "scale", duration: 300 }}
                >
                    <Modal
                        closeIcon
                        size="small"
                        onClose={() => this.closeModal("applyForOffer")}
                        open={this.state.applyForOfferIsOpen}
                    >
                        <Header icon="check square outline" content="Apply for job offer" />
                        <Modal.Content>
                            Are you sure you want to apply for the position of {this.state.appliedJob} at {this.state.appliedCompany}?
                        </Modal.Content>
                        <Modal.Actions>
                            <Button.Group>
                                <Button onClick={() => this.closeModal("applyForOffer")}>Cancel</Button>
                                <Button.Or />
                                <Button positive loading={this.state.formLoading} onClick={this.applyForOffer}>Apply</Button>
                            </Button.Group>
                        </Modal.Actions>
                    </Modal>
                </TransitionablePortal>
            </div>
        )
    }
}

export default Offerings;
