import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import {Tabs, Tab} from 'material-ui/Tabs';



class ProjectView extends React.Component {



    /**
     * Called when the component did mount.
     */
    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
        console.log(this.props.path);
    }

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
                >
                    <Tab label="Prosjektoversikt">
                        <div>
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab label="Tilgang">
                        <div>
                            <Tabs
                                initialSelectedIndex={index}
                            >
                                <Tab label="Brukere" >
                                    <div>
                                        <h2>Brukeroversikt</h2>
                                        <ul>
                                            <li>Oversikt over hvem som eier hvilket prosjekt</li>
                                        </ul>
                                    </div>
                                </Tab>
                                <Tab label="Brukerklasser">
                                    <div >

                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Tab>
                    <Tab label="Prosjektkrav">
                        <div >

                        </div>
                    </Tab>
                </Tabs>
            </div>
            /*
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value={"/project/overview"} label="Prosjektoversikt" onActive={() => push('/project/:id/overview')}>
                        <div>
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
                            <Tab value="/project/:id/access/users" label="Brukere" onActive={push.bind(null, path)}>
                                <div>
                                    <h2>Brukeroversikt</h2>
                                    <ul>
                                        <li>Oversikt over hvem som eier hvilket prosjekt</li>
                                    </ul>
                                </div>
                            </Tab>
                            <Tab value="/project/:id/access/classes" label="Brukerklasser" onActive={push.bind(null, path)}>
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
            */
        );
    }
}

const mapStateToProps = (state) => {
    let path = state.router.location ? state.router.location.pathname : "/project/:id";
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