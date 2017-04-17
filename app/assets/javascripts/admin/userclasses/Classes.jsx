import React from 'react';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { fillClassForm, postClassNew, postClassUpdate, postClassDelete } from "./../../redux/actions/classFormActions";
import { dialogOpen, dialogChangeAction } from './../../redux/actions/dialogActions';
import RaisedButton from 'material-ui/RaisedButton';
import GenericTable from './../../core/table/GenericTable';
import ClassFormDialog from './ClassFormDialog';
import ClassFormDialogDelete from './ClassFormDialogDelete';

/**
 * Class represents /admin/classes.
 * Parent: {@link Admin}
 * Children: {@link ClassForm}.
 */
class Classes extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.getUserClasses();
    }

    render() {
        const {
            userClasses, uClass,
            classClicked,
            postClassNew,
            postClassUpdate,
            postClassDelete,
            fillForm,

            updateDialogIsOpen, updateDialog,
            deleteDialogIsOpen, deleteDialogAction, deleteDialog, deleteDialogChangeAction,
        } = this.props;

        const tableData = {
            table: 'userClasses',
            objects: userClasses,
            rowMeta: [
                {label: 'Navn', field: 'NAME', width: '25%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '61%'},
                {type: 'EDIT_ACTION', action: (uClass) => { updateDialog(true); fillForm(uClass); }, width: '7%'},
                {type: 'DELETE_ACTION', action: (uClass) => { deleteDialog(true); fillForm(uClass); }, width: '7%'}
            ]
        };

        return (
            <div className="containerUsers">
                <div className="usertable">
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <RaisedButton label="Ny Brukerklasse" onTouchTap={() => { updateDialog(true); fillForm(null); }}/>
                    </div>

                    <GenericTable onSelection={classClicked} metaData={tableData}/>
                </div>

                <ClassFormDialog
                    title={uClass ? 'Endre Brukerklasse' : 'Ny Brukerklasse'}
                    open={updateDialogIsOpen}
                    classes={userClasses}
                    onRequestClose={updateDialog.bind(null, false)}
                    handleSubmit={
                        (values, dispatch, props) => {
                            if (uClass) {
                                postClassUpdate(values, dispatch, props);
                            } else {
                                postClassNew(values, dispatch, props);
                            }
                            updateDialog(false);
                        }
                    }
                />

                <ClassFormDialogDelete
                    title={'Slett Brukerklasse'}
                    open={deleteDialogIsOpen}
                    classes={userClasses}
                    onRequestClose={deleteDialog.bind(null, false)}
                    handleSubmit={
                        (values, dispatch, props) => {
                            postClassDelete(values, dispatch, props);
                            deleteDialog(false);
                        }
                    }
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uClass: state.classFormReducer.uClass,
        userClasses : state.userReducer.userClasses,

        updateDialogIsOpen: state.dialogReducer.classUpdate.isOpen,
        deleteDialogIsOpen: state.dialogReducer.classDelete.isOpen,
        deleteDialogAction: state.dialogReducer.classDelete.action,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fillForm: (uClass) => {
            dispatch(fillClassForm(uClass))
        },
        postClassNew: (data) => {
            dispatch(postClassNew(data));
        },
        postClassUpdate: (data) => {
            dispatch(postClassUpdate(data));
        },
        postClassDelete: (data) => {
            dispatch(postClassDelete(data));
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        },
        getUserClasses: () => {
            dispatch(getUserClasses())
        },
        updateDialog: (open) => {
            dispatch(dialogOpen('classUpdate', open));
        },
        deleteDialog: (open) => {
            dispatch(dialogOpen('classDelete', open));
        },
        deleteDialogChangeAction: (action) => {
            dispatch(dialogChangeAction('classDelete', action))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
