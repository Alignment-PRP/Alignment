import React from 'react';
import { connect } from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { fillForm, postUserNew, postUserUpdate, postUserDelete } from "./../../redux/actions/userFormActions";
import { dialogOpen, dialogChangeAction } from './../../redux/actions/dialogActions';
import FlatButton from 'material-ui/FlatButton';
import GenericTable from './../../core/table/GenericTable';
import DeleteDialog from './../../core/dialog/DeleteDialog';
import UserFormDialog from "./UserFormDialog";

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class Users extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentWillMount() {
        this.props.getUsersWithClass();
        this.props.getUserClasses();
    }

    render() {
        const {
            user, users, userClasses,
            postUserNew, postUserUpdate, postUserDelete,
            fillForm,
            updateDialogIsOpen, updateDialog,
            deleteDialogIsOpen, deleteDialogAction, deleteDialog, deleteDialogChangeAction,
        } = this.props;


        const tableData = {
            table: 'users',
            title: 'kake',
            objects: users,
            rowMeta: [
                {label: 'Klasse', field: 'ucName', width: '15%'},
                {label: 'Brukernavn', field: 'USERNAME', width: '15%'},
                {label: 'Fornavn', field: 'firstName', width: '16%'},
                {label: 'Etternavn', field: 'lastName', width: '20%'},
                {label: 'Epost', field: 'email', width: '20%'},
                {type: 'EDIT_ACTION', action: (user) => { updateDialog(true); fillForm(user); }, param: 'USERNAME', width: '7%'},
                {type: 'DELETE_ACTION', action: (user) => { deleteDialog(true); deleteDialogChangeAction(() => { postUserDelete(user); deleteDialog(false); }); }, param: 'USERNAME', width: '7%'}
            ]
        };

        return (
            <div className="containerUsers">
                <div className="usertable">
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <FlatButton label="Ny Bruker" onTouchTap={() => { updateDialog(true); fillForm(null); }}/>
                    </div>

                    <GenericTable metaData={tableData}/>
                </div>

                <UserFormDialog
                    title={user ? 'Endre Bruker' : 'Ny Bruker'}
                    open={updateDialogIsOpen}
                    classes={userClasses}
                    onRequestClose={updateDialog.bind(null, false)}
                    handleSubmit={
                        (values, dispatch, props) => {
                            if (user) {
                                postUserUpdate(values, dispatch, props);
                            } else {
                                postUserNew(values, dispatch, props);
                            }
                            updateDialog(false);
                        }
                    }
                />

                <DeleteDialog
                    title="Slett Bruker"
                    desc="Er du sikker på at du vil slette brukeren?"
                    open={deleteDialogIsOpen}
                    action={deleteDialogAction}
                    onRequestClose={deleteDialog.bind(null, false)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userFormReducer.user,
        users: state.userReducer.users,
        userClasses : state.userReducer.userClasses,

        updateDialogIsOpen: state.dialogReducer.userUpdate.isOpen,
        deleteDialogIsOpen: state.dialogReducer.userDelete.isOpen,
        deleteDialogAction: state.dialogReducer.userDelete.action,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fillForm: (user) => {
            dispatch(fillForm(user))
        },
        postUserNew: (user) => {
            dispatch(postUserNew(user));
        },
        postUserUpdate: (user) => {
            dispatch(postUserUpdate(user));
        },
        postUserDelete: (user) => {
            dispatch(postUserDelete(user));
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        },
        getUserClasses: () => {
            dispatch(getUserClasses())
        },
        updateDialog: (open) => {
            dispatch(dialogOpen('userUpdate', open));
        },
        deleteDialog: (open) => {
            dispatch(dialogOpen('userDelete', open));
        },
        deleteDialogChangeAction: (action) => {
            dispatch(dialogChangeAction('userDelete', action))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
