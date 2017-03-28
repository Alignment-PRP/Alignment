import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions.jsx";
import { changeClassFormMode, classClicked, fillClassForm, snackBar } from "./../../redux/actions/classFormActions.jsx";
import ClassTable from './ClassTable.jsx';
import ClassForm from './ClassForm.jsx';
import {USERCLASS_POST_NEW_RAW, USERCLASS_POST_UPDATE_RAW, USERCLASS_POST_DELETE_RAW} from '../../config.jsx';

class Classes extends React.Component {

    componentDidMount() {
        this.props.changeClassFormMode("EMPTY");
        this.props.getUserClasses();
        this.props.changeSideMenuMode("HIDE");
    }

    handleSubmit(values) {
        values.oldNAME = this.props.uclass.NAME;
        const that = this;
        axios.post(USERCLASS_POST_UPDATE_RAW, values)
            .then(function (response) {
                that.props.getUserClasses();
                that.props.getUsersWithClass();
                that.props.changeClassFormMode("EMPTY");
                that.props.snackBar(true, "Brukerklasse oppdatert!");
            })
            .catch(function (error) {
                //TODO better erros
                that.props.snackBar(true, "Noe gikk galt..");
                console.log(error);
            });
    }

    handleSubmitCreate(values) {
        const that = this;
        axios.post(USERCLASS_POST_NEW_RAW, values)
            .then(function (response) {
                that.props.getUserClasses();
                that.props.changeClassFormMode("EMPTY");
                that.props.snackBar(true, "Brukerklasse laget!");
            })
            .catch(function (error) {
                //TODO better errors
                that.props.snackBar(true, "Noe gikk galt..");
                console.log(error);
            });
    }

    handleDelete(values) {
        const that = this;
        axios.post(USERCLASS_POST_DELETE_RAW, values)
            .then(function (response) {
                that.props.getUserClasses();
                that.props.getUsersWithClass();
                that.props.changeClassFormMode("EMPTY");
                that.props.snackBar(true, "Brukerklasse slettet!");
            })
            .catch(function (error) {
                //TODO better erros
                that.props.snackBar(true, "Noe gikk galt..");
                console.log(error);
            });
    }

    closeSnack() {
        this.props.snackBar(false, "");
    }


    render() {
        const {snack, mode, userclasses, uclass, classClicked, changeClassFormMode} = this.props;
        return (
            <div className="containerUsers">
                <div className="form">
                    <ClassForm
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleSubmitCreate={this.handleSubmitCreate.bind(this)}
                        handleDelete={this.handleDelete.bind(this)}
                        mode={mode} uclass={uclass}
                        classes={userclasses}
                        handleEdit={() => changeClassFormMode("EDIT")}
                        handleCreate={() => changeClassFormMode("CREATE")}
                        handleClear={() => changeClassFormMode("EMPTY")}
                    />
                </div>
                <div className="usertable">
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
