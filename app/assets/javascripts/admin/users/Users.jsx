import React from 'react';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import { changeUserFormMode, userClicked, fillForm, postUserNew, postUserUpdate, postUserDelete } from "./../../redux/actions/userFormActions";
import UserForm from './UserForm';
import GenericTable from './../../core/table/GenericTable';

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class Users extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.changeUserFormMode("EMPTY");
        this.props.getUsersWithClass();
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    render() {
        const {
            mode, user, users, userclasses,
            userClicked,
            changeUserFormMode,
            postUserNew,
            postUserUpdate,
            postUserDelete
        } = this.props;

        const tableData = {
            table: 'users',
            objects: users,
            rowMeta: [
                {label: 'Klasse', field: 'ucName', width: '20%'},
                {label: 'Brukernavn', field: 'USERNAME', width: '20%'},
                {label: 'Fornavn', field: 'firstName', width: '20%'},
                {label: 'Etternavn', field: 'lastName', width: '20%'},
                {label: 'Epost', field: 'email', width: '20%'},
            ]
        };

        return (
            <div className="containerUsers">
                <div className="form">
                    <UserForm
                        handleSubmitNew={postUserNew}
                        handleSubmitUpdate={postUserUpdate}
                        handleSubmitDelete={postUserDelete}
                        mode={mode} user={user}
                        classes={userclasses}
                        handleEdit={() => changeUserFormMode("EDIT")}
                        handleCreate={() => changeUserFormMode("CREATE")}
                        handleClear={() => changeUserFormMode("EMPTY")}
                    />
                </div>
                <div className="usertable">
                    <GenericTable onSelection={userClicked} metaData={tableData}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode : state.userFormReducer.mode,
        user: state.userFormReducer.user,
        users: state.userReducer.users,
        userclasses : state.userReducer.userclasses
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
        postUserNew: (data) => {
            dispatch(postUserNew(data));
        },
        postUserUpdate: (data) => {
            dispatch(postUserUpdate(data));
        },
        postUserDelete: (data) => {
            dispatch(postUserDelete(data));
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
