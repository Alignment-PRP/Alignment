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
import CreateUserForm from './userform/CreateUserForm.jsx';


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

    render() {
        const { handleSubmit, handleEdit, handleCreate, handleSubmitCreate, handleClear, mode, user, classes} = this.props;
        switch(mode) {
            case "EMPTY":
                return <EmptyForm onSubmit={handleSubmit} handleCreate={handleCreate}/>;
            case "SHOW":
                return <UserInForm onSubmit={handleSubmit} handleEdit={handleEdit} handleClear={handleClear} user={user}/>;
            case "EDIT":
                return <EditUserForm onSubmit={handleSubmit} user={user} classes={classes}/>;
            case "CREATE":
                return <CreateUserForm onSubmit={handleSubmitCreate} classes={classes}/>;
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);
