import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "./../redux/actions/sideMenuActions.jsx";
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './users/Users.jsx';
import Classes from './userclasses/Classes.jsx';
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
        //browserHistory.push(url)
    }


    render() {
        const { index, path, changeTab } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/admin" label="Noe admin stuff" onActive={this.handleDefault}>
                        <div style={this.style.tabContent}>

                            <h2>Admin stuff. WIP</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla magna diam, mattis ut accumsan id, dapibus mattis dui. Praesent accumsan tempor est vitae commodo. Maecenas facilisis lectus eget malesuada mollis. Duis et risus dolor. Integer fermentum vulputate ex vel imperdiet. Nam dignissim sem vel dignissim ornare. Quisque accumsan ultricies quam.
                            </p>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Brukere" onActive={this.handleUsers}>
                        <div style={this.style.tabContent}>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab value="/admin/classes" label="Brukerklasser" onActive={this.handleClasses}>
                        <div style={this.style.tabContent}>
                            <Classes/>
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
        index: state.adminTabReducer.index,
        path: path
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