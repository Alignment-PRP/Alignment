import React from 'react';
import {connect} from "react-redux";
import { push } from 'react-router-redux';
import { changeSideMenuMode } from "./../redux/actions/sideMenuActions";
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './users/Users';
import Classes from './userclasses/Classes';
import Statistics from './statistics/Statistics';

/**
 * Class represents the admin page.
 * Controls a Tabs component, Material-UI.
 * Parent: {@link Root}
 * Children: {@link Users} and {@link Classes}
 */
class Admin extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }

    render() {
        const { index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/admin" label="Brukeroversikt" onActive={push.bind(null, '/admin')}>
                        <div id="admin">
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Brukere" onActive={push.bind(null, '/admin/users')}>
                        <div>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab value="/admin/classes" label="Brukerklasser" onActive={push.bind(null, '/admin/classes')}>
                        <div>
                            <Classes/>
                        </div>
                    </Tab>
                    <Tab value="/admin/stats" label="Statistikk" onActive={push.bind(null, '/admin/stats')}>
                        <div id="admin">
                            <Statistics/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        path: props.location.pathname
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);