import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import {Tabs, Tab} from 'material-ui/Tabs';



class ProjectView extends React.Component {


    /**
     * Renders the component. This component returns a JSX tag, and all code need to be inside
     * this tag. JSX looks like html but is really a javascript extension syntax. This get compiled
     * into javascript and then into html. CodeAcademy.com Rect.js part 1 explains this in module 1.
     * @returns {XML}
     */

    render() {
        const { project, index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value={"/project/" + project.id + " /overview"} label="Prosjektoversikt" onActive={() => push('/project/:id/overview')}>
                        <div id="admin" >
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab value="/project/:id/access" label="Tilgang" onActive={push.bind(null, path)}>
                        <Tabs
                            initialSelectedIndex={index}
                            value={path}
                        >
                            <Tab value="/project/:id/overview" label="Prosjektoversikt" onActive={() => push('/project/:id/overview')}>
                                <div id="admin" >
                                    <h2>Brukeroversikt</h2>
                                    <ul>
                                        <li>Oversikt over hvem som eier hvilket prosjekt</li>
                                    </ul>
                                </div>
                            </Tab>
                            <Tab value="/project/:id/access" label="Tilgang" onActive={push.bind(null, path)}>
                                <div >

                                </div>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab value="/project/:id/requirements" label="Prosjektkrav" onActive={push.bind(null, path)}>
                        <div >

                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let path = state.router.location ? state.router.location.pathname : "//project/:id";
    return {
        path: path
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => {
            dispatch(push(url));
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);