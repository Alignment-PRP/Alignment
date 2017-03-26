import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './Users.jsx';
import {browserHistory} from 'react-router';
import {changeTab} from './../redux/actions/adminTabActions.jsx';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.handleDefault = this.handleActive.bind(this, '/admin');
        this.handleUsers = this.handleActive.bind(this, '/admin/users');

        this.style = {
            tabContent: {
                margin: '20px',
            }
        };
    }

    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }

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
                    <Tab label="Some Tab" onActive={this.handleDefault}>
                        <div style={this.style.tabContent}>

                            <h2>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Users" onActive={this.handleUsers}>
                        <div style={this.style.tabContent}>
                            <Users users={this.props.users}/>
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