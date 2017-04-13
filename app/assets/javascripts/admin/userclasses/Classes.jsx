import React from 'react';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import { changeClassFormMode, classClicked, fillClassForm, postClassNew, postClassUpdate, postClassDelete } from "./../../redux/actions/classFormActions";
import GenericTable from './../../core/table/GenericTable';
import ClassForm from './ClassForm';

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

    render() {
        const {
            mode, userclasses, uclass,
            classClicked,
            changeClassFormMode,
            postClassNew,
            postClassUpdate,
            postClassDelete
        } = this.props;

        const tableData = {
            table: 'userClasses',
            objects: userclasses,
            rowMeta: [
                {label: 'Navn', field: 'NAME', width: '30%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '70%'}
            ]
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
                    <GenericTable onSelection={classClicked} metaData={tableData}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode : state.classFormReducer.mode,
        uclass: state.classFormReducer.uclass,
        userclasses : state.userReducer.userclasses
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
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
