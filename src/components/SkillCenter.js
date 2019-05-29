import React, { Component } from "react";
import {
    Grid,
    Header,
    Icon,
    Form,
    Dropdown,
    Card,
    Button
} from "semantic-ui-react";

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
                    "Learn how to code in one of the most in-demand languages of today. Get the newest, freshest skills available!"
            },
            {
                name: "Complete HTML Course",
                image:
                    "https://i.udemycdn.com/course/750x422/766592_66ac_4.jpg",
                description:
                    "HTML markup is the heart of any web application and this course will teach you the fundamentals of HTML."
            },
            {
                name: "Industry-Standard Tips for developers.",
                image:
                    "https://cdn-images-1.medium.com/max/2400/1*atrQqA50p5ctc_HGyZiKuA.png",
                description:
                    "This article is aimed at junior developers, but may interest anyone as a bank of useful tips on how to grow some good habits."
            }
        ],
        datesRange: "",
        profession: "it",
        proficiency: "all",
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

    handleProficiencyChange = (e, { value }) => {
        this.setState({ proficiency: value });
    };

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
                    <Grid.Row columns="3" style={{ height: "20em" }}>
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
                    </Grid.Row>
                    <Grid.Row columns={3} style={{ marginTop: "-5%" }}>
                        {this.state.skills.map((item, index) => {
                            return (
                                <Grid.Column key={index}>
                                    <Card
                                        image={item.image}
                                        header={item.name}
                                        description={item.description}
                                        style={{
                                            width: "450px"
                                        }}
                                        extra={
                                            <div>
                                                <Button color="blue">
                                                    View
                                                </Button>
                                                <Button color="green">
                                                    Enroll
                                                </Button>
                                            </div>
                                        }
                                    />
                                </Grid.Column>
                            );
                        })}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default SkillCenter;
