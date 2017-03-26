import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as URLS from './../config.jsx';
import { browserHistory } from 'react-router';
import { getUsersWithClass, getUserClasses } from "../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { changeUserFormMode, userClicked, fillForm } from "../redux/actions/userFormActions.jsx";
import {connect} from "react-redux";
import UserTable from './UserTable.jsx';
import UserForm from './UserForm.jsx';

class Users extends React.Component {

    componentDidMount() {
        this.props.changeUserFormMode("EMPTY");
        this.props.getUsersWithClass();
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    userClicked(selected) {
        console.log("heyo");

    }

    handleSubmit(values) {
        console.log("potato");
        console.log(values);

    }



    render() {
        const {mode, user, users, userclasses, userClicked, changeUserFormMode} = this.props;
        console.log("EN BRUKER");
        console.log(user);
        return (
            <div>
                <UserForm handleSubmit={this.handleSubmit} mode={mode} user={user} classes={userclasses} handleEdit={() => changeUserFormMode("EDIT")}/>
                <br/>
                <UserTable users={users} userClicked={userClicked}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode : state.userFormReducer.mode,
        user: state.userFormReducer.user,
        users: state.userReducer.users,
        userclasses : state.userReducer.userclasses,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userClicked: (user) => {
            if (user != null) {
                dispatch(changeUserFormMode("SHOW"));
                dispatch(userClicked(user));
                dispatch(fillForm(user))
            } else {
                //dispatch(changeUserFormMode("EMPTY"))
            }
        },
        changeUserFormMode: (mode) => {
            dispatch(changeUserFormMode(mode))
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        },
        getUserClasses: () => {
            dispatch(getUserClasses())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
