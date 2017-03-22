import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as URLS from './../config.jsx';
import { browserHistory } from 'react-router';
import { getUsers } from "../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { changeUserFormMode, userClicked } from "../redux/actions/userFormActions.jsx";
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
        console.log("potato")
    }

    render() {
        const {mode, index, users, userClicked} = this.props;
        return (
            <div>
                <UserForm onSubmit={this.handleSubmit} mode={mode} user={users[index]}/>
                <UserTable users={users} userClicked={userClicked}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode : state.userFormReducer.mode,
        index: state.userFormReducer.index,
        users: state.userReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userClicked: (index) => {
            if (index[0] != null) {
                dispatch(userClicked(index[0]));
                dispatch(changeUserFormMode("SHOW"));
            } else {
                //dispatch(changeUserFormMode("EMPTY"))
            }
        },
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
