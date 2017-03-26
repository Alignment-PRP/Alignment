import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmptyForm from './userform/EmptyForm.jsx';
import UserInForm from './userform/UserInForm.jsx';
import EditUserForm from './userform/EditUserForm.jsx';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'username', 'email', 'firstname', 'lastname' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    return errors
};

const renderTextField = ({ input, label, meta: { touched, error }, custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

const renderButton = ({input, meta, type, label}) => (
    <RaisedButton type={type} label={label}/>
);

const required = value => value == null ? 'Required' : undefined;

class UserForm extends React.Component {




    renderEditUser(handleSubmit, user) {

    }

    render() {
        const { handleSubmit, handleEdit, mode, user, classes} = this.props;
        console.log("USER!!!!");
        console.log(user);

        switch(mode) {
            case "EMPTY":
                return <EmptyForm handleSubmit={handleSubmit}/>;
            case "SHOW":
                return <UserInForm handleSubmit={handleSubmit} handleEdit={handleEdit} user={user}/>;
            case "EDIT":
                return <EditUserForm handleSubmit={handleSubmit} user={user} classes={classes}/>;
            default:
                return(<p>potato</p>)
        }
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
    }
};

export default reduxForm({
    form: 'UserForm',
    validate,
})(connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm));
