import React from 'react';
import { connect } from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { fillForm, postUserNew, postUserUpdate, postUserDelete } from "./../../redux/actions/userFormActions";
import { dialogOpen, dialogChangeAction } from './../../redux/actions/dialogActions';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DataTable from '../../core/table/DataTable';
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


        const config = {
            table: 'users',
            title: 'kake',
            data: users,
            columns: [
                {label: 'Klasse', property: 'ucName', width: '15%'},
                {label: 'Brukernavn', property: 'USERNAME', width: '15%'},
                {label: 'Fornavn', property: 'firstName', width: '15%'},
                {label: 'Etternavn', property: 'lastName', width: '15%'},
                {label: 'Epost', property: 'email', width: '20%'},
                {type: 'EDIT_ACTION', action: (user) => { updateDialog(true); fillForm(user); }, width: '10%'},
                {type: 'DELETE_ACTION', action: (user) => { deleteDialog(true); deleteDialogChangeAction(() => { postUserDelete(user); deleteDialog(false); }); }, width: '10%'}
            ],
            toolbar: {
                title: 'Brukere',
                search: 'USERNAME|firstName|lastName',
                render: () => {
                    return (
                        <ToolbarGroup>
                            <ToolbarSeparator />
                            <RaisedButton label="Ny Bruker" primary={true} onTouchTap={() => { updateDialog(true); fillForm(null); }} />
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Oppdater" />
                                <MenuItem primaryText="Settings" />
                            </IconMenu>
                        </ToolbarGroup>
                    );
                }
            }
        };

        return (
            <div className="container">
                <div className="usertable">
                    <DataTable config={config}/>
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