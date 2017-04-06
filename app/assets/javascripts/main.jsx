import React from 'react';
import ReactDOM from 'react-dom';

//Importing components that will be rendered by url link
import Root from './Root.jsx';
import Home from './Home.jsx';
import Logout from './utility/Logout.jsx';

//Project
import Projects from './projects/Projects.jsx';
import Project from './projects/Project.jsx';

//Requirements
import Requirements from './requirements/Requirements.jsx';
import UpdateRequirement from './requirements/UpdateRequirement.jsx';
import NewRequirement from './requirements/NewRequirement.jsx';

//Admin
import Admin from './admin/Admin.jsx';

//Stuff
import {changeSideMenuMode} from './redux/actions/sideMenuActions.jsx';
import NotFound from './layout/NotFound.jsx';
import NotAuth from './layout/NotAuth.jsx';

//Utility
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ConnectedRouter, push} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//Defining URL links
/**
 * Starting point for the application.
 * Defines a provider for the redux store and routes with react-router
 */
class App extends React.Component {

    _forceUpdate(path) {
        if (store.getState().router.location) {
            if (store.getState().router.location.pathname !== path) {
                store.dispatch(push(path));
            }
        } else {
            store.dispatch(push(path));
        }
    };


    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <ConnectedRouter history={browserHistory}>
                        <Route path={"/"} component={Root}>
                            <IndexRoute component={Home}/>
                            <Route path={"/api/login"} component={Home}/> {/* for rerouting purposes*/}
                            <Route path={"projects"} component={Projects}>
                                <Route path={"private"} onEnter={() => this._forceUpdate("/projects/private")}/>
                                <Route path={"archive"} onEnter={() => this._forceUpdate("/projects/archive")}/>
                            </Route>

                            <Route path={"/api/project/new"} component={Projects}/> {/* for rerouting purposes*/}
                            <Route path={"/api/project/:id"} component={Project}/>

                            <Route path={"allrequirements"} component={Requirements}/>
                            <Route path={"/api/requirement/new"} component={Requirements}/> {/* for rerouting purposes*/}
                            <Route path={"/api/requirement/add"} component={Requirements}/> {/* for rerouting purposes*/}
                            <Route path={"/api/requirement/update"} component={Requirements}/> {/* for rerouting purposes*/}

                            <Route path={"newrequirement"} component={NewRequirement}/>
                            <Route path={"add-requirement"} component={Requirements}/>
                            <Route path={"editrequirement"} component={UpdateRequirement}/>
                            <Route path={"logout"} component={Logout}/>
                            <Route path={"admin"} component={Admin} onEnter={() => {}}>
                                <Route path={"users"} onEnter={() => this._forceUpdate("/admin/users")}/>
                                <Route path={"classes"} onEnter={() => this._forceUpdate("/admin/classes")}/>
                                <Route path={"stats"} onEnter={() => this._forceUpdate("/admin/stats")}/>
                            </Route>

                            /*Errors*/
                            <Route path='/403' component={NotAuth} onEnter={() => {store.dispatch(changeSideMenuMode("HIDE"))}}/>
                            <Route path='/404' component={NotFound} onEnter={() => {store.dispatch(changeSideMenuMode("HIDE"))}}/>
                            <Redirect from='*' to='/404' />
                        </Route>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);