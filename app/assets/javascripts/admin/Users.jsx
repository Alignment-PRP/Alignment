import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as URLS from './../config.jsx';
import { browserHistory } from 'react-router';
import { getUsers } from "../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { changeUserFormMode } from "../redux/actions/userFormActions.jsx";
import {connect} from "react-redux";
import UserTable from './UserTable.jsx';
import UserForm from './UserForm.jsx';

class Users extends React.Component {

    componentDidMount() {
        this.props.changeUserFormMode("EMPTY");
        this.props.getUsers();
        this.props.changeSideMenuMode("HIDE");
    }

    userClicked(selected) {
        console.log("heyo");

    }

    handleSubmit() {

    }

    render() {
        console.log(this.props.users);
        return (
            <div>
                <UserForm onSubmit={this.handleSubmit} data={this.state}/>
                <UserTable users={this.props.users} userClicked={this.userClicked}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode : state.userFormReducer.mode,
        users: state.userReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserFormMode: (mode) => {
            dispatch(changeUserFormMode(mode))
        },
        getUsers: () => {
            dispatch(getUsers())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
