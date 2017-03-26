import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { changeUserFormMode, userClicked, fillForm, snackBar } from "../redux/actions/userFormActions.jsx";
import UserTable from './UserTable.jsx';
import UserForm from './UserForm.jsx';
import * as URLS from './../config.jsx';

class Users extends React.Component {

    componentDidMount() {
        this.props.changeUserFormMode("EMPTY");
        this.props.getUsersWithClass();
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    handleSubmit(values) {
        values.oldUSERNAME = this.props.user.USERNAME;
        const that = this;
        axios.post(URLS.USER_POST_UPDATE_RAW, values)
            .then(function (response) {
                that.props.getUsersWithClass();
                that.props.changeUserFormMode("EMPTY");
                that.props.snackBar(true, "Bruker oppdatert!");
            })
            .catch(function (error) {
                that.props.snackBar(true, "Noe gikk galt..");
                console.log(error);
            });

    }

    handleSubmitCreate(values) {
        const that = this;
        axios.post(URLS.USER_POST_NEW_RAW, values)
            .then(function (response) {
                that.props.getUsersWithClass();
                that.props.changeUserFormMode("EMPTY");
                that.props.snackBar(true, "Bruker laget!");
            })
            .catch(function (error) {
                that.props.snackBar(true, "Noe gikk galt..");
                console.log(error);
            });
    }

    closeSnack() {
        this.props.snackBar(false, "");
    }


    render() {
        const {mode, user, users, userclasses, snack, userClicked, changeUserFormMode} = this.props;
        return (
            <div>
                <UserForm
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleSubmitCreate={this.handleSubmitCreate.bind(this)}
                    mode={mode} user={user}
                    classes={userclasses}
                    handleEdit={() => changeUserFormMode("EDIT")}
                    handleCreate={() => changeUserFormMode("CREATE")}
                    handleClear={() => changeUserFormMode("EMPTY")}
                />
                <br/>
                <UserTable users={users} userClicked={userClicked}/>

                <Snackbar
                    open={snack.open}
                    message={snack.text}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnack.bind(this)}
                />
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
        snack: state.userFormReducer.snack,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userClicked: (user) => {
            if (user != null) {
                dispatch(changeUserFormMode("SHOW"));
                dispatch(userClicked(user));
                dispatch(fillForm(user))
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
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
