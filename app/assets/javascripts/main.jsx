import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Home from './Home.jsx';
import Sidebar from './sidebar.jsx';
import Projects from './Projects.jsx';
import Root from './Root.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, browserHistory} from "react-router";

class App extends React.Component {

    render() {

        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}/>
                    <Route path={"projects"} component={Projects}/>
            </Router>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);