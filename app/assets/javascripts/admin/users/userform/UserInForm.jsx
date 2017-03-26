import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'username', 'email', 'firstname', 'lastname', 'ucName' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    return errors
};

class UserInForm extends React.Component {

    _render(handleSubmit, handleEdit, handleClear, user) {
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        hintText={user.USERNAME}
                        floatingLabelText="Brukernavn"
                        floatingLabelFixed={true}
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        hintText={user.email}
                        floatingLabelText="Epost"
                        floatingLabelFixed={true}
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        hintText={user.firstName}
                        floatingLabelText="Fornavn"
                        floatingLabelFixed={true}
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        hintText={user.lastName}
                        floatingLabelText="Etternavn"
                        floatingLabelFixed={true}
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="ucName"
                        component="select"
                        disabled={true}
                    >
                        <option>{user.ucName}</option>
                    </Field>
                    <br/>
                    <RaisedButton type="submit" label="Lagre" disabled={true}/>
                    <RaisedButton label="Endre bruker" disabled={false} onClick={handleEdit}/>
                    <RaisedButton label="Tilbakestill" disabled={false} onClick={handleClear}/>
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, handleEdit, handleClear, user} = this.props;
        return this._render(handleSubmit, handleEdit, handleClear, user);
    }

}

export default reduxForm({
    form: 'UserInForm',
    validate,
})(UserInForm);
