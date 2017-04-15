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
     * Binds '/admin', '/admin/users' and '/admin/classes' to different tabs.
     * @param {Object} props
     * @param {number} props.index
     * @param {function(*)} props.changeTab - {@link module:redux/actions/adminTab.changeTab}
     */
    constructor(props) {
        super(props);

        this.style = {
            tabContent: {

            }
        }
    }

    /**
     * Called when the component did mount.
     */
    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
        console.log(this.props.path);
    }

    render() {
        const { index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/admin" label="Brukeroversikt" onActive={() => push('/admin')}>
                        <div id="admin" style={this.style.tabContent}>
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Brukere" onActive={push.bind(null, '/admin/users')}>
                        <div style={this.style.tabContent}>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab value="/admin/classes" label="Brukerklasser" onActive={push.bind(null, '/admin/classes')}>
                        <div style={this.style.tabContent}>
                            <Classes/>
                        </div>
                    </Tab>
                    <Tab value="/admin/stats" label="Statistikk" onActive={push.bind(null, '/admin/stats')}>
                        <div id="admin" style={this.style.tabContent}>
                            <Statistics/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let path = state.router.location ? state.router.location.pathname : "/admin";
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);