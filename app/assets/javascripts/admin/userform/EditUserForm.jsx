import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditUserForm extends React.Component {

    _render(handleSubmit, user) {
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        defaultValue={user.username}
                        floatingLabelText="Brukernavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        defaultValue={user.email}
                        floatingLabelText="Epost"
                        disabled={false}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        defaultValue={user.firstname}
                        floatingLabelText="Fornavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        defaultValue={user.lastname}
                        floatingLabelText="Etternavn"
                        disabled={false}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        disabled={false}
                        type="submit"
                        label="Submit"
                        component={RaisedButton}
                    />
                    <Field
                        disabled={true}
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
        const {handleSubmit, user} = this.props;
        return this._render(handleSubmit, user);
    }

}
