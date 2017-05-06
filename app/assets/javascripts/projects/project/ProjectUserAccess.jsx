import React from 'react';
import { connect } from "react-redux";
import { fillForm, postUserNew, postUserUpdate, postUserDelete } from "./../../redux/actions/userFormActions";
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DataTable from '../../core/table/DataTable';
/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectUserAccess extends React.Component {



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
                {type: 'DELETE_ACTION'}
            ],
            toolbar: {
                title: 'Brukere',
                search: 'USERNAME|ucName',
                render: () => {
                    return (
                        <ToolbarGroup>
                            <ToolbarSeparator />
                            <RaisedButton label="Legg til Bruker"  />
                        </ToolbarGroup>
                    );
                }
            }
        };

        return (
            <div className="container">
                <div className="table">
                    <DataTable config={config}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserAccess);