import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root.jsx';
import Home from './Home.jsx';
import Projects from './projects/Projects.jsx';
import Project from './projects/Project.jsx';
import NewProject from './projects/NewProject.jsx';
import AllRequirements from './requirements/AllRequirements.jsx';
import ReduxTests from './ReduxTests.jsx';
import Logout from './utility/Logout.jsx'
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store.jsx';

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <IndexRoute component={Home}/>
                        <Route path={"login"} component={Home}/>
                        <Route path={"projects"} component={Projects}/>
                        <Route path={"project/:id"} component={Project}/>
                        <Route path={"newproject"} component={NewProject}/>
                        <Route path={"allrequirements"} component={AllRequirements}/>
                        <Route path={"reduxtests"} component={ReduxTests}/>
                        <Route path={"logout"} component={Logout}/>
                    </Route>
                </Router>
            </Provider>
        );
    }

    }

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);