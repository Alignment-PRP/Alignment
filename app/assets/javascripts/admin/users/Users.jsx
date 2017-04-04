import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions.jsx";
import { changeUserFormMode, userClicked, fillForm, snackBar, postUserNew, postUserUpdate, postUserDelete } from "./../../redux/actions/userFormActions.jsx";
import { tablePage, tableRows } from './../../redux/actions/tableActions.jsx';
import UserTable from './UserTable.jsx';
import UserForm from './UserForm.jsx';
import GenericTable from './../../core/table/GenericTable.jsx';
import { userTableMetaData } from './../../core/tableMetaData.jsx';

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm} and {@link UserTable}
 */
class Users extends React.Component {

    componentWillMount() {
        this.props.userTablePage(1);
        this.props.userTableRows(10);
    }

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.changeUserFormMode("EMPTY");
        this.props.getUsersWithClass();
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    /**
     * Closes the snackbar.
     */
    closeSnack() {
        this.props.snackBar(false, "");
    }

    render() {
        const {
            mode, user, users, userclasses, snack, page, nRows,
            userClicked,
            changeUserFormMode,
            postUserNew,
            postUserUpdate,
            postUserDelete,
            userTablePage,
            userTableRows
        } = this.props;

        let tableData = {
            ...userTableMetaData,
            objects: users,
            page: page,
            nRows: nRows
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
                    <GenericTable metaData={tableData} tablePage={userTablePage} tableRows={userTableRows}/>
                    <UserTable users={users} userClicked={userClicked}/>
                </div>

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
        page: state.tableReducer.user.page,
        nRows: state.tableReducer.user.nRows,
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
        userTablePage: (page) => {
            dispatch(tablePage('user', page));
        },
        userTableRows: (nRows) => {
            dispatch(tableRows('user', nRows));
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
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
