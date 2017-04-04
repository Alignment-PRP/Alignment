import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "./../redux/actions/sideMenuActions.jsx";
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './users/Users.jsx';
import Classes from './userclasses/Classes.jsx';
import Statistics from './St/Classes.jsx';
import {browserHistory} from 'react-router';
import {changeTab} from './../redux/actions/adminTabActions.jsx';

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

        this.handleDefault = this.handleActive.bind(this, '/admin');
        this.handleUsers = this.handleActive.bind(this, '/admin/users');
        this.handleClasses = this.handleActive.bind(this, '/admin/classes');

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
    }

    /**
     * Pushes an url when a tab is changed.
     * @param {string} url
     */
    handleActive(url) {
        browserHistory.push(url)
    }


    render() {
        const { index, changeTab } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    onChange={changeTab}
                >
                    <Tab label="Brukeroversikt" onActive={this.handleDefault}>
                        <div id="admin" style={this.style.tabContent}>
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab label="Brukere" onActive={this.handleUsers}>
                        <div style={this.style.tabContent}>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab label="Brukerklasser" onActive={this.handleClasses}>
                        <div style={this.style.tabContent}>
                            <Classes/>
                        </div>
                    </Tab>
                    <Tab label="Statistikk" onActive={this.handleDefault}>
                        <div id="admin" style={this.style.tabContent}>
                            <Statistics />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        index: state.adminTabReducer.index,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeTab: (index) => {
            dispatch(changeTab(index))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);