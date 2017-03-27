import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import { getUserClasses } from "./../../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions.jsx";
import { changeClassFormMode, classClicked, fillClassForm, snackBar } from "./../../redux/actions/classFormActions.jsx";
import ClassTable from './ClassTable.jsx';
import ClassForm from './ClassForm.jsx';

class Classes extends React.Component {

    componentDidMount() {
        this.props.changeClassFormMode("EMPTY");
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    handleSubmit(values) {
        //TODO called when class is updated
    }

    handleSubmitCreate(values) {
        //TODO called when class should be created
    }

    closeSnack() {
        this.props.snackBar(false, "");
    }


    render() {
        const {snack, mode, userclasses, uclass, classClicked, changeClassFormMode} = this.props;
        return (
            <div className="containerUsers">
                <div className="usertable">
                    <ClassForm
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleSubmitCreate={this.handleSubmitCreate.bind(this)}
                        mode={mode} uclass={uclass}
                        handleEdit={() => changeClassFormMode("EDIT")}
                        handleCreate={() => changeClassFormMode("CREATE")}
                        handleClear={() => changeClassFormMode("EMPTY")}
                    />
                    <ClassTable
                        classes={userclasses}
                        classClicked={classClicked}
                    />
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
        changeClassFormMode: (mode) => {
            dispatch(changeClassFormMode(mode))
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
