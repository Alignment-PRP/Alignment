import React from 'react';
import ReactDOM from 'react-dom';

//Importing components that will be rendered by url link
import Root from './Root';
import Home from './Home';
import Logout from './utility/Logout';

//Project
import Projects from './projects/Projects';
import ProjectRequirementView from './projects/project/ProjectRequirementView';
import ProjectView from './projects/project/ProjectView';

//Requirements
import Requirements from './requirements/Requirements';

//Admin
import Admin from './admin/Admin';

//Stuff
import { logout } from './redux/actions/authActions';
import NotFound from './layout/NotFound';
import NotAuth from './layout/NotAuth';

//Utility
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {syncHistoryWithStore, push} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {getMuiTheme} from "material-ui/styles";
import theme from './core/theme';

import { Auth } from './core/auth/Auth';
import { ADMIN_PAGE } from './core/auth/rights';
import { getUserData } from './redux/actions/userActions';

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

//Defining URL links
/**
 * Starting point for the application.
 * Defines a provider for the redux store and routes with react-router
 */
class App extends React.Component {

    componentWillMount() {
        store.dispatch(getUserData());
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Provider store={store}>
                    <Router history={history}>
                        <Route path={"/"} component={Root}>
                            <IndexRoute component={Home}/>
                            <Route path={"projects"} component={Projects}>
                                <Route path={"private"}/>
                                <Route path={"accessible"}/>
                            </Route>

                            <Route path={"/project/:id"} component={ProjectView} onEnter={() => {}}>
                                <Route path={"overview"} />
                                <Route path={"access"} >
                                    <Route path={"users"} />
                                    <Route path={"classes"} />
                                </Route>
                                <Route path={"requirements"} />
                            </Route>

                            <Route path={"requirements"} component={Requirements}/>

                            <Route path={"logout"} onEnter={() => store.dispatch(logout())}/>
                            <Route path={"admin"} component={Auth(ADMIN_PAGE)(Admin)} onEnter={() => {}}>
                                <Route path={"users"}/>
                                <Route path={"classes"}/>
                                <Route path={"stats"}/>
                            </Route>

                            /*Errors*/
                            <Route path='/403' component={NotAuth} onEnter={() => {}}/>
                            <Route path='/404' component={NotFound} onEnter={() => {}}/>
                            <Redirect from='*' to='/404' />
                        </Route>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);