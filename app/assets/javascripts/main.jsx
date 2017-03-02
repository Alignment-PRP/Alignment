import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './Projects/Projects.jsx';
import Root from './Root.jsx';
import {Router, Route, browserHistory} from "react-router";

class App extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <Route path={"login"} component={Root}/>
                    <Route path={"projects"} component={Projects}/>
                </Route>
            </Router>
        );
    }

    }

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);