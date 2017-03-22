import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class UserInForm extends React.Component {

    _render(handleSubmit, handleEdit, user) {
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        defaultValue={user.username}
                        floatingLabelText="Brukernavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        defaultValue={user.email}
                        floatingLabelText="Epost"
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        defaultValue={user.firstname}
                        floatingLabelText="Fornavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        defaultValue={user.lastname}
                        floatingLabelText="Etternavn"
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        disabled={true}
                        type="submit"
                        label="Submit"
                        component={RaisedButton}
                    />
                    <Field
                        disabled={false}
                        type="edit"
                        label="Edit"
                        onClick={handleEdit}
                        component={RaisedButton}
                    />
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, handleEdit, user} = this.props;
        return this._render(handleSubmit, handleEdit, user);
    }

}
