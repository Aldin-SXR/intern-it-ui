import React, { Component } from "react";
import {
    Header,
    Image,
    Grid,
    Icon,
    Divider,
    Table,
    Rating,
    Card,
    Feed
} from "semantic-ui-react";
import { ColumnChart } from "react-chartkick";
import "chart.js";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interns: [
                {
                    name: "Lena B.",
                    score: "477",
                    image:
                        "https://react.semantic-ui.com/images/avatar/small/lena.png",
                    rating: "A",
                    efficacy: "3",
                    consensus: "80%",
                    comments:
                        "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders."
                },
                {
                    name: "Nina B.",
                    score: "512",
                    image:
                        "https://react.semantic-ui.com/images/avatar/small/matthew.png",
                    rating: "A",
                    efficacy: "3",
                    consensus: "85%",
                    comments:
                        "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders."
                },
                {
                    name: "Raia B.",
                    score: "385",
                    image:
                        "https://react.semantic-ui.com/images/avatar/small/lindsay.png",
                    rating: "B",
                    efficacy: "2",
                    consensus: "70%",
                    comments:
                        "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders."
                },
                {
                    name: "Dora B.",
                    score: "320",
                    image:
                        "https://react.semantic-ui.com/images/avatar/small/lena.png",
                    rating: "C",
                    efficacy: "2",
                    consensus: "62%",
                    comments:
                        "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders."
                },
                {
                    name: "Paia B.",
                    score: "256",
                    image:
                        "https://react.semantic-ui.com/images/avatar/small/mark.png",
                    rating: "D",
                    efficacy: "1",
                    consensus: "47%",
                    comments:
                        "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders."
                }
            ]
        };
    }

    formatData = () => {
        let interns = JSON.parse(JSON.stringify(this.state.interns));
        let formattedData = {};

        interns.forEach(element => {
            formattedData[element.name] = element.score;
        });

        return formattedData;
    };

    render() {
        let data = this.formatData();

        return (
            <div id="dashboard">
                <Grid stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">
                                <Icon name="home" />
                                <Header.Content>
                                    Dashboard
                                    <Header.Subheader>
                                        An overview of the most recent intern results.
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section />
                    <Grid.Row columns={2} divided>
                        <Grid.Column width={5}>
                            <Header as="h2">
                                Top 5 Interns by Skill Points
                                <Header.Subheader>
                                    The Best Interns of this month
                                </Header.Subheader>
                            </Header>
                            <ColumnChart data={data} />
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Table basic="very" celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Skill Points
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Rating
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Efficacy
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Consensus
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Comments
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.interns.map((item, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    <Header as="h4" image>
                                                        <Image
                                                            src={item.image}
                                                            rounded
                                                            size="mini"
                                                        />
                                                        <Header.Content>
                                                            {item.name}
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {item.score}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header
                                                        as="h2"
                                                        textAlign="center"
                                                    >
                                                        {item.rating}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Rating
                                                        icon="star"
                                                        defaultRating={
                                                            item.efficacy
                                                        }
                                                        maxRating={3}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell textAlign="right">
                                                    {item.consensus} <br />
                                                    {/*eslint-disable-next-line*/}
                                                    <a>
                                                        {Math.ceil(
                                                            Math.random() * 20
                                                        )}{" "}
                                                        studies
                                                    </a>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {item.comments}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h2">
                                Intern of the Month
                                <Header.Subheader>
                                    Best Performing Intern of May
                                </Header.Subheader>
                            </Header>
                            <Grid.Row columns={2} divided>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Content header="Daniel M." />
                                        <Card.Content
                                            description={
                                                "Daniel is a Full Stack Developer with over 1 year experience. Using Intern.IT, he managed to improve his coding skills as well as soft skills earned by working in a company."
                                            }
                                        />
                                        <Card.Content extra>
                                            <Icon name="user" />
                                            10 internships offered since
                                            September 2018
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Recent Activity</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Label
                                                image="
                        https://react.semantic-ui.com/images/avatar/small/lena.png"
                                            />
                                            <Feed.Content>
                                                <Feed.Date content="1 day ago" />
                                                <Feed.Summary>
                                                    <a>Lena Bee</a> completed
                                                    the
                                                                                                        <a> Complete HTML</a> course.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label
                                                image="
                        https://react.semantic-ui.com/images/avatar/small/molly.png"
                                            />
                                            <Feed.Content>
                                                <Feed.Date content="3 days ago" />
                                                <Feed.Summary>
                                                    Nina B.{" "}
                                                    <a>
                                                        completed Introduction
                                                        to JS course
                                                    </a>
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label
                                                image="
                        https://react.semantic-ui.com/images/avatar/small/matthew.png"
                                            />
                                            <Feed.Content>
                                                <Feed.Date content="4 days ago" />
                                                <Feed.Summary>
                                                    <a>Elliot Baker</a> has
                                                    scored an interview with{" "}
                                                    {""}
                                                    <a>Mistral</a>.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Home;
