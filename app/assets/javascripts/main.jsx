import React from 'react';
import ReactDOM from 'react-dom';

//Importing components that will be rendered by url link
import Root from './Root';
import Home from './Home';
import Logout from './utility/Logout';

//Project
import Projects from './projects/Projects';
import Project from './projects/Project';

//Requirements
import Requirements from './requirements/Requirements';
import UpdateRequirement from './requirements/UpdateRequirement';
import NewRequirement from './requirements/NewRequirement';

//Admin
import Admin from './admin/Admin';

//Stuff
import {changeSideMenuMode} from './redux/actions/sideMenuActions';
import NotFound from './layout/NotFound';
import NotAuth from './layout/NotAuth';



//Utility
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ConnectedRouter, push} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import { Auth } from './core/auth/Auth';
import { ADMIN_PAGE } from './core/auth/rights';
import { getUserData } from './redux/actions/userActions';

/**
 * Starting point for the application.
 * Defines a provider for the redux store and routes with react-router
 */
class App extends React.Component {

    componentWillMount() {
        store.dispatch(getUserData())
    }

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
                            <Route path={"admin"} component={Auth(ADMIN_PAGE)(Admin)} onEnter={() => {}}>
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