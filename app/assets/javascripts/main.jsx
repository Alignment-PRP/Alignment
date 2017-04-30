import React from 'react';
import ReactDOM from 'react-dom';

//Importing components that will be rendered by url link
import Root from './Root';
import Home from './Home';
import Logout from './utility/Logout';

//Project
import Projects from './projects/Projects';
import Project from './projects/project/Project';

//Requirements
import Requirements from './requirements/Requirements';
import UpdateRequirement from './requirements/UpdateRequirement';

//Admin
import Admin from './admin/Admin';

//Stuff
import { logout } from './redux/actions/authActions';
import {changeSideMenuMode} from './redux/actions/sideMenuActions';
import NotFound from './layout/NotFound';
import NotAuth from './layout/NotAuth';

//Utility
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {syncHistoryWithStore, push} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

//Defining URL links
/**
 * Starting point for the application.
 * Defines a provider for the redux store and routes with react-router
 */
class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={history}>
                        <Route path={"/"} component={Root}>
                            <IndexRoute component={Home}/>
                            <Route path={"projects"} component={Projects}>
                                <Route path={"private"}/>
                                <Route path={"archive"}/>
                            </Route>

                            <Route path={"/project/:id"} component={Project}/>

                            <Route path={"requirements"} component={Requirements}/>

                            <Route path={"editrequirement"} component={UpdateRequirement}/>
                            <Route path={"logout"} onEnter={() => store.dispatch(logout())}/>
                            <Route path={"admin"} component={Admin} onEnter={() => {}}>
                                <Route path={"users"}/>
                                <Route path={"classes"}/>
                                <Route path={"stats"}/>
                            </Route>

                            /*Errors*/
                            <Route path='/403' component={NotAuth} onEnter={() => {store.dispatch(changeSideMenuMode("HIDE"))}}/>
                            <Route path='/404' component={NotFound} onEnter={() => {store.dispatch(changeSideMenuMode("HIDE"))}}/>
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