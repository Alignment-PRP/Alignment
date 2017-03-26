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
                    <Tab label="Noe admin stuff" onActive={this.handleDefault}>
                        <div style={this.style.tabContent}>

                            <h2>Admin stuff. WIP</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla magna diam, mattis ut accumsan id, dapibus mattis dui. Praesent accumsan tempor est vitae commodo. Maecenas facilisis lectus eget malesuada mollis. Duis et risus dolor. Integer fermentum vulputate ex vel imperdiet. Nam dignissim sem vel dignissim ornare. Quisque accumsan ultricies quam.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Brukere" onActive={this.handleUsers}>
                        <div style={this.style.tabContent}>
                            <Users users={this.props.users}/>
                        </div>
                    </Tab>
                    <Tab label="Brukerklasser" onActive={this.handleUserClasses}>
                        <div style={this.style.tabContent}>

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