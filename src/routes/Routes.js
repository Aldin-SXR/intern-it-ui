import React, { Component } from 'react'
import { Route, Switch, Router, Redirect } from "react-router-dom";

import Validator from "../utils/validationUtils";

/* Admin components */
import CompanyApp from "../app/CompanyApp";
import InternApp from "../app/InternApp";

import Home from "../components/Home";

import { createHashHistory } from 'history'
import { SemanticToastContainer } from 'react-semantic-toasts';
const history = createHashHistory();

/** Scroll to top on route change  */
class ScrollToTop extends Component {
    componentDidUpdate = (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

const PrivateRoute = ({ components: [Component1, Component2], ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // let token = localStorage.getItem("loginToken");
            let token = "intern";
            return (
                token ? (
                    <ScrollToTop location={props.location}>
                        {
                            /* Route depending on admin privileges */
                            // Validator.isSuperuser(token)
                            token === "intern" ? (
                                <InternApp history={props.history} component={<Component1 {...props} />} />
                            ) : (
                                <CompanyApp history={props.history} component={<Component2 {...props} />} />
                            )
                        }
                        <SemanticToastContainer position="top-right" />
                    </ScrollToTop>
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            );
        }  
        }
    />
);

export default () => {
    return (
        <Router history={history} >
            <Switch>
                <PrivateRoute exact path="/" components={[ Home, null ]} />
                {/* <PrivateRoute exact path="/tokens" components={[ TokenIssuance ]} />
                <PrivateRoute exact path="/investors" components={[ Investors ]} />
                <PrivateRoute exact path="/profile" components={[ Profile, Profile ]} />
                <Route exact path="/login" component={Login} /> */}
            </Switch>
        </Router>
    );
}