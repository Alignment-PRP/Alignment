import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions.jsx";
import { changeClassFormMode, classClicked, fillClassForm, snackBar, postClassNew, postClassUpdate, postClassDelete } from "./../../redux/actions/classFormActions.jsx";
import { tablePage, tableRows } from './../../redux/actions/tableActions.jsx';
import { userClassTableMetaData } from './../../core/tableMetaData.jsx';
import GenericTable from './../../core/table/GenericTable.jsx';
import ClassForm from './ClassForm.jsx';

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
        this.props.changeClassFormMode("EMPTY");
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
            snack, mode, userclasses, uclass,
            classClicked,
            changeClassFormMode,
            postClassNew,
            postClassUpdate,
            postClassDelete,
            userClassTablePage, page,
            userClassTableRows, nRows
        } = this.props;

        const tableData = {
            ...userClassTableMetaData,
            objects: userclasses,
            page: page,
            nRows: nRows
        };

        return (
            <div className="containerUsers">
                <div className="form">
                    <ClassForm
                        handleSubmitUpdate={postClassUpdate}
                        handleSubmitNew={postClassNew}
                        handleSubmitDelete={postClassDelete}
                        mode={mode} uclass={uclass}
                        classes={userclasses}
                        handleEdit={() => changeClassFormMode("EDIT")}
                        handleCreate={() => changeClassFormMode("CREATE")}
                        handleClear={() => changeClassFormMode("EMPTY")}
                    />
                </div>
                <div className="usertable">
                    <GenericTable onSelection={classClicked} metaData={tableData} tablePage={userClassTablePage} tableRows={userClassTableRows}/>
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
        mode : state.classFormReducer.mode,
        uclass: state.classFormReducer.uclass,
        userclasses : state.userReducer.userclasses,
        snack: state.userFormReducer.snack,
        page: state.tableReducer.userClass.page,
        nRows: state.tableReducer.userClass.nRows
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        classClicked: (uclass) => {
            if (uclass != null) {
                dispatch(changeClassFormMode("SHOW"));
                dispatch(classClicked(uclass));
                dispatch(fillClassForm(uclass))
            }
        },
        userClassTablePage: (page) => {
            dispatch(tablePage('userClass', page));
        },
        userClassTableRows: (nRows) => {
            dispatch(tableRows('userClass', nRows));
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
        changeClassFormMode: (mode) => {
            dispatch(changeClassFormMode(mode))
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

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
