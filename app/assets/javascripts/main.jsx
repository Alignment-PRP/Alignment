import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root.jsx';
import Home from './Home.jsx';
import Projects from './projects/Projects.jsx';
import Project from './projects/Project.jsx';
import NewProject from './projects/NewProject.jsx';
import Requirements from './requirements/Requirements.jsx';
import Logout from './utility/Logout.jsx'
import {Router, Route, browserHistory} from "react-router";

class App extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <Route path={"login"} component={Home}/>
                    <Route path={"projects"} component={Projects}/>
                    <Route path={"project/:id"} component={Project}/>
                    <Route path={"newproject"} component={NewProject}/>
                    <Route path={"requirements"} component={Requirements}/>
                    <Route path={"logout"} component={Logout}/>
                </Route>
            </Router>
        );
    }

    }

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);