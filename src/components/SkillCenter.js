import React, { Component } from "react";
import {
    Grid,
    Header,
    Icon,
    Form,
    Dropdown,
    Card,
    Button,
    Divider,
    Segment,
    Image,
    Label,
    Rating,
    Pagination
} from "semantic-ui-react";
import SkillDialog from "./SkillDialog";

import * as Toast from "../utils/toaster";

class SkillCenter extends Component {
    state = {
        professionOptions: [
            { key: "bs", value: "bs", text: "Business" },
            { key: "cs", value: "cs", text: "Computer Science" },
            { key: "ec", value: "ec", text: "Economics" },
            { key: "it", value: "it", text: "Information Technologies" },
            { key: "man", value: "man", text: "Management" }
        ],
        proficiencyOptions: [
            { key: "al", value: "all", text: "All" },
            { key: "bg", value: "bg", text: "Beginner" },
            { key: "int", value: "int", text: "Intermediate" },
            { key: "ad", value: "ad", text: "Advanced" }
        ],
        skills: [
            {
                name: "JS: From Beginner to Advanced",
                image:
                    "http://www.purelogics.net/blog/wp-content/uploads/2019/01/javascript.png",
                description:
                    "Learn how to code in one of the most in-demand languages of today. Get the newest, freshest skills available!",
                rating: 5
            },
            {
                name: "Complete HTML Course",
                image:
                    "https://i.udemycdn.com/course/750x422/766592_66ac_4.jpg",
                description:
                    "HTML markup is the heart of any web application and this course will teach you the fundamentals of HTML.",
                rating: 4
            },
            {
                name: "Industry-Standard Tips for developers.",
                image:
                    "https://cdn-images-1.medium.com/max/2400/1*atrQqA50p5ctc_HGyZiKuA.png",
                description:
                    "This article is aimed at junior developers, but may interest anyone as a bank of useful tips on how to grow some good habits.",
                rating: 5
            }
        ],
        selectedItem: {
            name: "",
            image: "",
            description: ""
        },
        profession: "it",
        proficiency: "all",
        mobile: false,
        open: false,
        loadingSegment: false,
        pageSize: 5
    };

    handleProfessionChange = (e, { value }) => {
        this.setState({ profession: value, loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

    handleProficiencyChange = (e, { value }) => {
        this.setState({ proficiency: value, loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    };

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

    handleRate = () => {
        Toast.make("success", "Successfully rating", "Course rating has been successfully updated.");
    }

    saveState = (name, state) => {
        this.setState({
            [name]: state
        });
    };

    setSelectedItem = item => {
        this.setState(
            {
                selectedItem: { ...item }
            },
            () => {
                this.setState({
                    open: true
                });
            }
        );
    };

    handlePageChange = () => {
        this.setState({ loadingSegment: true });
        setTimeout(() => {
            this.setState({
                loadingSegment: false
            });
        }, 500);
    }

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
            <div id="skill-center">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">
                                <Icon name="tasks" />
                                <Header.Content>
                                    Skill Center
                                    <Header.Subheader>
                                        Gain new valuable skills and increase
                                        your market value.
                                    </Header.Subheader>
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
                                    <label>Proficiency level:</label>
                                    <Dropdown
                                        placeholder="Select proficiency"
                                        fluid
                                        search
                                        clearable
                                        selection
                                        value={this.state.proficiency}
                                        options={this.state.proficiencyOptions}
                                        onChange={this.handleProficiencyChange}
                                    />
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
                    <Grid.Row columns={4}>
                        <Grid.Column computer="14" tablet="14">
                            <Segment basic loading={this.state.loadingSegment}>
                                <Card.Group centered>
                                    {this.state.skills.map((item, index) => {
                                        return (
                                            <Card style={{
                                                width: "500px"
                                            }}>
                                                <Image src={item.image} wrapped ui={false} />
                                                <Label as='a' color="blue" attached="top left">
                                                    <Rating icon="star" maxRating={5} defaultRating={item.rating} onRate={this.handleRate} />
                                                </Label>
                                                <Card.Content>
                                                    <Card.Header>{item.name}</Card.Header>
                                                    <Card.Description>{item.description}</Card.Description>
                                                </Card.Content>
                                                <Card.Content extra textAlign="center">
                                                    <Button.Group>
                                                        <Button
                                                            color="teal"
                                                            onClick={() => {
                                                                this.setSelectedItem(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                        <Button.Or />
                                                        <Button
                                                            color="blue"
                                                            onClick={() => {
                                                                Toast.make(
                                                                    "success",
                                                                    "Enrollment successful!",
                                                                    "Enrolled into ".concat(
                                                                        item.name
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Enroll
                                                    </Button>
                                                    </Button.Group>
                                                </Card.Content>
                                            </Card>
                                        );
                                    })}
                                </Card.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer="14" tablet="14" style={ this.state.mobile ? { textAlign: "-webkit-center" } : null }>
                            <Pagination
                                style={ this.state.mobile ? null : { float: "right" }}
                                boundaryRange={0}
                                defaultActivePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                onPageChange={this.handlePageChange}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={10}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <SkillDialog
                        saveState={this.saveState}
                        {...this.state.selectedItem}
                        open={this.state.open}
                    />
                </Grid>
            </div>
        );
    }
}

export default SkillCenter;
